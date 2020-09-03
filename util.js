
//service
function randomCeil(num){
    return Math.ceil(Math.random() * num);
}

//logs
function generateLog(player){
    const anotherName = (player.selector === 'player1')? pl2.name : pl1.name;
    const lastDamage = (player.selector === 'player1')? pl1.lastDamage : pl2.lastDamage;
    const actualHP = player.hp.current;
    const color = (player.selector === 'player1')? 'red' : 'green';

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

function showCharacterHP(person){
   console.log(person.hp.current + " : " + person.hp.max);
}

export default util;
