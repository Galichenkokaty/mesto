let openPopup = document.querySelector('.profile__edit');
let closePopup = document.querySelector('.popup__close');
let open = document.querySelector('.popup');

function visiblepopup() {
    open.classList.add('popup_opened');
}

openPopup.addEventListener('click', visiblepopup);

function clspopup() {
    open.classList.remove('popup_opened');
}

closePopup.addEventListener('click', clspopup);

let formElement = document.querySelector('.btn-save');
let nameInput = document.querySelector('.input_name');
let jobInput = document.querySelector('.input__information');

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameInput.value;
    jobInput.value;

    let name = document.querySelector('.profile__title');
    let info = document.querySelector('.profile__subtitle');

    name.textContent = nameInput.value;
    info.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);