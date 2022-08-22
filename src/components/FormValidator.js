
export class FormValidator {

    constructor(validate, form) {
        this._form = form;
        this._inputSelector = validate.inputSelector;
        this._submitButtonSelector = validate.submitButtonSelector;
        this._inactiveButtonClass = validate.inactiveButtonClass;
        this._inputErrorClass = validate.inputErrorClass;
        this._errorClass = validate.errorClass;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonForm = this._form.querySelector(this._submitButtonSelector);
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    _showError = (inputElement, errorMessage) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideError = (inputElement) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent.reset;
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        };
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonForm.classList.add(this._inactiveButtonClass);
            this._buttonForm.disabled = true;
        } else {
            this._buttonForm.classList.remove(this._inactiveButtonClass);
            this._buttonForm.disabled = false;
        };
    }

    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }


};