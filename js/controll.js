/**
 * Called on mouse or touch press. Update and change state
 * depending on current game state.
 *
 * @param  {MouseEvent/TouchEvent} evt tho on press event
 */
function onpress(evt) {

	switch (currentstate) {

		// change state and update bird velocity
		case states.Splash:
			currentstate = states.Game;
			bird.jump();
            send(channel, 'jump', currentstate);
			break;

		// update bird velocity
		case states.Game:
			bird.jump();
            send(channel, 'jump', currentstate);
			break;

		// change state if event within okbtn bounding box
		case states.Score:
			// get event position
			var mx = evt.offsetX, my = evt.offsetY;

			if (mx == null || my == null) {
				mx = evt.touches[0].clientX;
				my = evt.touches[0].clientY;
			}

			// check if within
			if (okbtn.x < mx && mx < okbtn.x + okbtn.width &&
				okbtn.y < my && my < okbtn.y + okbtn.height
			) {
				pipes.reset();
				currentstate = states.Splash;
                currentstate2 = states.Splash;
				score = 0;
			}
			break;

	}
}
