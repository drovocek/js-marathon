//participants
const character = {
    type: 'character',
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    name: document.getElementById('name-character').innerText,
    actualHP: document.getElementById('health-character').innerText.split(' ')[0],
    maxHP: document.getElementById('health-character').innerText.split(' ')[2],
    isLive: true,
}

const enemy = {
    type: 'enemy',
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    name: document.getElementById('name-enemy').innerText,
    actualHP: document.getElementById('health-enemy').innerText.split(' ')[0],
    maxHP: document.getElementById('health-character').innerText.split(' ')[2],
    isLive: true,
}


//controller 1 - you get change
const $btnThunder = document.getElementById('btn-thunder');
$btnThunder.addEventListener('click', function gameIteration(){
    checkGameOver();
    if(character.isLive && enemy.isLive){
        addDamageByDice(true);
        paintAllСhanges();
    }
});

//controller 2 - you MAY NOT get change
const $btnBlow = document.getElementById('btn-blow');
$btnBlow.addEventListener('click', function(){
    checkGameOver();
    if(character.isLive && enemy.isLive){
        addDamageByDice(false);
        paintAllСhanges();
    }
});

//checker
function checkGameOver(){
    let winner = null;
    if(character.isLive == false ){
        winner = enemy;
    }
    else if(enemy.isLive == false) winner = character;

    if(winner != null){
        alert('Game over!\nThe winner is ' + winner.name);
        $btnThunder.disable = true;
        $btnBlow.disable = true;
    }
}

//damage
function addDamage(person, damage){
    if(damage > person.actualHP){
        person.isLive = false;
        person.actualHP = 0;
    }
    else{
        person.actualHP = person.actualHP - damage;
    }
}

function addDamageByDice(isGetСhange){
    let dices = randomCeil(6);
    if(!isGetСhange){
        let dices = randomCeil(6); // > 3 - is miss;
        if(dices > 3){
            addDamage(character, randomCeil(20));
        }
        else{
            addDamage(enemy, randomCeil(20));
        }
    }
    else{
        if(dices > 3){
            addDamage(character, randomCeil(20));
            if(character.isLive) addDamage(enemy, randomCeil(20));
        }
        else{
            addDamage(enemy, randomCeil(20));
            if(enemy.isLive) addDamage(character, randomCeil(20));
        }
    }
}

//service
function randomCeil(num){
    return Math.ceil(Math.random() * num);
}

//paint
function paintAllСhanges(){
    paintPersonСhanges(enemy);
    paintPersonСhanges(character);
}

function paintPersonСhanges(person){
    renderHPLife(person);
    renderProgressbarHP(person);
    changeHPColor(person);
}

function renderHPLife(person){
    person.elHP.innerText = person.actualHP + ' / ' + person.maxHP;
}

function renderProgressbarHP(person){
    person.elProgressbar.style.width = person.actualHP + '%';
}

function changeHPColor(person){
    let idBar = "progressbar-" + person.type;
    let idHealth = "health-" + person.type;
    let element = document.getElementById(idBar);
    let healthArr = document.getElementById(idHealth).innerText.split(' ');
    let pHPindicator = Math.ceil(healthArr[0]*100/healthArr[2]);

    if(pHPindicator <= 25) element.style.background = '#d20000';
    else if(pHPindicator <= 50) element.style.background = '#ffcc00';
 }

//tests
function showCharacter(person){
    for (var key in person){
        console.log(key + " : " + person[key]);
    }
}
