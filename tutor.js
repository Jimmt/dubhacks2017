"use strict";
var $ = function(id) {
    return document.getElementById(id);
};

var socket = io.connect();
var data, first;
const HEIGHT = 200;
const EPSILON = 10;

window.onload = function() {
    first = true;
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
    innerText.innerHTML = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    line.appendChild(innerText);
    scroll = false;
    if (Math.abs($("chat").scrollTop + HEIGHT - $("chat").scrollHeight) < EPSILON || clear) {
        scroll = true;
    }
    $("chat").appendChild(line);
    if (first) {
        $("chat").scrollTop = $("chat").scrollHeight;
        first = false;
    } else if (scroll) {
        $("chat").scrollTop = $("chat").scrollHeight;
    }
    if (clear) $("textfield").value = "";
}