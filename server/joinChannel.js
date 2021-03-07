$('#joinGame')[0].addEventListener('click', (e) => {
    if($('#username').val() !== "") {
        IS_ONLINE = true;
        channel = $('#codeGame').val().toUpperCase();
            pubnub.hereNow({
                channels: [channel],
                includeUUIDs: true,
                includeState: true,
            }, (status, response) => {
                // handle status, response
                console.log(response);
                if (response.totalOccupancy >= 1) {
                    pubnub.subscribe({
                        channels: [channel],
                        withPresence: true
                    });
                    send(channel, 'start', $('#username').val());
                }
                else {
                    console.log("No lobby found!");
                }
            });
        }
});
