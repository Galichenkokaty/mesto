import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import {
    initialCards,
    validate,
    popupOpen,
    buttonCloseAdd,
    buttonCloseEdit,
    buttonCloseElement,
    buttoncloseImage,
    popupEditProfile,
    formProfile,
    nameInput,
    jobInput,
    name,
    info,
    cardAdd,
    popupAddCard,
    cardsContainer,
    titleInput,
    linkInput,
    formCard,
    trash,
    popupCardImage,
    titlePopupCard,
    imagePopupCard,
    imageCard,
    formAddElement,
    buttonSave,
    popupElement,
    popupInputs
} from './constans.js';


const formAdd = new FormValidator(validate, formCard);

const formEdit = new FormValidator(validate, formProfile);



initialCards.forEach(function(card) {
    renderCard(cardsContainer, createCard(card));
});

function closeClickOverlay(e) {
    if (e.target.classList.contains('popup')) {
        const popupOpen = e.target;
        closePopup(popupOpen);
    };

};

function closePopupEsc(e) {
    if (e.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened');
        closePopup(popupOpen);
    };
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function openAddElement() {
    openPopup(popupAddCard);
};

function openEditProfilePopup() {
    openPopup(popupEditProfile);
    nameInput.value = name.textContent;
    jobInput.value = info.textContent;

};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEdit() {
    closePopup(popupEditProfile);
    formEdit.toggleButtonState();
};

function closePopupAdd() {
    closePopup(popupAddCard);
    formAddElement.reset();
    formAdd.toggleButtonState();

};

function closeImageCard() {
    closePopup(popupCardImage);
};

function openImageCard({ link, name }) {
    titlePopupCard.textContent = name;
    imagePopupCard.src = link;
    imagePopupCard.alt = name;

    openPopup(popupCardImage);
};

function renderCard(container, cardElement) {
    container.prepend(cardElement);
};

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    info.textContent = jobInput.value;
    closePopupEdit();

};

function createCard({ link, name }) {
    const card = new Card({ link, name }, "#template__element", openImageCard);
    return card.generateCard();

};

function addElementFormSubmitHandler(evt) {
    evt.preventDefault();

    renderCard(cardsContainer, createCard({ link: linkInput.value, name: titleInput.value }));

    closePopupAdd();
    //buttonSave.disabled = true;
    //buttonSave.classList.add('popup__btn-save_inactive');



}

formAdd.enableValidation();
formEdit.enableValidation();

formProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupOpen.addEventListener('click', openEditProfilePopup);
cardAdd.addEventListener('click', openAddElement);
buttonCloseAdd.addEventListener('click', closePopupAdd);
buttonCloseEdit.addEventListener('click', closePopupEdit);
formCard.addEventListener('submit', addElementFormSubmitHandler);
buttonCloseElement.addEventListener('click', closeImageCard);
popupAddCard.addEventListener('click', closeClickOverlay);
popupEditProfile.addEventListener('click', closeClickOverlay);
popupCardImage.addEventListener('click', closeClickOverlay);