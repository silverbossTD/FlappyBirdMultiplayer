/**
 * Starts and initiate the game
 */
function main(mySide) {
    console.log(mySide);
	// create canvas and set width/height
	canvas = document.createElement("canvas");

	width = window.innerWidth;
	height = window.innerHeight;

	var evt = "touchstart";
	if (width >= 500) {
		width  = 320;
		height = 480;
		canvas.style.border = "1px solid #000";
		evt = "mousedown";
	}

	// listen for input event
	document.addEventListener(evt, onpress);
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 32) {
            onpress();
        }
    });

	canvas.width = width;
	canvas.height = height;
	if (!(!!canvas.getContext && canvas.getContext("2d"))) {
		alert("Your browser doesn't support HTML5, please update to latest version");
	}
	ctx = canvas.getContext("2d");

	currentstate = states.Splash;
    currentstate2 = states.Splash;
	// append canvas to document
	document.body.appendChild(canvas);

	// initate graphics and okbtn
	var img = new Image();
	img.onload = function() {
		initSprites(this);
		ctx.fillStyle = s_bg.color;

		okbtn = {
			x: (width - s_buttons.Ok.width)/2,
			y: height - 200,
			width: s_buttons.Ok.width,
			height: s_buttons.Ok.height
		}

		run(mySide);
	}
	img.src = "res/sheet.png";
}

/**
 * Starts and update gameloop
 */

function run(mySide) {
	var loop = function() {
		(mySide === 0) ? update() : join();
		render();
		window.requestAnimationFrame(loop, canvas);
	}
	window.requestAnimationFrame(loop, canvas);
}

/**
 * Update forground, bird and pipes position
 */
function update() {
	frames++;
    frames2++;

	if (currentstate !== states.Score) {
		fgpos = (fgpos - 2) % 14;
	} else {
		// set best score to maximum score
		best = Math.max(best, score);
		localStorage.setItem("best", best);
	}
	if (currentstate === states.Game) {
		pipes.update();
	}

	bird.update();
    bird2.update();
}

function join() {
	frames++;
    frames2++;

	if (currentstate !== states.Score) {
		fgpos = (fgpos - 2) % 14;
	}
    else {
		// set best score to maximum score
		best = Math.max(best, score);
		localStorage.setItem("best", best);
	}
	if (currentstate === states.Game) {
		pipes.joinChannel();
	}

	bird.update();
    bird2.update();
}

/**
 * Draws bird and all pipes and assets to the canvas
 */
function render() {
	// draw background color
	ctx.fillRect(0, 0, width, height);
	// draw background sprites
	s_bg.draw(ctx, 0, height - s_bg.height);
	s_bg.draw(ctx, s_bg.width, height - s_bg.height);

	pipes.draw(ctx);
	bird.draw(ctx);
    bird2.draw(ctx);

	// draw forground sprites
	s_fg.draw(ctx, fgpos, height - s_fg.height);
	s_fg.draw(ctx, fgpos+s_fg.width, height - s_fg.height);

	var width2 = width/2; // center of canvas

	if (currentstate === states.Splash) {
		// draw splash text and sprite to canvas
		s_splash.draw(ctx, width2 - s_splash.width/2, height - 300);
		s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width/2, height-380);

	}
	if (currentstate === states.Score) {
		// draw gameover text and score board
		// s_text.GameOver.draw(ctx, width2 - s_text.GameOver.width/2, height-400);
		// s_score.draw(ctx, width2 - s_score.width/2, height-340);
		// s_buttons.Ok.draw(ctx, okbtn.x, okbtn.y);
		// // draw score and best inside the score board
		// s_numberS.draw(ctx, width2-47, height-304, score, null, 10);
		// s_numberS.draw(ctx, width2-47, height-262, best, null, 10);

	} else {
		// draw score to top of canvas
		s_numberB.draw(ctx, null, 20, score, width2);

	}
}

// start and run the game
// main();
