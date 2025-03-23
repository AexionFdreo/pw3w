const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // Allows any client to connect (change this in production)
        methods: ["GET", "POST"]
    }
});

let sockets = []

io.on('connection', socket => {
    sockets.push(socket);
    console.log("io open ");

    socket.on('hi', data => {
        console.log('hi', data)
        sockets.forEach(element => {
            element.emit("hi", data.name + ": " + data.message);
        });
    })
})

server.listen(3000)
console.log("server listening at localhost:3000");