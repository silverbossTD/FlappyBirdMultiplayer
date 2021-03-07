/* Start game 2 players */
let readyStart = false;
function startGame2(mySide, channel) {
    main(mySide);
    setTimeout(() => {
        readyStart = true;
        onpress();
    }, 3000);
}
