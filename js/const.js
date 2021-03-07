
var

// Game vars //

canvas,
ctx,
width,
height,

fgpos = 0,
frames = 0,
frames2 = 0,
score = 0,
best = localStorage.getItem("best") || 0,

// State vars //

currentstate,
currentstate2,
states = {
	Splash: 0, Game: 1, Score: 2
},

// Game objects //

/**
 * Ok button initiated in main()
 */
okbtn,

/**
 * The bird
 */
bird = {

	x: 60,
	y: 0,

	frame: 0,
	velocity: 0,
	animation: [0, 1, 2, 1], // animation sequence

	rotation: 0,
	radius: 12,

	gravity: 0.25,
	_jump: 4.6,

	/**
	 * Makes the bird "flap" and jump
	 */
	jump: function() {
		this.velocity = -this._jump;
	},

	/**
	 * Update sprite animation and position of bird
	 */
	update: function() {
		// make sure animation updates and plays faster in gamestate
		var n = currentstate === states.Splash ? 10 : 5;
		this.frame += frames % n === 0 ? 1 : 0;
		this.frame %= this.animation.length;

		// in splash state make bird hover up and down and set
		// rotation to zero
		if (currentstate === states.Splash) {

			this.y = height - 280 + 5*Math.cos(frames/10);
			this.rotation = 0;

		} else { // game and score state //

			this.velocity += this.gravity;
			this.y += this.velocity;

			// change to the score state when bird touches the ground
			if (this.y >= height - s_fg.height-10) {
				this.y = height - s_fg.height-10;
				if (currentstate === states.Game) {
					currentstate = states.Score;
				}
				// sets velocity to jump speed for correct rotation
				this.velocity = this._jump;
			}

			// when bird lack upward momentum increment the rotation
			// angle
			if (this.velocity >= this._jump) {

				this.frame = 1;
				this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);

			} else {

				this.rotation = -0.3;

			}
		}
	},

	/**
	 * Draws bird with rotation to canvas ctx
	 *
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx) {
		ctx.save();
		// translate and rotate ctx coordinatesystem
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);

		var n = this.animation[this.frame];
		// draws the bird with center in origo
		s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2);

		ctx.restore();
	}
},

bird2 = {

	x: 60,
	y: 0,

	frame: 0,
	velocity: 0,
	animation: [0, 1, 2, 1], // animation sequence

	rotation: 0,
	radius: 12,

	gravity: 0.25,
	_jump: 4.6,

	/**
	 * Makes the bird "flap" and jump
	 */
	jump: function() {
		this.velocity = -this._jump;
        currentstate2 += this.velocity;
	},

	/**
	 * Update sprite animation and position of bird
	 */
	update: function() {
		if (bird2.y >= 358) {
			bird2.x -= 2;
			if (bird2.x <= -100) bird2.x = -100;
		}
        // make sure animation updates and plays faster in gamestate
		var n = currentstate2 === states.Splash ? 10 : 5;
		this.frame += frames2 % n === 0 ? 1 : 0;
		this.frame %= this.animation.length;

		// in splash state make bird hover up and down and set
		// rotation to zero
		if (currentstate2 == states.Splash) {

			this.y = height - 280 + 5*Math.cos(frames2/10);
			this.rotation = 0;

		} else { // game and score state //

			this.velocity += this.gravity;
			this.y += this.velocity;

			// change to the score state when bird touches the ground
			if (this.y >= height - s_fg.height-10) {
				this.y = height - s_fg.height-10;
				if (currentstate2 === states.Game) {
					currentstate2 = states.Score;
				}
				// sets velocity to jump speed for correct rotation
				this.velocity = this._jump;
			}

			// when bird lack upward momentum increment the rotation
			// angle
			if (this.velocity >= this._jump) {

				this.frame = 1;
				this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);

			} else {

				this.rotation = -0.3;

			}
		}
	},

	/**
	 * Draws bird with rotation to canvas ctx
	 *
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx) {
        ctx.globalAlpha = 0.5;
		ctx.save();
		// translate and rotate ctx coordinatesystem
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);

		var n = this.animation[this.frame];
		// draws the bird with center in origo
		s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2);

		ctx.restore();
        ctx.globalAlpha = 1;
	}
},

/**
 * The pipes
 */
pipes = {

	_pipes: [],
	// padding: 80, // TODO: Implement paddle variable

	/**
	 * Empty pipes array
	 */
	reset: function() {
		this._pipes = [];
	},

	/**
	 * Create, push and update all pipes in pipe array
	 */
	update: function() {
		// add new pipe each 100 frames
		if (frames % 100 === 0 && currentstate > 0) {
			// calculate y position
			var _y = height - (s_pipeSouth.height+s_fg.height+120+200*Math.random());
			// create and push pipe to array
            const newPipe = {
				x: 500,
				y: _y,
				width: s_pipeSouth.width,
				height: s_pipeSouth.height
			}
            this._pipes.push(newPipe);
            send(channel, 'addPipe', newPipe);
		}
		for (var i = 0, len = this._pipes.length; i < len; i++) {
			var p = this._pipes[i];

			if (i === 0) {

				score += p.x === bird.x ? 1 : 0;

				// collision check, calculates x/y difference and
				// use normal vector length calculation to determine
				// intersection
				var cx  = Math.min(Math.max(bird.x, p.x), p.x+p.width);
				var cy1 = Math.min(Math.max(bird.y, p.y), p.y+p.height);
				var cy2 = Math.min(Math.max(bird.y, p.y+p.height+80), p.y+2*p.height+80);
				// closest difference
				var dx  = bird.x - cx;
				var dy1 = bird.y - cy1;
				var dy2 = bird.y - cy2;
				// vector length
				var d1 = dx*dx + dy1*dy1;
				var d2 = dx*dx + dy2*dy2;
				var r = bird.radius*bird.radius;
				// determine intersection
				if (r > d1 || r > d2) {
					currentstate = states.Score;
				}
			}
			// move pipe and remove if outside of canvas
			p.x -= 2;
			if (p.x < -p.width) {
				this._pipes.splice(i, 1);
				i--;
				len--;
			}
		}
	},

    addPipe: function(pipe) {
        this._pipes.push(pipe);
    },

    joinChannel: function() {
        (bird2.y >= 358 && mySide === 1) && this.auto();
		for (var i = 0, len = this._pipes.length; i < len; i++) {
			var p = this._pipes[i];

			if (i === 0) {

				score += p.x === bird.x ? 1 : 0;

				// collision check, calculates x/y difference and
				// use normal vector length calculation to determine
				// intersection
				var cx  = Math.min(Math.max(bird.x, p.x), p.x+p.width);
				var cy1 = Math.min(Math.max(bird.y, p.y), p.y+p.height);
				var cy2 = Math.min(Math.max(bird.y, p.y+p.height+80), p.y+2*p.height+80);
				// closest difference
				var dx  = bird.x - cx;
				var dy1 = bird.y - cy1;
				var dy2 = bird.y - cy2;
				// vector length
				var d1 = dx*dx + dy1*dy1;
				var d2 = dx*dx + dy2*dy2;
				var r = bird.radius*bird.radius;
				// determine intersection
				if (r > d1 || r > d2) {
					currentstate = states.Score;
				}
			}
			// move pipe and remove if outside of canvas
			p.x -= 2;
			if (p.x < -p.width) {
				this._pipes.splice(i, 1);
				i--;
				len--;
			}
		}
    },

    auto: function() {
        if (frames % 100 === 0) {
            // calculate y position
            var _y = height - (s_pipeSouth.height+s_fg.height+120+200*Math.random());
            // create and push pipe to array
            const newPipe = {
                x: 500,
                y: _y,
                width: s_pipeSouth.width,
                height: s_pipeSouth.height
            }
            this._pipes.push(newPipe);
        }
    },

	/**
	 * Draw all pipes to canvas context.
	 *
	 * @param  {CanvasRenderingContext2D} ctx the context used for
	 *                                        drawing
	 */
	draw: function(ctx) {
		for (var i = 0, len = this._pipes.length; i < len; i++) {
			var p = this._pipes[i];
			s_pipeSouth.draw(ctx, p.x, p.y);
			s_pipeNorth.draw(ctx, p.x, p.y+80+p.height);
		}
	}
};
