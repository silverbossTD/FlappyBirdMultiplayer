function generateKey(length = 4, specificKey = null)
{
    let key = ""
    for (var i = 0; i < length; i++) {
        let randNum = Math.floor(10 + 26 * Math.random())
        key += randNum.toString(36).toLocaleUpperCase()
    }
    if (specificKey != null) {
        return specificKey;
    }
    return (key)
}

let code = generateKey(4)

$('#codeChannel').html(code);

$('#hostGame')[0].addEventListener('click', (e) => {
    IS_ONLINE = true;
    channel = code;
    mySide = 0;
    console.log('Waiting on player...', [channel]);

    pubnub.subscribe({
        channels: [channel],
        withPresence: true
    });
});
