import { Popup } from "./Popup.js";

export  class PopupWithForm extends Popup {
  constructor( popupSelector, {handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector('.popup__container');
    this._inputList = Array.from(this._form.querySelector('.popup__input'))
}

_getInputValues = () => {
  this._formValues = {};
    this._inputList.forEach((input) => 
    this._formValues[input.name] = input.value);
    return this._formValues;
}

open(){
super.open();
}

close() {
    super.close();
    this._form.reset();
  }


setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    });
}
}