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
    socket.on("pageChange", function(data) {
        socket.broadcast.emit("drawPage", data);
    })
});


server.listen(process.env.PORT || 5000, function() {
    console.log("listening on 5000");
});