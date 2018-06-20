let modal = document.createElement('div');

modal.className = 'modal-lembra-box';

modal.innerHTML = `<div class="modal-lembra-box" style="display:none; position: fixed; top: 0; left: 0;
right: 0; bottom: 0; z-index: 1; background: #0000006b;"><div class="modal-lembra" 
style="width: 250px;height: 150px;display: flex;flex-direction: column;align-items: center;justify-content: center;top: 50%;left: 50%;margin-left: -125px;box-shadow: 0px 0px 50px -10px black;border-radius: 5px;background: #e2e4e6;margin-top: -75px;position: absolute;">
<p class="p-lembra" style="text-align:center;font-size: 20px;padding: 0px 30px;line-height: 1.2;">Lembre-se de atualizar seu trello constantemente!</p>
<button class="btn-lembra" click="$('.modal-lembra-box').fadeOut()">Pode deixar</button>
</div></div>`;

document.body.appendChild(modal);

$('.modal-lembra-box').fadeIn();