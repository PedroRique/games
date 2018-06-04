$(document).ready(function(){
    $('.char').each(function( index ) {
        var id = index + 1;
        $(`#char${id}`).on('keydown',function(event){
            event.preventDefault();
    
            var x = getPos(id);
            // var caixaX = $('#caixa').innerWidth();
            if(event.keyCode == 39 && x[0] < 480){
                move(id, x[0] + 20, x[1]);
            }
    
            if(event.keyCode == 37 && x[0] >= 20){
                move(id, x[0] - 20, x[1]);
            }
    
            if(event.keyCode == 38){
                move(id, x[0], x[1] - 30);
            }
    
            if(event.keyCode == 40){
                move(id, x[0], x[1] + 30);
            }
    
            verify(id, x);
        });
    });

    // $('#caixa').on('keydown',function(event){
    //     event.preventDefault();
        
    //     let c1 = getPos(1);
    //     let c2 = getPos(2);

    //     if(event.keyCode == 39 && c1[0] < 480){
    //         move(1, c1[0] + 20, c1[1]);
    //     }

    //     if(event.keyCode == 37 && c2[0] >= 20){
    //         move(2, c2[0] - 20, c2[1]);
    //     }
    // });
});

function move(id, x, y){
    var char = $(`#char${id}`)[0];
    y = y > 0 ? 0 : y;
    y = y <= -60 ? -60 : y;
    char.style.transform = 'translateX('+x+'px) translateY('+y+'px)';
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

function verify(id, x){

    let c1 = getPos(1);
    let c2 = getPos(2);

    if(Math.abs(c1[0] - c2[0]) < 20 && Math.abs(c1[1] - c2[1]) < 30){
        $('#caixa').css('background','#ffd4d4');
        setTimeout(function(){
            move(id, x[0], x[1]);
            $('#caixa').css('background','#fbfbfb');
        },100);
    }else{
        $('#caixa').css('background','#fbfbfb');
    }
}