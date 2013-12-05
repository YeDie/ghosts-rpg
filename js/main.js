// ECMAScript 5 Strict Mode
"use strict";

// Canvas vars
var can;
var ctx;

// Game vars
var state = "menu";
var menu = "main";

// Menu vars
var bpos = 0;
var buttonxpos;
var buttonypos;
var buttonaction;

var checkboxid;
var checkboxstate = [];
var checkboxxpos;
var checkboxypos;
var checkboxonaction;
var checkboxoffaction;

var sliderid;
var sliderpos = [];
var sliderxpos;
var sliderypos;
var slideraction;

var mousedown = false;

function initialize() {
	// Define the canvas background
	can = document.getElementById("canvas");
	
	// Check if the browser can handle the awesomeness of canvas
	if (can.getContext) {
		// Good browser!
		ctx = can.getContext("2d");
		state = "menu";
		menu = "main";
		ctx.font = "normal 12pt Calibri";
		can.addEventListener("mousedown", mouseclick, false);
		can.addEventListener("mouseup", mouserelease, false);
		can.addEventListener("mousemove", mousemove, false);
		gameloop();
	}
	else {
		// Bad browser!
		var par = document.createElement("p");
		par.appendChild(document.createTextNode("I'm sorry, but your web browser is too stupid to view this page."));
		document.getElementsByTagName("body")[0].appendChild(par);
	}
}

// Function that requests animation frames
window.requestAF = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

function gameloop() {
	// Game main loop
	
	ctx.clearRect(0, 0, can.width, can.height);
	if (state === "menu") {
		menuloop();
	}
	else if (state === "map") {
		// TODO
	}
	else if (state === "battle") {
		// TODO
	}
	window.requestAF(function() {
		gameloop();
	});
}

function menuloop() {
	bpos = 64;
	buttonxpos = [];
	buttonypos = [];
	buttonaction = [];
	checkboxid = 0;
	checkboxxpos = [];
	checkboxypos = [];
	checkboxonaction = [];
	checkboxoffaction = [];
	sliderid = 0;
	sliderxpos = [];
	sliderypos = [];
	slideraction = [];
	
	if (menu === "main") {
		ctx.fillStyle = "rgb(0,0,200)";
		ctx.fillText("Main Menu!", 16, 16);
		addbutton("Play", function() {
			window.alert("");
		});
		addbutton("Options", function() {
			menu = "options";
		});
	}
	else if (menu === "options") {
		ctx.fillStyle = "rgb(0,0,200)";
		ctx.fillText("Options Menu", 16, 16);
		addslider("Mr. Slider", function(pos) {
			console.log("pos: " + pos);
		}, 64);
		addcheckbox("Mrs. CheckBox", function() {
			console.log("on");
		}, function() {
			console.log("off");
		}, "off");
		addbutton("Save", function() {
                        window.alert("Saved! (Not really, I haven't implemented that yet.)");
                        menu = "main";
                });
	}
}

function addbutton(text, action) {
	// Draw button rectangle
	ctx.fillStyle = "rgb(200,0,0)";
	ctx.fillRect(8, bpos, 128, 24);
	
	// Draw text on button
	ctx.fillStyle = "rgb(0,200,0)";
	ctx.fillText(text, 16, bpos + 16);
	
	// Adds button positions to array for onclick detection
        buttonxpos.push(8);
        buttonypos.push(bpos);
        buttonaction.push(action);
	
	bpos += 32;
}

function addslider(text, action, defpos) {
	// Draw slider line
	ctx.fillStyle = "rgb(200,0,0)";
	ctx.fillRect(8, bpos + 36, 128, 4);
	
	if (sliderpos.length <= sliderid) {
		// Set to default state if not set
		sliderpos.push(defpos);
	}
	// Draw name
        ctx.fillStyle = "rgb(0,200,0)";
        ctx.fillText(text + " (" + Math.round((sliderpos[sliderid] / 128) * 100) + "%)", 16, bpos + 16);
	
	// Draw knob
	ctx.fillStyle = "rgb(0,0,200)";
	ctx.fillRect(4 + sliderpos[sliderid], bpos + 32, 8, 12);
	
	sliderxpos.push(8);
	sliderypos.push(bpos + 36);
	slideraction.push(action);
	
	bpos += 64;
	sliderid += 1;
}

function addcheckbox(text, onaction, offaction, defstate) {
	// Draw checkbox square
	ctx.fillStyle = "rgb(200,0,0)";
	ctx.strokeRect(8, bpos, 24, 24);
	
	if (checkboxstate.length <= checkboxid) {
		// Set to default state if not set
		checkboxstate.push(defstate);
	}
	else if (checkboxstate[checkboxid] === "on") {
		// Draw cross if set to on
		ctx.beginPath();
		ctx.moveTo(8, bpos);
		ctx.lineTo(32, bpos + 24);
		ctx.moveTo(32, bpos);
		ctx.lineTo(8, bpos + 24);
		ctx.closePath();
		ctx.stroke();
	}
	
	ctx.fillStyle = "rgb(0,200,0)";
	ctx.fillText(text, 40, bpos + 16);
	
	checkboxxpos.push(8);
	checkboxypos.push(bpos);
	checkboxonaction.push(onaction);
	checkboxoffaction.push(offaction);
	
	bpos += 32;
	checkboxid += 1;
}

function mouseclick(ev) {
	mousedown = true;
	if (state === "menu") {
		// Check if a button was clicked
		buttonxpos.forEach(function(xpos, index) {
			if (ev.pageX >= xpos + can.offsetLeft && ev.pageX <= xpos + 128 + can.offsetLeft) {
				if (ev.pageY >= buttonypos[index] + can.offsetTop && ev.pageY <= buttonypos[index] + 24 + can.offsetTop) {
					buttonaction[index]();
				}
			}
		});
		// Check if a checkbox was clicked
		checkboxxpos.forEach(function(xpos, index) {
			if (ev.pageX >= xpos + can.offsetLeft && ev.pageX <= xpos + 24 + can.offsetLeft) {
				if (ev.pageY >= checkboxypos[index] + can.offsetTop && ev.pageY <= checkboxypos[index] + 24 + can.offsetTop) {
					if (checkboxstate[index] === "off") {
						checkboxstate[index] = "on";
						checkboxonaction[index]();
					}
					else if (checkboxstate[index] === "on") {
						checkboxstate[index] = "off";
						checkboxoffaction[index]();
					}
				}
			}
		});
	}
}

function mousemove(ev) {
	if (state === "menu") {
		if (mousedown === true) {
			// Check if slider is being dragged
			sliderxpos.forEach(function(xpos, index) {
				if (ev.x >= xpos + can.offsetLeft && ev.x <= xpos + 128 + can.offsetLeft) {
					if (ev.y >= sliderypos[index] - 2 + can.offsetTop && ev.y <= sliderypos[index] + 8 + can.offsetTop) {
						sliderpos[index] = ev.x + can.offsetLeft - 24;
						slideraction[index](ev.x + can.offsetLeft - 24);
					}
				}
			});
		}
	}
}

function mouserelease() {
	mousedown = false;
}

window.onload = initialize;
