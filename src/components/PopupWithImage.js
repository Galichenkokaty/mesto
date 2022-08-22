import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupText = this._popup.querySelector('.popup__text');
    }

    open({link,name}) {
        this._popupText.textContent = name;
        this._popupImage.src = link;
        this._popupImage.alt = name;
        super.open();
    }

}