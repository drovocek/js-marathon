//participants
const character = {
    type: 'character',
    isLive: true,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    name: document.getElementById('name-character').innerText,
    actualHP: document.getElementById('health-character').innerText.split(' ')[0],
    maxHP: document.getElementById('health-character').innerText.split(' ')[2],
    addDamage: addDamage,
    checkGameOver: checkGameOver,
    showCharacter: showCharacter,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHPColor: changeHPColor,
    getDamage: getDamage,
    wakeUp: wakeUp,
    paintAll: paintAll,
}

const enemy = {
    type: 'enemy',
    isLive: true,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    name: document.getElementById('name-enemy').innerText,
    actualHP: document.getElementById('health-enemy').innerText.split(' ')[0],
    maxHP: document.getElementById('health-character').innerText.split(' ')[2],
    addDamage: addDamage,
    checkGameOver: checkGameOver,
    showCharacter: showCharacter,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHPColor: changeHPColor,
    getDamage: getDamage,
    wakeUp: wakeUp,
    paintAll: paintAll,
}


//controller 1 - you get change
const $btnThunder = document.getElementById('btn-thunder');
$btnThunder.addEventListener('click', function gameIteration(){
    if(character.isLive && enemy.isLive){
        let dices = randomCeil(6);
        if(dices > 3){
            character.getDamage();
            enemy.getDamage();
        }
        else{
            enemy.getDamage();
            character.getDamage();
        }
    }
});

//controller 2 - you MAY NOT get change
const $btnBlow = document.getElementById('btn-blow');
$btnBlow.addEventListener('click', function gameIteration(){
    if(character.isLive && enemy.isLive){
        let dices = randomCeil(6);
        if(dices < 3){
            enemy.getDamage();
        }
        else{
            character.getDamage();
        }
    }
});

//controller 3 - restart
const $btnRestart = document.getElementById('btn-restart');
$btnRestart.addEventListener('click', function restart(){
    character.wakeUp();
    enemy.wakeUp();

    $btnThunder.disable = false;
    $btnBlow.disable = false;
});

//restore
function wakeUp(){
    this.actualHP = character.maxHP;
    this.isLive = true;
    this.paintAll();
}

function getDamage(){
    this.addDamage(randomCeil(20));
    this.checkGameOver();
    this.paintAll();
}

//checker
function checkGameOver(){
    if(this.actualHP == 0){
        this.isLive = false;
        let winnerName = (this.name == 'enemy')? 'character':'enemy';
        alert('Game over!\nThe winner is ' + winnerName);
        $btnThunder.disable = true;
        $btnBlow.disable = true;
    }
}

//damage
function addDamage(damage){
    this.actualHP = (damage > this.actualHP)? 0 : (this.actualHP - damage);
}

//service
function randomCeil(num){
    return Math.ceil(Math.random() * num);
}

//paint
function paintAll(){
    this.renderHPLife();
    this.renderProgressbarHP();
    this.changeHPColor();
}

function renderHPLife(){
    console.log(this.elHP.innerText);
    this.elHP.innerText = this.actualHP + ' / ' + this.maxHP;
}

function renderProgressbarHP(){
    let HP1 = this.maxHP/100;
    this.elProgressbar.style.width = this.actualHP/HP1 + '%';
}

function changeHPColor(){
    let healthArr = this.elHP.innerText.split(' ');
    let pHPindicator = Math.ceil(healthArr[0]*100/healthArr[2]);

    if(pHPindicator <= 25) this.elProgressbar.style.background = '#d20000';
    else if(pHPindicator <= 50) this.elProgressbar.style.background = '#ffcc00';
    else if(pHPindicator <= 100) this.elProgressbar.style.background = '#8bf500';
 }

//tests
function showCharacter(){
        console.log(this.actualHP + " : " + this.maxHP);
}
