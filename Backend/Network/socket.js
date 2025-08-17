const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const { protectSocket } = require('../Middeware/protect');
const { addUserSocket, removeUserSocket, getOnlineUsers } = require('../Jobs/mapSocketid');
const { handleSendMessage } = require('../Controller/socketChatControl');
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
    const userId = socket.user.id;
    addUserSocket(userId,socket.id);

    const onlineuser = getOnlineUsers();
    io.emit("onlineUsers",onlineuser);

    socket.on("sendMessage",(data)=>{
        //for testing with postman can be removed when real frontend call
        if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        } catch (err) {
            console.error("Invalid JSON received:", err);
            return;
        }
        }
        handleSendMessage(socket,io,data)
    });

    socket.on("disconnect",()=>{
        console.log("The user is disconnected --> ",socket.id);
        removeUserSocket(userId);
        const onlineuser = getOnlineUsers();
        io.emit("onlineUsers",onlineuser);
    })

})

module.exports = {server,app}