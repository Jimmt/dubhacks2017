var c, ctx, drawing;
var down, eraser, colors;
var size;

const CLICKED = "red";
const NOT_CLICKED = "#90caf9";
const NOT_CLICKED_RGB = "rgb(144, 202, 249)";
const HOVER = "yellow";

window.onload = function() {
	initCanvas();
	initButtons();
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
}

function initButtons() {
	drawing = false;
	down = false;
	eraser = false;
	colors = false;
	extendSizes(false);
	var buttons = document.getElementsByClassName('button');
	buttons[0].onclick = function() {
		ctx.strokeStyle = "#000000";
		extendSizes(false);
		down = false;
		eraser = false;
		colors = false;
		extendColors(false);
		c.style.cursor = csrFormat(size, true);
		buttons[0].style.backgroundColor = CLICKED;
		buttons[1].style.backgroundColor = NOT_CLICKED;
	};
	buttons[1].onclick = function() {
		ctx.strokeStyle ="#FFFFFF";
		extendSizes(false);
		down = false;
		eraser = true; 
		colors = false;
		extendColors(false);
		c.style.cursor = csrFormat(size, false);
		buttons[0].style.backgroundColor = NOT_CLICKED;
		buttons[1].style.backgroundColor = CLICKED;
	};
	buttons[2].onclick = function() {
		extendSizes(!down);
		down = !down;
		colors = false;
		extendColors(false);
	};
	buttons[3].onclick = function() {
		extendSizes(false);
		down = false;
		extendColors(!colors);
		colors = !colors;
	};

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('mouseenter', function(e) {
			if (!e.target.style.backgroundColor || e.target.style.backgroundColor == NOT_CLICKED || e.target.style.backgroundColor == NOT_CLICKED_RGB) {
				e.target.style.backgroundColor = HOVER;
			}
		}, false);
		buttons[i].addEventListener('mouseleave', function(e) {
			if (e.target.style.backgroundColor == HOVER) {
				e.target.style.backgroundColor = NOT_CLICKED;
			}
		}, false);
	}
	initSizes();
}

function extendSizes(extend) {
	var buttons = document.getElementsByClassName('sizechoice');
	var sizes = document.getElementById('size');
	document.getElementById('sizeWrapper').style.width = (extend) ? '80px' : '40px';
	document.getElementById('sizerow').style.maxWidth = (extend) ? '40px' : '0px';
	for (var i = 0; i < buttons.length; i++) {
		if (extend) {
			buttons[i].style.maxHeight = "40px";
			buttons[i].children[0].src = "img/csr/" + Math.pow(2, i) + (eraser ? '_empty.png' : '_filled.png');
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
				c.style.cursor = csrFormat(size, !eraser);
				ctx.lineWidth = Math.pow(2, j);
				for (var k = 0; k < buttons.length; k++) {
					buttons[k].style.backgroundColor = (k == j) ? CLICKED : NOT_CLICKED;
				}
			};
		};
		buttons[i].onclick = temp(i);
	}
}

function startDraw(e) {
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

function csrFormat(num, filled) {
	return 'url(img/csr/' + num + (filled ? '_filled' : '_empty') + '.png), auto';
}

function update(jscolor) {
	ctx.strokeStyle = '#' + jscolor;
}