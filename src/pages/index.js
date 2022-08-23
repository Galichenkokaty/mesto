import './index.css'
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
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
} from '../components/constans.js';
import { PopupWithImage } from "../components/PopupWithImage.js";


function createCard({link,name}) {
    const card = new Card({link,name},"#template__element",()=>{openPopupWithImage.open({link,name})});
    const cardElement = card.generateCard();
    rendererCards.addCard(cardElement);
    
return cardElement
}


const rendererCards = new Section({
    cards: initialCards,
    renderer: ({link,name})=>{
        createCard({link,name});
        
    }
    },'.elements'
    );

rendererCards.renderCards();

   

const formAdd = new FormValidator(validate, formCard);

const formEdit = new FormValidator(validate, formProfile);

const userInfoInProfile = new UserInfo({name:name, info:info});

const popupTypeEdit = new PopupWithForm(".popup_editProfile",
    {handleFormSubmit: (item) => {
        userInfoInProfile.setUserInfo(item);
        popupTypeEdit.close();
    }
});
popupTypeEdit.setEventListeners();



const popupTypeAdd = new PopupWithForm(".popup_addElement",
    {handleFormSubmit: ({linkElement,titleElement}) => {
        createCard({link:linkElement,name:titleElement})
        popupTypeAdd.close();
        popupTypeAdd.resetInput();
        formAdd.toggleButtonState();
        
    }
});

popupTypeAdd.setEventListeners();



const openPopupWithImage = new PopupWithImage('.popup_element');
openPopupWithImage.setEventListeners();

formAdd.enableValidation();
formEdit.enableValidation();


popupOpen.addEventListener('click', 
()=>{
    const userInformation = userInfoInProfile.getUserInfo();

    nameInput.value = userInformation.name;
    jobInput.value = userInformation.information;
    
    popupTypeEdit.open();

});

cardAdd.addEventListener('click', ()=>{popupTypeAdd.open()});
//popupAddCard.addEventListener('click', closeClickOverlay);
//popupEditProfile.addEventListener('click', closeClickOverlay);
//popupCardImage.addEventListener('click', closeClickOverlay);