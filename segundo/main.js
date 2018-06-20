$(document).ready(function(){

    $('#caixa').focus();

    // var keyEnabledArray = Array(222).fill(true);

    $('#caixa').on('keydown',function(event){
        event.preventDefault();
        
        // if(keyEnabledArray[event.keyCode]){
        //     keyEnabledArray[event.keyCode] = false;

            let c1 = getPos(1);            
            let speed = 20;

            if(event.keyCode == 39){
                verify(1, c1[0] + speed, c1[1]);
            }

            if(event.keyCode == 37){
                verify(1, c1[0] - speed, c1[1]);
            }

            if(event.keyCode == 38){
                verify(1, c1[0], c1[1] - 30);
            }

            if(event.keyCode == 40){
                verify(1, c1[0], c1[1] + 30);
            }

        // }
    });

    // $('#caixa').on('keyup', function(event){
    //     keyEnabledArray[event.keyCode] = true;
    // });
});

function move(id, x, y){
    var char = $(`#char${id}`)[0];
    char.style.top = y + 'px';
    char.style.left= x + 'px';
}

function getPos(id){
    var char = $(`#char${id}`)[0];
    var top = char.style.top;
    var left = char.style.left;

    top = parseInt(top.substr(0,top.length - 2));
    left = parseInt(left.substr(0,left.length - 2));

    return [left,top];
}

function verify(id, x, y){
    move(id, x, y, false);
}