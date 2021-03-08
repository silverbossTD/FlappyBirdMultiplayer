/* Start game 2 players */
let readyStart = false;
let youDeath = false;
let opponentDeath = false;

function startGame2(mySide, channel) {
    $('#app').css('display', 'none');
    main(mySide);
    setTimeout(() => {
        readyStart = true;
        onpress();
    }, 3000);
}

function addName(playerName) {
    const builder = new HTMLBuilder()
    builder
        .add(`<li id="${playerName}" class="playerName">`)
        .add(`${playerName}: <span id="${playerName}Points">0</span>`)
        .add(`</li>`)
        .appendInto('#stats');
}
