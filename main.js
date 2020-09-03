import Pokemon from ./pokemon.js;
import {randomCeil, generateLog, addLogElement, showCharacterHP} from ./util.js;

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
