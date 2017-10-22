var c, ctx, drawing;
var down, eraser, colors, text;
var size, jscolor;
var canvases;
var curr, total;
var brush, eraserButton, textInput, sizeButton, palette, clearButton, prevPage, nextPage, newPage;

const CLICKED = "red";
const NOT_CLICKED = "#90caf9";
const NOT_CLICKED_RGB = "rgb(144, 202, 249)";
const HOVER = "#dcdcdc";
const HOVER_RGB = "rgb(220, 220, 220)";

window.onload = function() {
	curr = 0;
	total = 1;
	canvases = [];
	initCanvas();
	initButtons();
	initSizes();
	ctx.save();
};

function initCanvas() {
	c = document.getElementById('c');
	ctx = c.getContext("2d");
	c.height = c.clientHeight;
	c.width = c.clientWidth;
	size = 1;
	c.addEventListener('mousedown', startDraw, false);
	c.addEventListener('mousemove', drawPt, false);
	c.addEventListener('mouseup', stopDraw, false);
	var buttons = document.getElementsByClassName('button');
	buttons[0].style.backgroundColor = CLICKED;
	for (var i = 1; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = NOT_CLICKED;
	}
	buttons = document.getElementsByClassName('sizechoice');
	buttons[0].style.backgroundColor = CLICKED;
	for (var i = 1; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = NOT_CLICKED;
	}
	buttons = document.getElementsByClassName('canvas-button');
	buttons[0].style.opacity = 0.2;
	buttons[1].style.opacity = 0.2;
}

function initButtons() {
	drawing = false;
	down = false;
	eraser = false;
	colors = false;
	text = false;
	extendSizes(false);
	extendColors(false);
	var buttons = document.getElementsByClassName('button');
	brush = buttons[0];
	eraserButton = buttons[1];
	textInput = buttons[2];
	sizeButton = buttons[3];
	palette = buttons[4];
	clearButton = buttons[5];

	brush.onclick = function() {
		ctx.strokeStyle = "#000000";
		extendSizes(false);
		down = false;
		eraser = false;
		colors = false;
		text = false;
		extendColors(false);
		c.style.cursor = csrFormat(2 * size, true);
		brush.style.backgroundColor = CLICKED;
		eraserButton.style.backgroundColor = NOT_CLICKED;
		textInput.style.backgroundColor = NOT_CLICKED;
	};
	eraserButton.onclick = function() {
		ctx.strokeStyle ="#FFFFFF";
		extendSizes(false);
		down = false;
		eraser = true; 
		colors = false;
		text = false;
		extendColors(false);
		c.style.cursor = csrFormat(4 * size, false);
		brush.style.backgroundColor = NOT_CLICKED;
		eraserButton.style.backgroundColor = CLICKED;
		textInput.style.backgroundColor = NOT_CLICKED;
	};
	textInput.onclick = function() {
		extendSizes(false);
		extendColors(false);
		down = false;
		colors = false;
		c.style.cursor = 'text';
		text = true;
		brush.style.backgroundColor = NOT_CLICKED;
		eraserButton.style.backgroundColor = NOT_CLICKED;
		textInput.style.backgroundColor = CLICKED;
	}
	sizeButton.onclick = function() {
		extendSizes(!down);
		down = !down;
		colors = false;
		extendColors(false);
	};
	palette.onclick = function() {
		extendSizes(false);
		down = false;
		extendColors(!colors);
		colors = !colors;
	};
	clearButton.onclick = function() {
		drawing = false;
		down = false;
		eraser = false;
		colors = false;
		extendSizes(false);
		extendColors(false);
		ctx.clearRect(0, 0, c.width, c.height);
	}
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('mouseenter', function(e) {
			if (e.target.style.backgroundColor == NOT_CLICKED || e.target.style.backgroundColor == NOT_CLICKED_RGB) {
				e.target.style.backgroundColor = HOVER;
			}
		}, false);
		buttons[i].addEventListener('mouseleave', function(e) {
			if (e.target.style.backgroundColor == HOVER || e.target.style.backgroundColor == HOVER_RGB) {
				e.target.style.backgroundColor = NOT_CLICKED;
			}
		}, false);
	}

	buttons = document.getElementsByClassName('canvas-button');
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = NOT_CLICKED;
		buttons[i].addEventListener('mouseenter', function(e) {
			if ((e.target.style.backgroundColor == NOT_CLICKED || e.target.style.backgroundColor == NOT_CLICKED_RGB) && e.target.style.opacity == 1) {
				e.target.style.backgroundColor = HOVER;
			}
		}, false);
		buttons[i].addEventListener('mouseleave', function(e) {
			if (e.target.style.backgroundColor == HOVER || e.target.style.backgroundColor == HOVER_RGB) {
				e.target.style.backgroundColor = NOT_CLICKED;
			}
		}, false);
	}
	prevPage = buttons[0];
	nextPage = buttons[1];
	newPage = buttons[2];
	prevPage.addEventListener('mousedown', function(e) {
		if (curr == 0 || total == 1) {
			return;
		}
		canvases[curr] = ctx.getImageData(0, 0, c.width, c.height);
		curr--;
		if (curr == 0) {
			prevPage.style.opacity = 0.2;
		}
		nextPage.style.opacity = 1.0;
		reset();
		ctx.putImageData(canvases[curr], 0, 0);
	});
	nextPage.addEventListener('mousedown', function(e) {
		if (curr == total - 1 || total == 1) {
			return;
		}
		canvases[curr] = ctx.getImageData(0, 0, c.width, c.height);
		curr++;
		if (curr == canvases.length - 1) {
			nextPage.style.opacity = 0.2;
		}
		prevPage.style.opacity = 1.0;
		reset();
		ctx.putImageData(canvases[curr], 0, 0);
	});
	newPage.addEventListener('mousedown', function(e) {
		var data = ctx.getImageData(0, 0, c.width, c.height);
		canvases.push(data);
		curr += 1;
		total++;
		reset();
		prevPage.style.opacity = 1.0;
		nextPage.style.opacity = 0.2;
	});
}

function reset() {
	var buttons = document.getElementsByClassName('button');
	brush.style.backgroundColor = CLICKED;
	for (var i = 1; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = NOT_CLICKED;
	}
	buttons = document.getElementsByClassName('sizechoice');
	buttons[0].style.backgroundColor = CLICKED;
	for (var i = 1; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = NOT_CLICKED;
	}
	drawing = false;
	down = false;
	eraser = false;
	colors = false;
	text = false;
	extendSizes(false);
	extendColors(false);
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.restore();
	ctx.save();
}

function extendSizes(extend) {
	var buttons = document.getElementsByClassName('sizechoice');
	var sizes = document.getElementById('size');
	document.getElementById('sizeWrapper').style.width = (extend) ? '85px' : '45px';
	document.getElementById('sizerow').style.maxWidth = (extend) ? '45px' : '0px';
	for (var i = 0; i < buttons.length; i++) {
		if (extend) {
			buttons[i].style.maxHeight = "40px";
			buttons[i].children[0].src = "img/csr/" + Math.pow(2, i + 1) + (eraser ? '_empty.png' : '_filled.png');
			buttons[i].children[0].style.display = "block";
			sizes.style.backgroundColor = CLICKED;
		} else {
			buttons[i].style.maxHeight = "0px";
			buttons[i].children[0].style.display = "none";
			sizes.style.backgroundColor = NOT_CLICKED;
		}
	}
}

function extendColors(extend) {
	var color = document.getElementById('color');
	if (extend) {
		color.style.backgroundColor = CLICKED;
		color.jscolor.show();
	} else {
		color.style.backgroundColor = NOT_CLICKED;
		color.jscolor.hide();
	}
}

function initSizes() {
	var buttons = document.getElementsByClassName('sizechoice');
	for (var i = 0; i < buttons.length; i++) {
		var temp = function(j) {
			return function() {
				size = Math.pow(2, j);
				if (!text) {
					c.style.cursor = csrFormat((eraser ? 4 : 2) * size, !eraser);
				}
				ctx.lineWidth = (eraser ? 4 : 2) * Math.pow(2, j);
				for (var k = 0; k < buttons.length; k++) {
					buttons[k].style.backgroundColor = (k == j) ? CLICKED : NOT_CLICKED;
				}
			};
		};
		buttons[i].onclick = temp(i);
	}
}

function startDraw(e) {
	if (!text) {
		var currX = e.clientX - c.offsetLeft + 0.5;
		var currY = e.clientY - c.offsetTop + 0.5;
		ctx.moveTo(currX, currY);
		ctx.beginPath();
		extendSizes(false);
		drawing = true;
		colors = false;
		down = false;
		extendColors(false);
	}
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
	if (text) { 
		var input = document.createElement("input");
		input.type = 'text';
		input.id = "test";
		input.className = 'textbox';
		input.style.position = "absolute";
		input.style.left = e.clientX - c.offsetLeft;
		input.style.top = e.clientY - c.offsetTop;
		input.style.width = "5px";
		input.style.fontSize = size * 8 + "px";
		input.style.color = jscolor;
		document.getElementById("canvasWrapper").append(input);
		input.focus();
		input.onkeyup = function() {
			var temp = document.createElement("span");
			temp.id = "temp";
			temp.style.fontSize = input.style.fontSize;
			temp.innerHTML = input.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
			document.body.appendChild(temp);
			var width = temp.getBoundingClientRect().width;
			document.body.removeChild(temp);
			input.style.width = Math.min(width + (input.style.fontSize.substring(0, input.style.fontSize.length - 2) / 2 + 4), c.width - input.style.left.substring(0, input.style.left.length - 2)) + "px";
		}
	}
}

function csrFormat(num, filled) {
	return 'url(img/csr/' + num + (filled ? '_filled' : '_empty') + '.png), auto';
}

function update(color) {
	jscolor = '#' + color;
	ctx.strokeStyle = jscolor;
}