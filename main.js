//participants
const character = {
    type: 'character',
    isLive: true,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    name: document.getElementById('name-character').innerText,
    actualHP: document.getElementById('health-character').innerText.split(' ')[0],
    maxHP: document.getElementById('health-character').innerText.split(' ')[2],
    actualDamage: 0,
    addDamage: addDamage,
    checkGameOver: checkGameOver,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHPColor: changeHPColor,
    getDamage: getDamage,
    wakeUp: wakeUp,
    paintAll: paintAll,
    generateLog:generateLog,
    addLogElement: addLogElement,
    addHP: addHP,
}

const enemy = {
    type: 'enemy',
    isLive: true,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    name: document.getElementById('name-enemy').innerText,
    actualHP: document.getElementById('health-enemy').innerText.split(' ')[0],
    maxHP: document.getElementById('health-character').innerText.split(' ')[2],
    actualDamage: 0,
    addDamage: addDamage,
    checkGameOver: checkGameOver,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHPColor: changeHPColor,
    getDamage: getDamage,
    wakeUp: wakeUp,
    paintAll: paintAll,
    generateLog:generateLog,
    addLogElement: addLogElement,
    addHP: addHP,
}

//destructors
const {type:charTypename, isLive:charIsLive, elHP:charElHP, elProgressbar:charElProgressbar,
name: charName, actualHP: charActualHP} = character;

const {type:enemyTypename, isLive:enemyIsLive, elHP:enemyElHP, elProgressbar:enemyElProgressbar,
name: enemyName, actualHP: enemyActualHP} = enemy;

//controller 1 - you get change
const $btnThunder = document.getElementById('btn-thunder');
$btnThunder.addEventListener('click', function gameIteration(){
    if(character.isLive && enemy.isLive){
        let count = counterLog($btnThunder, thunderCounter, 1, 10);
        if(count!= -1){
            changeCount($btnThunder, 1);
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
    }
});

//controller 2 - you MAY NOT get change
const $btnBlow = document.getElementById('btn-blow');
$btnBlow.addEventListener('click', function gameIteration(){
    if(character.isLive && enemy.isLive){
        let count = counterLog($btnBlow, blowCounter, 1, 5);
        if(count!= -1){
            changeCount($btnBlow, 1);
            let dices = randomCeil(6);
            if(dices < 3){
                enemy.getDamage();
            }
            else{
                character.getDamage();
            }
        }
    }
});

//controller 3 - you MAY NOT restorHP
const $btnRestoreHP = document.getElementById('btn-restoreHP');
$btnRestoreHP.addEventListener('click', function gameIteration(){
    if(character.isLive && enemy.isLive){
        let count = counterLog($btnRestoreHP, restoreHPCounter, 1, 2);
        if(count!= -1){
            changeCount($btnRestoreHP, 1);
            let dices = randomCeil(6);
            if(dices < 6){
                character.addHP();
            }
            else{
                character.getDamage();
            }
        }
    }
});

//controller 4 - you MAY add many damage
const $btnHeadshot = document.getElementById('btn-headshot');
$btnHeadshot.addEventListener('click', function gameIteration(){
    if(character.isLive && enemy.isLive && count!= -1){
        let count = counterLog($btnHeadshot, headshotCounter, 1, 5);
        if(count!= -1){
            changeCount($btnHeadshot, 1);
            let dices = randomCeil(6);
            if(dices < 3){
                enemy.getDamage();
                enemy.getDamage();
            }
            else{
                character.getDamage();
            }
        }
    }
});

//controller_setting_1 - restart
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
    thunderCounter = clickCounter();
    blowCounter = clickCounter();
    restoreHPCounter = clickCounter();
    headshotCounter = clickCounter();
    changeCount($btnThunder, -10);
    changeCount($btnBlow, -5);
    changeCount($btnHeadshot, -5);
    changeCount($btnRestoreHP, -2);
}

function getDamage(){
    this.addDamage(randomCeil(20));
    this.addLogElement();
    this.checkGameOver();
    this.paintAll();
}

function addHP(){
    this.addDamage(randomCeil(-40));
    // this.addLogElement();
    this.checkGameOver();
    this.paintAll();
}

//checker
function checkGameOver(){
    if(this.actualHP === 0){
        this.isLive = false;
        let winnerName = (this.name == 'enemy')? 'character':'enemy';
        alert('Game over!\nThe winner is ' + winnerName);
        $btnThunder.disable = true;
        $btnBlow.disable = true;
    }
}

//actualDamage
function addDamage(actualDamage){
    this.actualDamage = actualDamage;
    let lives = this.actualHP- actualDamage;
    this.actualHP = (actualDamage > this.actualHP)? 0 : (lives > 100)? 100: lives;
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
    this.elHP.innerText = this.actualHP + ' / ' + this.maxHP;
}

function renderProgressbarHP(){
    let HP1 = this.maxHP/100;
    this.elProgressbar.style.width = this.actualHP / HP1 + '%';
}

function changeHPColor(){
    let healthArr = this.elHP.innerText.split(' ');
    let pHPindicator = Math.ceil(healthArr[0]*100/healthArr[2]);
    let objBackground = this.elProgressbar.style.background;

    if(pHPindicator <= 25) objBackground = '#d20000';
    else if(pHPindicator <= 50) objBackground = '#ffcc00';
    else if(pHPindicator <= 100) objBackground = '#8bf500';
 }

 function changeButtonText(count, buttonID){
     document.getElementById(buttonID).innerText = 1;
 }

 function changeCount(btnEl, count){
     const $countEl = btnEl.children[0];
     const actCount = $countEl.innerText;
     if(count < 0){
         $countEl.innerText = -count;
     }
     else if(actCount != 0 && count > 0){
         $countEl.innerText -= count;
     }
 }

//tests
function showCharacter(){
        console.log(character.actualHP + " : " + enemy.actualHP);
}

//logs
function generateLog(){
    const anotherName = (this.type === 'character')? enemy.name : character.name;
    const actualDamage = (this.type === 'character')? character.actualDamage : enemy.actualDamage;
    const actualHP = this.actualHP;
    const color = (this.type === 'character')? 'red' : 'green';

    const logs = [
        `${this.name} вспомнил что-то важное, но неожиданно ${anotherName}, не помня себя от испуга, ударил в предплечье врага и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} поперхнулся, и за это ${anotherName} с испугу приложил прямой удар коленом в лоб врага и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} забылся, но в это время наглый ${anotherName}, приняв волевое решение, неслышно подойдя сзади, ударил и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} пришел в себя, но неожиданно ${anotherName} случайно нанес мощнейший удар и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} поперхнулся, но в это время ${anotherName} нехотя раздробил кулаком \<вырезанно цензурой\> противника и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} удивился, а ${anotherName} пошатнувшись влепил подлый удар и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} высморкался, но неожиданно ${anotherName} провел дробящий удар и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} пошатнулся, и внезапно наглый ${anotherName} беспричинно ударил в ногу противника и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} расстроился, как вдруг, неожиданно ${anotherName} случайно влепил стопой в живот соперника и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`,
        `${this.name} пытался что-то сказать, но вдруг, неожиданно ${anotherName} со скуки, разбил бровь сопернику и нанес ${actualDamage} урона. У ${this.name} осталось ${actualHP} HP.`
    ];

    return [logs[randomCeil(logs.length) - 1], color];
}

function addLogElement(){
    const $p = document.createElement('p');
    const logRez = this.generateLog();
    $p.innerText = logRez[0];
    $p.style.color = logRez[1];
    const $logs = document.querySelector('html body div.logs');
    $logs.insertBefore($p, $logs.children[0]);
    console
}

//click counter
let thunderCounter = clickCounter();
let blowCounter = clickCounter();
let restoreHPCounter = clickCounter();
let headshotCounter = clickCounter();

function clickCounter(){
    let count = 0;
    return function(add, limit){
            if(count == limit? false:true){
                count += add;
                return count;
            }
            return -1;
    }
}

function counterLog(btnEl, counterFunc, add, limit){
    let count = counterFunc(add, limit);
    if(count != -1) {
        console.log(btnEl.innerText.split('\n')[0] + ' was pressed ' + count + ' times.');
        return count;
    }
    else return -1;
}
