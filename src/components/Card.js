export class Card {
    constructor({ link, name }, templateElement, openPopupCard) {
        this._link = link;
        this._name = name;
        this._templateElement = templateElement;
        this._openPopupCard = openPopupCard;
        this._elementLike = document.querySelectorAll('.element__like');
    };

    _listEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', this._imageClickHandler);

        this._element.querySelector('.element__like').addEventListener('click', this._likeCardHandler);

        this._element.querySelector('.element__trash').addEventListener('click', this._trashCardHandler);
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateElement).content;
        const card = cardTemplate.querySelector(".element").cloneNode(true);
        this._element = card;
    }

    _imageClickHandler = () => {
        this._openPopupCard({ link: this._link, name: this._name });
    }
    _likeCardHandler = () => {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
        console.log(this._elementLike);
    }

    _trashCardHandler = () => {
        this._element.remove();
    }


    generateCard() {
        this._getTemplate();
        this._listEventListeners();
        const img =  this._element.querySelector('.element__image');
        img.alt = this._name;
        img.src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }

}