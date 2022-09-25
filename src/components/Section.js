export class Section{
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addCard = (card)=>{
        this._container.prepend(card);
    }

    renderCards = (elements)=>{
        elements.forEach(element => {
            this._renderer(element);
        });
    }
}