import { Popup } from "./Popup.js";
export  class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitBtn = this._form.querySelector('.popup__btn-save');
    this._submitBtnText  = this._submitBtn.textContent;
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

handlerSubmit(newSubmitHandler){
  this._handleFormSubmit = newSubmitHandler;
}

setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        this._handleFormSubmit(this._getInputValues());
       });
}

loading(isLoading) {
  if (isLoading) {
    this._submitBtn.textContent = 'Сохранение...'
  } else {
    this._submitBtn.textContent = this._submitBtnText;
  }
}
}