const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io'); // npm socket.io

const PORT = 3000;
const app = express();
const httpServer = createServer(app) // createServer expects a "requestlister" which express is
const io = new Server(httpServer, { // creates a io instance
    cors: {
        origin: "http://localhost:5173"
    },
    // Add rate limiting
    connectTimeout: 45000,
    pingTimeout: 30000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e8
});

// Store active rooms
const activeRooms = new Map();

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        // Clean up rooms when user disconnects
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.leave(room);
                const roomUsers = io.sockets.adapter.rooms.get(room);
                if (roomUsers && roomUsers.size === 0) {
                    activeRooms.delete(room);
                }
            }
        }
    });

    // Handle errors
    socket.on("error", (error) => {
        console.error(`Socket error for ${socket.id}:`, error);
    });

    socket.on("join-room", (roomID, isHost) => {
        // Validate room ID
        if (!roomID || typeof roomID !== 'string' || roomID.length < 1) {
            socket.emit("error", "Invalid room ID");
            return;
        }

        // Join the room
        socket.join(roomID);
        
        // Store room info
        if (!activeRooms.has(roomID)) {
            activeRooms.set(roomID, {
                createdAt: Date.now(),
                users: new Set(),
                activities: [], // list of activities that users have submitted
                acceptedActivities: [], // list of activites that all users have in common\
                submitions: new Set(),
                done: new Set(), // stores the users who are done with their activities
                host: ""
            });
        }
        activeRooms.get(roomID).users.add(socket.id);
        // save the host id
        if (isHost) {
            activeRooms.get(roomID).host = socket.id;
        }
    });

    socket.on("submit-activities", (data) => {

        if (!data.roomID || !data.activities) {
            socket.emit("error", "Invalid input");
            return;
        }

        if (!socket.rooms.has(data.roomID)) {
            socket.emit('error', 'You are not in this room');
            return;
        }

        let room = activeRooms.get(data.roomID);
        room.submitions.add(socket.id); // keep track of the unsrs who submitted activities
        // add the activities to the room
        data.activities.forEach(activity => {
            room.activities.push(activity);
        });
    });

    socket.on("request-activities", (roomID, cb) => {
        if(!roomID) {
            socket.emit('error', 'Invalid room ID');
            return;
        }

        const room = activeRooms.get(roomID);
        cb(room.activities);
    });

    socket.on("wait-room", (roomID) => {
        
        if(!roomID) {
            socket.emit("error", "Invalid room ID");
            return;
        }

        const room = activeRooms.get(roomID);

        const payload = { // holds the data for the waiter room
            numSubmitions : room.submitions.size, // number of submitions
            numUsers : room.users.size // number of users in the room
        }

        if (room.host === socket.id) {
            io.to(socket.id).emit('host', true)
            io.to(roomID).emit('wait-room', payload);
        } else {
            io.to(roomID).emit('wait-room', payload);
        }
    })

    socket.on("continue", (roomID) => {
        if(!roomID) {
            socket.emit("error", "Invalid room ID");
            return;
        }

        io.to(roomID).emit("receive-continue");
    })


    socket.on("accepted-activities", (data, roomID) => {
        if(!data || !roomID) {
            socket.emit("error", "Invalid input");
            return;
        }
        const room = activeRooms.get(roomID);

        room.done.add(socket.id); // track users who are donee with thier activities

        // find the intersection of the acceptedactivities and the incoming activities.
        if(room.acceptedActivities.length === 0) {
            room.acceptedActivities = data; // if there are no accepted activities, set the accepted activities to the incoming ones
        } else {
            // get the intersection of the two sets.
            const tempSet = new Set(room.acceptedActivities);
            room.acceptedActivities = data.filter(activity => tempSet.has(activity));
        }

        const payload = {
            acceptedActivities : room.acceptedActivities
        }

        if (room.done.size === room.users.size) { // if all users done, send emit the data.
            io.to(roomID).emit("receive-done", payload);
        }
    });

});

// Clean up inactive rooms periodically
setInterval(() => {
    const now = Date.now();
    for (const [roomID, room] of activeRooms.entries()) {
        if (room.users.size === 0 && (now - room.createdAt) > 3600000) { // 1 hour
            activeRooms.delete(roomID);
        }
    }
}, 300000); // Check every 5 minutes

httpServer.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});