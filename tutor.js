"use strict";
var $ = function(id) {
    return document.getElementById(id);
};

var socket = io.connect();
var data;

window.onload = function() {
    setupListeners();
    data = read_cookie("data");
}

function setupListeners() {
    socket.on("connected", function(socket) {
        alert("connected");
    });

    socket.on("otherMessage", function(socket) {
        addMessage(socket.msg, false);
    });

    socket.on("stream", function(data){
        console.log("theirs");
        $("their-video").srcObject = data.stream;
    });

    $("textfield").onkeypress = function(event) {
        if (event.which == 13 || event.keyCode == 13) {
            var msg = processMessage($("textfield").value);
            socket.emit("newMessage", { msg: msg });
            addMessage(msg, true);
            return false;
        }
        return true;
    }
}

function processMessage(text) {
    return data.name + ": " + text;
}

function addMessage(text, clear) {
    var line = document.createElement("div");
    line.classList.add("line");
    if (clear) line.classList.add("mine");
    var innerText = document.createElement("p");
    innerText.innerHTML = text;
    line.appendChild(innerText);
    $("chat").appendChild(line);
    if (clear) $("textfield").value = "";
}