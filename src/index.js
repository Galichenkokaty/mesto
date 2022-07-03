import './pages/index.css'
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Section } from "./components/Section.js";
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
    popupInputs,
    element
} from './components/constans.js';
import { PopupWithImage } from "./components/PopupWithImage.js";


const rendererCards = new Section({
    cards: initialCards,
    renderer: (elem)=>{
        const card = new Card(elem,"#template__element",()=>{openPopupWithImage.open(elem)});
        const cardElement = card.generateCard();
        rendererCards.addCard(cardElement);

    }
    },'.elements'
    );

rendererCards.renderCards();

const formAdd = new FormValidator(validate, formCard);

const formEdit = new FormValidator(validate, formProfile);

const popupTypeEdit = new PopupWithForm(".popup_editProfile",
    {handleFormSubmit: (item) => {
        const information = new UserInfo({name, info});
        information.setUserInfo(item);
    }
});

popupTypeEdit.setEventListeners();


const popupTypeAdd = new PopupWithForm(".popup_addElement",
    {handleFormSubmit: (item) => {
        const information = new UserInfo({name, info});
        information.setUserInfo(item);
    }
});

popupTypeAdd.setEventListeners();



const openPopupWithImage = new PopupWithImage('.popup_element');
openPopupWithImage.setEventListeners();

/*initialCards.forEach(function(card) {
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

/*function closePopup(popup) {
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
*/
function renderCard(container, cardElement) {
    container.prepend(cardElement);
};

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    info.textContent = jobInput.value;
    popupTypeEdit.close();
};

function createCard({ link, name }) {
    const card = new Card({ link, name }, "#template__element", ()=>{openPopupWithImage.open(name,link)});
    return card.generateCard();

};

function addElementFormSubmitHandler(evt) {
    evt.preventDefault();

    renderCard(cardsContainer, createCard({ link: linkInput.value, name: titleInput.value }));

   popupTypeAdd.close();
    //buttonSave.disabled = true;
    //buttonSave.classList.add('popup__btn-save_inactive');



}

formAdd.enableValidation();
formEdit.enableValidation();


formProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupOpen.addEventListener('click', ()=>{popupTypeEdit.open()});
cardAdd.addEventListener('click', ()=>{popupTypeAdd.open()});
buttonCloseAdd.addEventListener('click', ()=>{popupTypeAdd.close()});
buttonCloseEdit.addEventListener('click', ()=>{popupTypeEdit.close()});
formCard.addEventListener('submit', addElementFormSubmitHandler);
buttonCloseElement.addEventListener('click', ()=> {openPopupWithImage.close()});
//popupAddCard.addEventListener('click', closeClickOverlay);
//popupEditProfile.addEventListener('click', closeClickOverlay);
//popupCardImage.addEventListener('click', closeClickOverlay);