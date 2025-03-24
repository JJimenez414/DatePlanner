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

    socket.on("join-room", (roomID) => {
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
                users: new Set()
            });
        }
        activeRooms.get(roomID).users.add(socket.id);
    });

    socket.on("submit-activities", (data) => {
        console.log(data);
        if (!data.roomID || !data.activities) {
            socket.emit("error", "Invalid input");
            return;
        }

        if (!socket.rooms.has(data.roomID)) {
            socket.emit('error', 'You are not in this room');
            return;
        }
        
        io.to(data.roomID).emit('receive-activities', data.activities);

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