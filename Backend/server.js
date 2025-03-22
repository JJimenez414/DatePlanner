const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');
const httpServer = createServer(app) // createServer expects a "requestlister" which express is
const io = new Server(httpServer, { // creates a io instance
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {

    socket.on("send-message", (arg) => {
        console.log(arg);
        io.emit("receive-message", `hi ${arg}`);
    });

});

app.use(bodyParser.json())

httpServer.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
} )