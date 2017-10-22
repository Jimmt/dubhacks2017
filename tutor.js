"use strict";

var $ = function(id) {
    return document.getElementById(id);
};

var socket = io.connect();

window.onload = function() {
    setupListeners();
}

function setupListeners() {
    socket.on("connected", function(socket) {
        alert("connected");
    });

    socket.on("otherMessage", function(socket){
    	$("chat").innerHTML += (socket.msg + "\n");
    });

    $("textfield").onkeypress = function(event) {
        if (event.which == 13 || event.keyCode == 13) {
            socket.emit("newMessage", { msg: $("textfield").value });
            $("chat").innerHTML += ($("textfield").value + "\n");
            $("textfield").value = "";
            return false;
        }
        return true;
    }
}