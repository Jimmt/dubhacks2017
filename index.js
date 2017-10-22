var ctx, drawing;

window.onload = function() {
	initCanvas();
	initButtons();
};

function initCanvas() {
	var c = document.getElementById('c');
	ctx = c.getContext("2d");
	c.height = c.clientHeight;
	c.width = c.clientWidth;
	console.log(c.height);
	drawing = false;
	c.addEventListener('mousedown', startDraw, false);
	c.addEventListener('mousemove', drawPt, false);
	c.addEventListener('mouseup', stopDraw, false);
	colorButtons(0);
}

function initButtons() {
	var buttons = document.getElementsByClassName('button');
	buttons[0].onclick = function() {
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 1;
		colorButtons(0);
	}
	buttons[1].onclick = function() {
		ctx.strokeStyle ="#FFFFFF";
		ctx.lineWidth = 10;
		colorButtons(1);
	}
}

function colorButtons(k) {
	var buttons = document.getElementsByClassName('button');
	for (var i = 0; i < buttons.length; i++) {
		if (i == k) {
			buttons[i].style.backgroundColor = "red";
		} else {
			buttons[i].style.backgroundColor = "white";
		}
	}
}

function startDraw(e) {
	var currX = e.clientX - c.offsetLeft + 0.5;
	var currY = e.clientY - c.offsetTop + 0.5;
	ctx.beginPath();
	ctx.moveTo(currX, currY);
	drawing = true;
}

function drawPt(e) {
	if (drawing) {
		var currX = e.clientX - c.offsetLeft + 0.5;
		var currY = e.clientY - c.offsetTop + 0.5;
		ctx.lineTo(currX, currY);
		ctx.stroke();
	}
}

function stopDraw(e) {
	drawing = false;
}