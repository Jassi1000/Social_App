const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const { protectSocket } = require('../Middeware/protect');
const app = express();

const server = http.createServer(app);       //This is to connect using http {Without Socket express do it internally}
const io = new Server(server,{
    cors:{
      origin: [process.env.CLIENT_URL,"http://localhost:3001"],
      credentials: true
    }
});

//MiddleWare for the authentication and to get the user payload from the cookie
protectSocket(io);

io.on('connection',(socket)=>{
    console.log("User is connected --> ",socket.id);
    socket.on("disconnect",()=>{
        console.log("The user is disconnected --> ",socket.id);
    })
})

module.exports = {server,app}