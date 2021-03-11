/* Start game 2 players */
let readyStart = false;
let youDeath = false;
let opponentScore = 0;

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
        .add(`<div id="${playerName}Stats">`)
        .add(`<h1 id="${playerName}Score">${playerName}: 0</h1>`)
        .add(`</div>`)
        .appendInto('#statsWindow');
}
