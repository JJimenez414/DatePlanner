const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io'); // npm socket.io

const PORT = 3000;
const app = express();
const httpServer = createServer(app) // createServer expects a "requestlister" which express is
const io = new Server(httpServer, { // creates a io instance
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => { // start connection

    socket.on("join-room", (roomID) => { // listen for any sockets joining a room
        socket.join(roomID)
        io.to(roomID).emit('join-message', `${socket.id} has joined the room.`);
    })

});

httpServer.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
} )