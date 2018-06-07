$(document).ready(function(){

    $('#caixa').focus();


    // setInterval(function(){
    //     powerPulse();
    // },500);

    var keyEnabledArray = Array(222).fill(true);

    $('#caixa').on('keydown',function(event){
        event.preventDefault();
        
        if(keyEnabledArray[event.keyCode] && !paused){
            keyEnabledArray[event.keyCode] = false;

            let c1 = getPos(1);
            let c2 = getPos(2);
            let speed = 20;

            if(event.keyCode == 39 && c1[0] < 480){ //code for arrowRight
                verify(1, c1[0] + speed, c1[1]);
            }

            if(event.keyCode == 37 && c1[0] >= 20){ //code for arrowLeft
                verify(1, c1[0] - speed, c1[1]);
            }

            if(event.keyCode == 38){ //code for arrowUp
                verify(1, c1[0], c1[1] - 30);
            }

            if(event.keyCode == 40){ //code for arrowDown
                verify(1, c1[0], c1[1] + 30);
            }

            if(event.keyCode == 68 && c2[0] < 480){ //code for D
                verify(2, c2[0] + speed, c2[1]);
            }

            if(event.keyCode == 65 && c2[0] >= 20){ //code for A
                verify(2, c2[0] - speed, c2[1]);
            }

            if(event.keyCode == 87){ //code for W
                verify(2, c2[0], c2[1] - 30);
            }

            if(event.keyCode == 83){ //code for S
                verify(2, c2[0], c2[1] + 30);
            }
        }
    });

    $('#caixa').on('keyup', function(event){
        keyEnabledArray[event.keyCode] = true;
    });
});

var paused = false;

function reset(){
    move(1, 0, -30, true);
    move(2, 480, -30, true);
}

function showTips(){
    $('.instructions-box').slideToggle();
}

function move(id, x, y, fromReset){
    var char = $(`#char${id}`)[0];
    y = y > 0 ? 0 : y;
    y = y <= -60 ? -60 : y;
    char.style.transform = 'translateX('+x+'px) translateY('+y+'px)';

    if(fromReset){

    }else{
        marca();
    }
   
}

function getPos(id){
    var char = $(`#char${id}`)[0];

    var trans = char.style.transform;

    var x1 = trans.indexOf('X') + 2;
    var x2 = trans.indexOf('px');

    var y1 = trans.indexOf('Y') + 2;
    var y2 = trans.lastIndexOf('px');

    var x = parseInt(trans.substring(x1,x2));
    var y = parseInt(trans.substring(y1,y2));

    return [x,y];
}

function verify(id, x, y){

    let idOther = id == 1 ? 2 : 1;

    let other = getPos(idOther);

    if(Math.abs(x - other[0]) < 20 && Math.abs(y - other[1]) < 30){
        //nao movimenta
    }else{
        move(id, x, y, false);
    }
}

function marca(){
    let c1 = getPos(1);
    let c2 = getPos(2);

    let ganhador = 0;

    if(c1[0] == 480){
        ganhador = 1;
    }else if(c2[0] == 0){
        ganhador = 2;
    }

    if (ganhador){
        let prevScore = $(`#score${ganhador}`).text();
        $(`#score${ganhador}`).text(++prevScore);

        paused = true;

        $('.gameStatus span').text(`Jogador ${ganhador} ganhou!`);

        $('.gameStatus-box').fadeIn();

        setTimeout(function(){
            reset();
            paused = false;
            $('.gameStatus-box').fadeOut();
        }, 2000);
    }
}

function novoJogo(){
    reset();
    $('#score1').text(0);
    $('#score2').text(0);
    $('#caixa').focus();
}

function powerPulse(){
    let power = $('#power')[0];

    power.style.transform = 'translateX(246px) translateY(-20px)';
}