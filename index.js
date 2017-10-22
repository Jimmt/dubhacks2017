"use strict";

const express = require("express");
const app = express();
const http = require("http");

var server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", function(socket) {
    console.log("connected");
    socket.on("newMessage", function(data) {
        socket.broadcast.emit("otherMessage", { msg: data.msg });
    });
    socket.on("stream", function(data) {
    	console.log(data);
        io.emit("stream", { stream: data.stream });
    });
    socket.on("drawing", function(data) {
        socket.broadcast.emit("drawLine", data);
    });
    socket.on("text", function(data) {
        socket.broadcast.emit("drawText", data);
    });
    socket.on("newPage", function(data) {
        socket.broadcast.emit("createPage", data);
    });
    socket.on("prevPage", function(data) {
        socket.broadcast.emit("prevPage2", data);
    });
    socket.on("nextPage", function(data) {
        socket.broadcast.emit("nextPage2", data);
    });
    socket.on("clear", function(data) {
        socket.broadcast.emit("clearPage", data);
    });
});


server.listen(process.env.PORT || 5000, function() {
    console.log("listening on 5000");
});