const validate = {
    formSelector: 'popup__container',
    inputSelector: 'popup__input',
    submitButtonSelector: 'popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
};



const showError = (formPopup, inputPopup, errorMessage, inputError, errorSelector) => {
    const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classList.add(inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorSelector);
};

const hideError = (formPopup, inputPopup, inputError, errorSelector) => {
    const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classList.remove(inputError);
    errorElement.classList.remove(errorSelector);
    errorElement.textContent.reset;
};

const checkInputValidity = (formPopup, inputPopup, inputError, errorSelector) => {
    if (!inputPopup.validity.valid) {
        showError(formPopup, inputPopup, inputPopup.validationMessage, inputError, errorSelector);
    } else {
        hideError(formPopup, inputPopup, inputError, errorSelector);
    };
};



function hasInvalidInput(inputList) {
    return inputList.some((inputPopup) => {
        return !inputPopup.validity.valid;
    });
};

function toggleButtonState(inputList, buttonForm, inactivSelector) {
    if (hasInvalidInput(inputList)) {
        buttonForm.classList.add(inactivSelector);
    } else {
        buttonForm.classList.remove(inactivSelector);
        buttonForm.disabled = false;
    };
};

function setEventListeners(formPopup, validConf) {
    const { inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass } = validConf;
    const inputList = Array.from(formPopup.querySelectorAll(`.${inputSelector}`));
    const buttonForm = formPopup.querySelector(`.${submitButtonSelector}`);
    inputList.forEach((inputPopup) => {
        inputPopup.addEventListener('input', function() {
            checkInputValidity(formPopup, inputPopup, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonForm, inactiveButtonClass);
        });
    });
};

function enableValidation(validateConfig) {
    const { formSelector } = validateConfig;
    const popupList = Array.from(document.querySelectorAll(`.${formSelector}`));
    popupList.forEach((formPopup) => {
        formPopup.addEventListener('submit', function(e) {
            e.preventDefault();
        });
        setEventListeners(formPopup, validateConfig);
    });
};

enableValidation(validate);