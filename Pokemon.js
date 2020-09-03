
class DomSelector{
    constructor(selector){
        this.selector = selector;
        this.control= document.querySelector('.control');
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
    constructor({img, name, type, hp, attacks = [], selector, }){
        super(selector);
        this.img = img;
        this.name = name;
        this.type = type;
        this.hp ={
             current: hp,
             max: hp,
        };
        this.attacks = attacks;
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

        if(pHPindicator <= 20) objBackground = '#d20000';
        else if(pHPindicator <= 60) objBackground = '#ffcc00';
        else if(pHPindicator <= 100) objBackground = '#8bf500';
     }
}

export default Pokemon;
