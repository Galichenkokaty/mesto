import './index.css'
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js"
import {
    initialCards,
    validate,
    popupOpen,
    formProfile,
    nameInput,
    jobInput,
    name,
    formAvatar,
    avatar,
    cardAdd,
    formCard
} from '../components/constans.js';
import { PopupWithImage } from "../components/PopupWithImage.js";

const api = new Api({
    baseUrl:  'https://mesto.nomoreparties.co/v1/cohort-50',
    headers: {
      authorization: '67a4e129-8213-4d2e-a4de-3e9cf326878a',
      'Content-Type': 'application/json'
    }
});

let userId
// Загрузка готовых карточек и данных о пользователе с сервера
api.getUserInfo()
.then(res =>{
  userId = res._id;
  userInfoInProfile.setUserInfo(res);
});

api.getInitialCards()
.then(cardList =>{
  cardList.forEach(data =>{
    const card = createCard({
      link:data.link,
      name:data.name,
      likes:data.likes,
      idCard:data._id,
      userId:userId,
      ownerId:data.owner._id})
    rendererCards.addCard(card);
  })
})

function createCard({link,name,likes,idCard,userId,ownerId}) {
    const card = new Card({link,name,likes, idCard, userId,ownerId},
      "#template__element",
      ()=>{openPopupWithImage.open({link,name})},
      (idCard)=>{
        confirmDeleteCard.handlerSubmit(()=>{
          confirmDeleteCard.loading(true);
          api.deleteCard(idCard)
          .then(res =>{
            console.log(res);
            card.trashCardHandler();
            confirmDeleteCard.close();
          })
        });
        confirmDeleteCard.open();
        },
      (idCard)=>{
        if(card.isLiked()){
          api.deleteLike(idCard)
        .then(res =>{
          card.setLikes(res.likes);
        })
        }else{
        api.setLike(idCard)
        .then(res =>{
          card.setLikes(res.likes);
        })}
      }
    );
    
      const cardElement = card.generateCard();
    rendererCards.addCard(cardElement);
    
return cardElement
}


const rendererCards = new Section({
    renderer: (card)=>{
        rendererCards.addCard(createCard(card));
    }
    },'.elements'
    );

   

const formAdd = new FormValidator(validate, formCard);
const formAvatarProfile = new FormValidator(validate,formAvatar);
const formEdit = new FormValidator(validate, formProfile);

const userInfoInProfile = new UserInfo({name:'.profile__title',info:'.profile__subtitle',avatar:'.profile__avatar'});
//Попап редактирования профиля
const popupTypeEdit = new PopupWithForm({
    popupSelector:".popup_editProfile",
    handleFormSubmit:(item) => {
      popupTypeEdit.loading(true);
      api.editUserInfo(item.name,item.information)
      .then( res =>{
      userInfoInProfile.setUserInfo(res);
    }) 
    popupTypeEdit.close();
    }
});
popupTypeEdit.setEventListeners();


//попап добавления карточки
const popupTypeAdd = new PopupWithForm({
    popupSelector:".popup_addElement",
    handleFormSubmit: ({linkElement,titleElement}) => {
      popupTypeAdd.loading(true);
        api.addCard(titleElement,linkElement)
        .then(res =>{
          createCard({link:res.link,name:res.name,likes:res.likes, idCard:res._id, userid:userId,ownerId:res.owner._id})
        })
        popupTypeAdd.close();
        popupTypeAdd.resetInput();
        formAdd.toggleButtonState();   
    }
});
popupTypeAdd.setEventListeners();

//попап подтверждения удаления карточки
const confirmDeleteCard = new PopupWithForm({
  popupSelector:".popup_deleteConfirm"
})
confirmDeleteCard.setEventListeners();
  //попап обновления аватара
const popupUpgradeAvatar = new PopupWithForm({
  popupSelector:".popup_editAvatar",
  handleFormSubmit: (data)=>{
      //popupUpgradeAvatar.loading(true);
      api.editAvatar(data)
      .then((data)=>{
        avatar.src = data.avatar;
        popupUpgradeAvatar.close();
      })
    }
  })
popupUpgradeAvatar.setEventListeners();

const openPopupWithImage = new PopupWithImage('.popup_element');
openPopupWithImage.setEventListeners();

formAdd.enableValidation();
formEdit.enableValidation();
formAvatarProfile.enableValidation();

popupOpen.addEventListener('click', ()=>{
    const userInformation = userInfoInProfile.getUserInfo();
    nameInput.value = userInformation.name;
    jobInput.value = userInformation.info;
    popupTypeEdit.open();
});

cardAdd.addEventListener('click', ()=>{popupTypeAdd.open()});

document.querySelector('.profile__avatar-btn').addEventListener('click',()=>{popupUpgradeAvatar.open()})