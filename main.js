import Pokemon from ./pokemon.js;
import {randomCeil, generateLog, addLogElement, showCharacterHP} from ./util.js;
import {pokemons} from'./pokemons.js';

let pl1;
let pl2;

function initGame(){
    let somePokemon1 = selectCharacter();
    pl1 = new Pokemon({
        ...somePokemon1,
        selector: 'player1'
    });

    let somePokemon2 = selectCharacter();
    pl2 = new Pokemon({
        ...somePokemon2,
        selector: 'player2'
    });

    removeButtons();
    addButtons();
    addCharacters();
}

initGame();

//buttons
function addButtons(){
    pl1.attacks.forEach(
        item =>{
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            const click = clickCounter(item.maxCount, $btn);
            $btn.innerText = item.name + " " + item.maxCount;
            $btn.addEventListener('click', function gameIteration(){
                click();
                if(randomCeil(6) > 3){
                    addDamage(item);
                    checkGameOver();
                    generateLog(pl1);
                    getDamage();
                    generateLog(pl2)
                }
                else{
                    getDamage();
                    checkGameOver();
                    generateLog(pl2);
                    addDamage(item);
                    generateLog(pl1)
                };
                pl1.paintAll();
                pl2.paintAll();
            })
            pl1.control.appendChild($btn);
        }
    )
}

function removeButtons(){
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
}

//fill data
function addCharacters(){
    document.getElementById('name-player1').innerText = pl1.name;
    document.getElementById('health-player1').innerText = pl1.hp.current + ' / ' + pl1.hp.max;
    document.getElementById('sprite-player1').src= pl1.img;
    document.getElementById('name-player2').innerText = pl2.name;
    document.getElementById('health-player2').innerText = pl2.hp.current + ' / ' + pl2.hp.max;
    document.getElementById('sprite-player2').src= pl2.img;
}

function selectCharacter(){
    const charNum = randomCeil(pokemons.length-1);
    return pokemons[charNum];
}

//damage
function addDamage(item){
    let damage = (randomCeil(6) > 3)? item.maxDamage : item.minDamage;
    let lives = pl2.hp.current - damage;
    pl2.hp.current = (damage > pl2.hp.current)? 0 : (lives > pl2.hp.max)? pl2.hp.max: lives;
}

function getDamage(){
    let item = pl2.attacks[randomCeil(3)];
    let damage = (randomCeil(6) > 3)? item.maxDamage : item.minDamage;
    let lives = pl1.hp.current - damage;
    pl1.hp.current = (damage > pl1.hp.current)? 0 : (lives > pl1.hp.max)? pl1.hp.max: lives;
}

//controller_setting_1 - restart
const $btnRestart = document.getElementById('btn-restart');
$btnRestart.addEventListener('click', function restart(){
    initGame();
    pl1.paintAll();
    pl2.paintAll();
});

//click counter
function clickCounter(maxCount, btnEl){
    let pushed = 0;
    return function(){
        let btnName = btnEl.innerText.replace(/[0-9]*/g,"");
        pushed++;
        maxCount--;
        changeCount(btnEl, maxCount);
        console.log(`${btnName}нажата ${pushed} раз.`);
        if(maxCount == 0) btnEl.disabled = true;
        return maxCount;
    }
}

function changeCount(btnEl, count){
     const btnName = btnEl.innerText.replace(/[0-9]*/g,"");
     btnEl.innerText = btnName + " " + count;
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
