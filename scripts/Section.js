export class Section{
    constructor({cards, renderer}, containerSelector){
        this._cards = cards;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addCard = (card)=>{
        this._container.prepend(card);
    }

    renderCards = ()=>{
        this._cards.forEach(element => {
            this._renderer(element);
        });
    }
}