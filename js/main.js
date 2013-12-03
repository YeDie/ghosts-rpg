// Canvas vars
var can;
var ctx;
var cwidth;
var cheight;

// Game vars
var state = "menu";
var menu = "main";

// Menu vars
var bpos = 0;
var buttonsxpos;
var buttonsypos;
var buttonsaction;

function initialize() {
	// Define the canvas background
	can = document.getElementById("canvas");
	
	cwidth = can.width;
	cheight = can.height;
	
	// Check if the browser can handle the awesomeness of canvas.
	if (can.getContext){
		// Good browser!
		ctx = can.getContext("2d");
		state = "menu";
		menu = "main";
		ctx.font = "normal 12pt Calibri";
		can.addEventListener("mousedown", mouseclick, false);
		//ctx.fillStyle = "rgb(200,0,0)";
		//ctx.fillRect(16, 16, cwidth - 16, cheight - 16);
		gameloop();
	}
	else{
		// Bad browser!
		// TODO: Handle unsupported browsers
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
	
	ctx.clearRect(0, 0, cwidth, cheight);
	if (state == "menu"){
		menuloop();
	}
	else if (state == "map"){
		// TODO
	}
	else if (state == "battle"){
		// TODO
	}
	window.requestAF(function() {
		gameloop();
});
}

function menuloop() {
	bpos = 64;
	buttonsxpos = [];
	buttonsypos = [];
	buttonsaction = [];
	if (menu == "main"){
		ctx.fillStyle = "rgb(0,0,200)";
		ctx.fillText("Main Menu!", 16, 16);
		addbutton("Play", "startgame");
		addbutton("Options", "optionsmenu");
	}
}

function addbutton(text, action) {
	// Draw button rectangle
	ctx.fillStyle = "rgb(200,0,0)";
	ctx.fillRect(8, bpos, 128, 24);
	
	// Adds button positions to array for onclick detection
	buttonsxpos.push(8);
	buttonsypos.push(bpos)
	buttonsaction.push(action)
	
	// Draw text on button
	ctx.fillStyle = "rgb(0,200,0)";
	ctx.fillText(text, 16, bpos + 16);
	
	bpos += 32;
}

function mouseclick(ev) {
	if (state == "menu"){
		console.log("MouseX: " + ev.pageX + ", MouseY: " + ev.pageY);
		// Check if a button was clicked
		buttonsxpos.forEach(function(xpos, index) {
			if (ev.pageX >= xpos + can.offsetLeft && ev.pageX <= xpos + 128 + can.offsetLeft) {
				if (ev.pageY >= buttonsypos[index] + can.offsetTop && ev.pageY <= buttonsypos[index] + 24 + can.offsetTop) {
					window.alert(buttonsaction[index]);
				}
			}
		});
	}
}
