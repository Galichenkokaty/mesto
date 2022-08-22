import { Popup } from "./Popup.js";

export  class PopupWithForm extends Popup {
  constructor( popupSelector, {handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(popupSelector).querySelector('.popup__container');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
}

_getInputValues = () => {
  this._formValues = {};
  
    this._inputList.forEach((input) => 
    this._formValues[input.name] = input.value);
    return this._formValues;
}


resetInput(){
  this._form.reset();
}

setEventListeners() {
    super.setEventListeners();
 
    this._form.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this._form.querySelector('.popup__btn-save').disabled = true;
        this._form.querySelector('.popup__btn-save').classList.add('popup__btn-save_inactive');
    });
}
}