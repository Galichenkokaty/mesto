let openPopup = document.querySelector('.profile__edit');
let closePopup = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.btn-save');
let nameInput = document.querySelector('.name');
let jobInput = document.querySelector('.information');
let name = document.querySelector('.profile__title');
let info = document.querySelector('.profile__subtitle');

function visiblePopup() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = info.textContent;

}



function popupClose() {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();

    name = nameInput.value;
    info = jobInput.value;
    popupClose();
}
/*formElement.addEventListener('submit', formSubmitHandler);*/
openPopup.addEventListener('click', visiblePopup);
closePopup.addEventListener('click', popupClose);