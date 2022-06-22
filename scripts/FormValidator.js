export class FormValidator {

    constructor(validate, form) {
        this._form = form;
        this._inputSelector = validate.inputSelector;
        this._submitButtonSelector = validate.submitButtonSelector;
        this._inactiveButtonClass = validate.inactiveButtonClass;
        this._inputErrorClass = validate.inputErrorClass;
        this._errorClass = validate.errorClass;

    }

    _setEventListeners(form) {
        const inputList = Array.from(form.querySelectorAll(this._inputSelector));
        const buttonForm = form.querySelector(this._submitButtonSelector);
        console.log(this._inputSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);

                this._toggleButtonState(inputList, buttonForm);
            });
        });
    }

    _showError = (inputElement, errorMessage) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
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

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonForm) {
        if (this._hasInvalidInput(inputList)) {
            buttonForm.classList.add(this._inactiveButtonClass);
        } else {
            buttonForm.classList.remove(this._inactiveButtonClass);
            buttonForm.disabled = false;
        };
    }

    enableValidation() {
        const popupList = Array.from(document.forms);
        this._setEventListeners(this._form);
        popupList.forEach(() => {
            this._form.addEventListener('submit', function(e) {
                e.preventDefault();
            });
        });
    }


};