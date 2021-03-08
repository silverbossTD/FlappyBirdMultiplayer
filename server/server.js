const uuid          = PubNub.generateUUID();
let mySide          = -1    ,
    IS_ONLINE       = false ,
    channel                 ,
    myOpponent      = null  ;

const pubnub        = new PubNub({
    publishKey: 'pub-c-5cfd29f0-f576-4304-aac3-5c866d79aac2',
    subscribeKey: 'sub-c-f6bf0f24-28b5-11eb-862a-82af91a3b28d',
    uuid: uuid,
});

pubnub.addListener({
    message: function(event) {
        if (event.message.type == 'start') {
            console.log(event.message);
            send(event.channel, "startingInfo", mySide);
        }
        else if (event.message.type == "startingInfo") {
            IS_ONLINE = true;
            // createStats();
            // addName(event.message.name);
            if (uuid != event.message.sender) {
                myOpponent = event.message.name;
                if (event.message.content != -1) { //if opponent has side
                    if (event.message.content == 0) { //other players team
                        mySide = 1;
                    } else {
                        mySide = 0;
                    }
                }
                $('.menuGame').empty();
                startGame2(mySide, event.channel);
            }
        }
        else if (event.message.type == "addPipe") {
            if (uuid != event.message.sender) {
                const newPipe = event.message.content;
                pipes.addPipe(newPipe);
            }
        }
        else if (event.message.type == "jump") {
            if (uuid != event.message.sender) {
                bird2.jump();
            }
        }
        else if (event.message.type == "playerDeath") {
            if (uuid != event.message.sender) {
                opponentDeath = true;
            }
            if (youDeath && opponentDeath) {
                $('#stats').fadeIn();
            }
        }
    }
});

function send(channel, type, content)
{
    if (IS_ONLINE) {
        pubnub.publish({
            channel: channel,
            message: { "sender": uuid, "type": type, "content": content, "name": $('#username').val() }
        }, function (status, response) {
            //Handle error here
            if (status.error) {
                console.log("oops, we got an error")
            }
        });
    }
};
