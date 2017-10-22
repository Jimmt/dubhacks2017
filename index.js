"use strict";

const express = require("express");
const app = express();
const http = require("http");

var server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
	res.sendFile(__dirname +'/index.html');
});

io.on("connection", function(socket) {
	console.log("connected");
	socket.emit("connected");
});

server.listen(process.env.PORT || 5000, function() {
    console.log("listening on 5000");
});