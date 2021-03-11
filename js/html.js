const uniqueID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

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
        .add('<input type="text" name="name" id="username" value="ThanhDuy" /> <br/>')
        .add('<input type="text" id="codeGame" placeholder="Code..." /> <br/>')
        .add('<button type="button" id="joinGame">Join the game</button>')
        .add('<h2 id="status" style="text-align: center; color: black"></h2>')
        .add('</div>');

    backBtn(builder, '#joinWindow');

    builder.appendInto('#app');

    joinGame();
    $('#joinWindow').fadeIn();
});

function createStats() {
    const ID = uniqueID();
    const builder = new HTMLBuilder()
    builder
        .add('<div id="statsWindow" style="display: none">')
        .add('<h1>Stats Game</h1>')
        .add('</div>')
        .add(`<span id="button_back${ID}"><img src="./res/startBtn.png" height="100" /></span>`)
        .addHook(() => $(`#button_back${ID}`).click(() => {
            $(`#button_back${ID}`).remove();
            $('#statsWindow').remove();
            $('#app').fadeIn();
        }));

    builder.appendInto(document.body);
}

function backBtn(builder, element) {
    const ID = uniqueID();
    builder
        .add(`<span id="button_back${ID}"><img src="./res/startBtn.png" height="100" /></span>`)
        .addHook(() => $(`#button_back${ID}`).click(() => {
            $(element).fadeOut();
            $(`#button_back${ID}`).fadeOut();
            setTimeout(() => {
                $(`#button_back${ID}`).remove();
                $('.menuGame').fadeIn();
                $(element).remove();
            }, 500);
        }));
}
