$('#startBtn').click(() => {
    main(0);
});

$('#hostBtn').click(() => {
    $('.menuGame').css('display', 'none');
    const builder = new HTMLBuilder()
    builder
        .add('<div id="hostWindow" style="display: none">')
        .add('<h1>Host Game</h1>')
        .add('<input type="text" name="name" id="username" value="Silverboss" />')
        .add('<h2>Code: <span id="codeChannel"></span></h2>')
        .add('<button type="button" id="hostGame">Host the game</button>')
        .add('<h2 id="status" style="text-align: center; color: black"></h2>')
        .add('</div>');

    backBtn(builder, '#hostWindow');

    builder.appendInto('#app');

    hostGame();
    $('#hostWindow').fadeIn();
});

$('#joinBtn').click(() => {
    $('.menuGame').css('display', 'none');
    const builder = new HTMLBuilder()
    builder
        .add('<div id="joinWindow" style="display: none">')
        .add('<h1>Join Game</h1>')
        .add('<input type="text" name="name" id="username" value="Silverboss" /> <br/>')
        .add('<input type="text" id="codeGame" placeholder="Code..." /> <br/>')
        .add('<button type="button" id="joinGame">Join the game</button>')
        .add('<h2 id="status" style="text-align: center; color: black"></h2>')
        .add('</div>');

    backBtn(builder, '#joinWindow');

    builder.appendInto('#app');

    joinGame();
    $('#joinWindow').fadeIn();
});


function backBtn(builder, element) {
    builder
        .add('<span id="button_back"><img src="./res/startBtn.png" height="100" /></span>')
        .addHook(() => $('#button_back').click(() => {
            $(element).remove();
            $('#button_back').remove();
            $('.menuGame').css('display', 'block');
        }));
}
