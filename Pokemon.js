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
}

export default Pokemon;
