var socket = io.connect();

window.onload = function(){
	setupListeners();
}

function setupListeners(){
	socket.on("connected", function(socket){
		alert("connected");
	});
}