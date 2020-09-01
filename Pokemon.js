class DomSelector{
    constructor(selector){
        this.elHP = document.getElementById('health-${selector}');
        this.elProgressbar = document.getElementById('progressbar-${selector}');
    }
}

class Pokemon extends DomSelector{
    constructor({ selector }){
        super(selector);
        this.name = document.getElementById('name-${selector}').innerText;
        const docEl[] = document.getElementById('health-${selector}').innerText.split(' ');
        this.hp ={
            current: docEl[0],
            max: docEl[2],
        };
        this.type = type;
    }
}

export default Pokemon;
