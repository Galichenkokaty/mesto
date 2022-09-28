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
  buttonSave,
  openFormEditProfile,
  formProfile,
  nameInput,
  jobInput,
  name,
  formAvatar,
  avatar,
  cardAdd,
  formCard
} from '../utils/constans.js';
import { PopupWithImage } from "../components/PopupWithImage.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '67a4e129-8213-4d2e-a4de-3e9cf326878a',
    'Content-Type': 'application/json'
  }
});

let userId
// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {

    userInfoInProfile.setUserInfo(userData);
    userId = userData._id;
    rendererCards.renderCards(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


function createCard({ link, name, likes, idCard, userId, ownerId }) {
  const card = new Card({ link, name, likes, idCard, userId, ownerId },
    "#template__element",
    () => { openPopupWithImage.open({ link, name }) },
    (idCard) => {
      confirmDeleteCard.setSubmitHandker(() => {
        confirmDeleteCard.loading(true);
        api.deleteCard(idCard)
          .then(res => {
            card.trashCardHandler();
            confirmDeleteCard.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`)
          })
          .finally(() => {
            confirmDeleteCard.loading(false);
          });
      });
      confirmDeleteCard.open();
    },
    (idCard) => {
      if (card.isLiked()) {
        api.deleteLike(idCard)
          .then(res => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api.setLike(idCard)
          .then(res => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement
}

const rendererCards = new Section({
  renderer: (card) => {
    rendererCards.addCard(createCard({
      link: card.link,
      name: card.name,
      likes: card.likes,
      idCard: card._id,
      userId: userId,
      ownerId: card.owner._id
    }));
  }
}, '.elements'
);



const formAddValidator = new FormValidator(validate, formCard);
const formAvatarProfileValidator = new FormValidator(validate, formAvatar);
const formEditValidator = new FormValidator(validate, formProfile);
const userInfoInProfile = new UserInfo({ name: '.profile__title', info: '.profile__subtitle', avatar: '.profile__avatar' });
//Попап редактирования профиля
const popupTypeEdit = new PopupWithForm({
  popupSelector: ".popup_editProfile",
  handleFormSubmit: (item) => {
    popupTypeEdit.loading(true);
    api.editUserInfo(item.name, item.information)
      .then(res => {
        userInfoInProfile.setUserInfo(res);
        popupTypeEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupTypeEdit.loading(false);
      });
  }
});
popupTypeEdit.setEventListeners();


//попап добавления карточки
const popupTypeAdd = new PopupWithForm({
  popupSelector: ".popup_addElement",
  handleFormSubmit: ({ linkElement, titleElement }) => {
    popupTypeAdd.loading(true);
    api.addCard(titleElement, linkElement)
      .then(res => {
        const card = createCard({
          link: res.link,
          name: res.name,
          likes: res.likes,
          idCard: res._id,
          userId: userId,
          ownerId: res.owner._id
        })
        rendererCards.addCard(card);
        popupTypeAdd.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupTypeAdd.loading(false);
      });
  }
});
popupTypeAdd.setEventListeners();

//попап подтверждения удаления карточки
const confirmDeleteCard = new PopupWithForm({
  popupSelector: ".popup_deleteConfirm"
})
confirmDeleteCard.setEventListeners();
//попап обновления аватара
const popupUpgradeAvatar = new PopupWithForm({
  popupSelector: ".popup_editAvatar",
  handleFormSubmit: (data) => {
    popupUpgradeAvatar.loading(true);
    api.editAvatar(data)
      .then((data) => {
        userInfoInProfile.setUserInfo(data)
        popupUpgradeAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupUpgradeAvatar.loading(false);
      });
  }
})
popupUpgradeAvatar.setEventListeners();

const openPopupWithImage = new PopupWithImage('.popup_element');
openPopupWithImage.setEventListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarProfileValidator.enableValidation();

openFormEditProfile.addEventListener('click', () => {
  const userInformation = userInfoInProfile.getUserInfo();
  nameInput.value = userInformation.name;
  jobInput.value = userInformation.info;
  popupTypeEdit.open();
});

cardAdd.addEventListener('click', () => {
  popupTypeAdd.open();
  formAddValidator.toggleButtonState()
});

document.querySelector('.profile__avatar-btn').addEventListener('click', () => {
  popupUpgradeAvatar.open();
  formAvatarProfileValidator.toggleButtonState();
})