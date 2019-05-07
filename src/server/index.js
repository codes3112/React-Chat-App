//set up the server
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io =require ('socket.io')(server);

// const app = require('http').createServer();
// const io = module.exports.io =require ('socket.io')(app);

const PORT = process.env.PORT || 4000;

const SocketManager = require('./SocketManager');
app.use(express.static(__dirname + '/../../build'))
io.on('connection', SocketManager)

// app.listen(PORT, () =>{
//     console.log("Connected to Port" + PORT);
// })
server.listen(PORT, () =>{
    console.log("Connected to Port" + PORT);
})


