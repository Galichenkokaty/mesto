export const popupOpen = document.querySelector('.profile__edit');
export const buttonCloseAdd = document.querySelector('button[name="closeAdd"]');
export const buttonCloseEdit = document.querySelector('button[name="closeEdit"]');
export const buttonCloseElement = document.querySelector('button[name="closeImage"]');
export const buttoncloseImage = document.querySelector('button[name="closeImage"]');
export const popupEditProfile = document.querySelector('.popup_editProfile');
export const formProfile = document.querySelector('form[name="edit-profile"]');
export const nameInput = document.querySelector('.popup__input_line_name');
export const jobInput = document.querySelector('.popup__input_line_information');
export const name = document.querySelector('.profile__title');
export const info = document.querySelector('.profile__subtitle');
export const cardAdd = document.querySelector('.profile__button-add');
export const popupAddCard = document.querySelector('.popup_addElement');
export const cardsContainer = document.querySelector(".elements");
export const titleInput = document.querySelector('.popup__input_line_title');
export const linkInput = document.querySelector('.popup__input_line_link');
export const formCard = document.querySelector('form[name="add-element"]');
export const trash = document.querySelector('.element__trash');
export const popupCardImage = document.querySelector('.popup_element');
export const titlePopupCard = document.querySelector(".popup__text");
export const imagePopupCard = document.querySelector(".popup__image");
export const imageCard = document.querySelector('.element__image');
export const formAddElement = document.getElementById('form__add-element');
export const buttonSave = document.querySelector('.popup__btn-save');
export const popupElement = document.querySelectorAll('.popup__container');
export const popupInputs = document.querySelectorAll('.popup__input');
export const element = document.querySelector('.element');


export const validate = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
};


export const initialCards = [{
        name: 'Мыс Фиолент',
        link: 'https://photocentra.ru/images/main68/686288_main.jpg'
    },
    {
        name: '35 Береговая Батарея',
        link: 'https://avatars.mds.yandex.net/i?id=44ce94d07a42cd71ada149199a72b57b-5733951-images-thumbs&n=13'
    },
    {
        name: 'Херсонес',
        link: 'https://avatars.mds.yandex.net/i?id=49ef144dec26125809bb52694adec5a8-4391548-images-thumbs&n=13'
    },
    {
        name: 'Графская Пристань',
        link: 'https://avatars.mds.yandex.net/i?id=f90ae3410cc03cd3fef795497d36a494-5177173-images-thumbs&n=13'
    },
    {
        name: 'Памятник Затопленным Кораблям',
        link: 'https://avatars.mds.yandex.net/i?id=e9d2a4ba46e3ec087a2fa7d85db95b0c-4011302-images-thumbs&n=13'
    },
    {
        name: 'Панорама "Оборона Севастополя 1854-1855 гг."',
        link: 'https://avatars.mds.yandex.net/i?id=e00d3d24b6cd6dea562ca8507768b55a-5235436-images-thumbs&n=13'
    }
];