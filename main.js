//import Pogemon from ./Pokemon.js;
class DomSelector{
    constructor(selector){
        this.selector = selector;
        this.elHP = document.getElementById(`health-${selector}`);
        this.elProgressbar = document.getElementById(`progressbar-${selector}`);
        this.elName = document.getElementById(`name-${selector}`);
        this.buttons = document.getElementsByClassName('button');
        this.buttonMaxCount = [0,0,0,0,0,0,0,0,0,0];
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttonMaxCount[i] = this.buttons[i].innerText.replace(/[A-Z][a-z]*/g,'');
        }
    }
}

class Pokemon extends DomSelector{
    constructor({selector}){
        super(selector);
        this.name = this.elName.innerText;
        this.lastDamage = 0;
        const docEl = this.elHP.innerText.split(' ');
        this.hp ={
             current: docEl[0],
             max: docEl[2],
        };
    }

    //paint
    paintAll = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
        this.changeHPColor();
    }

    renderHPLife = () => {
        this.elHP.innerText = this.hp.current + ' / ' + this.hp.max;
    }

    renderProgressbarHP = () => {
        let HP1 = this.hp.max/100;
        this.elProgressbar.style.width = this.hp.current / HP1 + '%';
    }

    changeHPColor = () => {
        let healthArr = this.elHP.innerText.split(' ');
        let pHPindicator = Math.ceil(healthArr[0]*100/healthArr[2]);
        let objBackground = this.elProgressbar.style.background;

        if(pHPindicator <= 25) objBackground = '#d20000';
        else if(pHPindicator <= 50) objBackground = '#ffcc00';
        else if(pHPindicator <= 100) objBackground = '#8bf500';
     }
     //lastDamage
     addDamage = (lastDamage) =>{
         this.lastDamage = lastDamage;
         let lives = this.hp.current - lastDamage;
         this.hp.current = (lastDamage > this.hp.current)? 0 : (lives > 100)? 100: lives;
     }

     addHP = (num) =>{
         this.addDamage(randomCeil(num));
     }

     //restore
     restoreHP = () => {
         this.hp.current = this.hp.max;
     }

     showCharacterHP = () =>{
        console.log(this.hp.current + " : " + this.hp.max);
     }

}

const pl1 = new Pokemon({selector: 'character'});
const pl2 = new Pokemon({selector: 'enemy'});

//button 1 - you get change
pl1.buttons[0].addEventListener('click', function gameIteration(){
    thunderCounter();
    let dices = randomCeil(6);
    let firstDamaged = (dices > 3)? pl1 : pl2;
    let secondDamaged = (dices > 3)? pl2 : pl1;

    firstDamaged.addDamage(randomCeil(20));
    generateLog(firstDamaged);
    firstDamaged.paintAll();
    checkGameOver();
    secondDamaged.addDamage(randomCeil(20));
    generateLog(secondDamaged);
    secondDamaged.paintAll();
    checkGameOver();
});

//button 2 - you MAY NOT get change
pl1.buttons[1].addEventListener('click', function gameIteration(){
    blowCounter();
    let dices = randomCeil(6);
    let firstDamaged = (dices > 2)? pl1 : pl2;

    firstDamaged.addDamage(randomCeil(30));
    generateLog(firstDamaged);
    firstDamaged.paintAll();
    checkGameOver();
});

//button 3 - you MAY add many damage
pl1.buttons[2].addEventListener('click', function gameIteration(){
    headshotCounter();
    let dices = randomCeil(6);
    let firstDamaged = (dices > 2)? pl1 : pl2;

    firstDamaged.addDamage(randomCeil(40));
    generateLog(firstDamaged);
    firstDamaged.paintAll();
    checkGameOver();
});

//button 4 - you MAY NOT restorHP
pl1.buttons[3].addEventListener('click', function gameIteration(){
    restoreHPCounter();
    let dices = randomCeil(6);

    if(dices > 3){
        pl1.addHP(-40);
        pl1.paintAll();
    }
    else{
        pl1.addDamage(randomCeil(30));
        generateLog(pl1);
        pl1.paintAll();
    }
    checkGameOver();
});

//controller_setting_1 - restart
const $btnRestart = document.getElementById('btn-restart');
$btnRestart.addEventListener('click', function restart(){
    pl1.restoreHP();
    pl2.restoreHP();
    pl1.paintAll();
    pl2.paintAll();
    allButtonDisable(false);
    restoreButtonsCounter();
});

//click counter
let thunderCounter = clickCounter(pl1.buttons[0]);
let blowCounter = clickCounter(pl1.buttons[1]);
let headshotCounter = clickCounter(pl1.buttons[2]);
let restoreHPCounter = clickCounter(pl1.buttons[3]);

function clickCounter(btnEl){
    let maxCount = btnEl.innerText.replace(/[A-Z][a-z]*/g,'');
    let currentCount = maxCount;
    let btnName = btnEl.innerText.replace(/[0-9]*/g,"");

    return function(){
        currentCount -= 1;
        changeCount(btnEl, currentCount);
        console.log(`${btnName}нажата ${maxCount - currentCount} раз.`);
        if(currentCount == 0) btnEl.disabled = true;

        return currentCount;
    }
}

function changeCount(btnEl, count){
     const btnName = btnEl.innerText.replace(/[0-9]*/g,"");
     btnEl.innerText = btnName + " " + count;
}

 function restoreButtonsCounter(){
     changeCount(pl1.buttons[0], pl1.buttonMaxCount[0]);
     changeCount(pl1.buttons[1], pl1.buttonMaxCount[1]);
     changeCount(pl1.buttons[2], pl1.buttonMaxCount[2]);
     changeCount(pl1.buttons[3], pl1.buttonMaxCount[3]);
     thunderCounter = clickCounter(pl1.buttons[0]);
     blowCounter = clickCounter(pl1.buttons[1]);
     headshotCounter = clickCounter(pl1.buttons[2]);
     restoreHPCounter = clickCounter(pl1.buttons[3]);
 }

//checker
function checkGameOver(){
    let winnerName = "NoName";
    if(pl1.hp.current == 0){
        winnerName = pl2.name;
    }
    else if(pl2.hp.current == 0){
        winnerName = pl1.name;
    }

    if(winnerName != "NoName" ){
        alert(`Game over!\nThe winner is ${winnerName}`);
        allButtonDisable(true);
    }
}

//disabled/undisabled buttons
function allButtonDisable(isDisable){
    pl1.buttons[0].disabled = isDisable;
    pl1.buttons[1].disabled = isDisable;
    pl1.buttons[2].disabled = isDisable;
    pl1.buttons[3].disabled = isDisable;
}

//service
function randomCeil(num){
    return Math.ceil(Math.random() * num);
}

//logs
function generateLog(player){
    const anotherName = (player.selector === 'character')? pl2.name : pl1.name;
    const lastDamage = (player.selector === 'character')? pl1.lastDamage : pl2.lastDamage;
    const actualHP = player.hp.current;
    const color = (player.selector === 'character')? 'red' : 'green';

    const logs = [
        `${player.name} вспомнил что-то важное, но неожиданно ${anotherName}, не помня себя от испуга, ударил в предплечье врага и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} поперхнулся, и за это ${anotherName} с испугу приложил прямой удар коленом в лоб врага и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} забылся, но в это время наглый ${anotherName}, приняв волевое решение, неслышно подойдя сзади, ударил и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} пришел в себя, но неожиданно ${anotherName} случайно нанес мощнейший удар и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} поперхнулся, но в это время ${anotherName} нехотя раздробил кулаком \<вырезанно цензурой\> противника и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} удивился, а ${anotherName} пошатнувшись влепил подлый удар и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} высморкался, но неожиданно ${anotherName} провел дробящий удар и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} пошатнулся, и внезапно наглый ${anotherName} беспричинно ударил в ногу противника и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} расстроился, как вдруг, неожиданно ${anotherName} случайно влепил стопой в живот соперника и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`,
        `${player.name} пытался что-то сказать, но вдруг, неожиданно ${anotherName} со скуки, разбил бровь сопернику и нанес ${lastDamage} урона. У ${player.name} осталось ${actualHP} HP.`
    ];
    let logRez = [logs[randomCeil(logs.length) - 1], color];
    addLogElement(logRez);
}

function addLogElement(logRez){
    const $p = document.createElement('p');
    $p.innerText = logRez[0];
    $p.style.color = logRez[1];
    const $logs = document.querySelector('html body div.logs');
    $logs.insertBefore($p, $logs.children[0]);
}
