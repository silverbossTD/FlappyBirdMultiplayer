/* Start game 2 players */
let readyStart = false;
function startGame2(mySide, channel) {
    $('#app').css('display', 'none');
    $('.logo').css('display', 'none');
    main(mySide);
    setTimeout(() => {
        readyStart = true;
        onpress();
    }, 3000);
}
