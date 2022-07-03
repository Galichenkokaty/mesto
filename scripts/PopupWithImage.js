import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupText = this._popup.querySelector('.popup__text');
    }

    open(elem) {
        this._popupText.textContent = elem.name;
        this._popupImage.src = elem.link;
        this._popupImage.alt = elem.name;
        super.open();
    }

    close(){
        super.close();
    }
}