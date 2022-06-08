const popupOpen = document.querySelector('.profile__edit');
const buttonCloseAdd = document.querySelector('button[name="closeAdd"]');
const buttonCloseEdit = document.querySelector('button[name="closeEdit"]');
const buttonCloseElement = document.querySelector('button[name="closeImage"]');
const closeImage = document.querySelector('button[name="closeImage"]');
const popupEditProfile = document.querySelector('.popup_editProfile');
const formProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_line_name');
const jobInput = document.querySelector('.popup__input_line_information');
const name = document.querySelector('.profile__title');
const info = document.querySelector('.profile__subtitle');
const addCard = document.querySelector('.profile__button-add');
const popupAddCard = document.querySelector('.popup_addElement');
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#template__element").content;
const titleInput = document.querySelector('.popup__input_line_title');
const linkInput = document.querySelector('.popup__input_line_link');
const formCard = document.querySelector('form[name="add-element"]');
const trash = document.querySelector('.element__trash');
const popupCardImage = document.querySelector('.popup_element');
const titlePopupCard = document.querySelector(".popup__text");
const imagePopupCard = document.querySelector(".popup__image");
const imageCard = document.querySelector('.element__image');
const formAddElement = document.getElementById('form__add-element');
const card = cardTemplate.querySelector(".element").cloneNode(true);



function closeClickOverlay(e) {
    if (e.target === popupEditProfile || e.target === popupAddCard || e.target === popupCardImage) {
        const popupOpen = e.target.closest('.popup_opened');
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
};

function visibleAddElement() {
    openPopup(popupAddCard);
};

function visibleEditProfilePopup() {
    openPopup(popupEditProfile);
    nameInput.value = name.textContent;
    jobInput.value = info.textContent;

};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function closePopupEdit() {
    closePopup(popupEditProfile);
};

function closePopupAdd() {
    closePopup(popupAddCard);
    formAddElement.reset();

};

function closeImageCard() {
    popupCardImage.classList.remove('popup_opened');
};

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    if (name.textContent.length >= 2 && info.textContent.length >= 2) {
        name.textContent = nameInput.value;
        info.textContent = jobInput.value;
        closePopupEdit();
    };
};

function addElementFormSubmitHandler(evt) {
    evt.preventDefault();

    renderCard(cardsContainer, createCard({ name: titleInput.value, link: linkInput.value }));

    closePopupAdd();

};

const initialCards = [{
        name: 'Мыс Фиолент',
        link: './image/fiolent.jpg'
    },
    {
        name: '35 Береговая Батарея',
        link: './image/35batareya.jpg'
    },
    {
        name: 'Херсонес',
        link: './image/hersones.jpg'
    },
    {
        name: 'Графская Пристань',
        link: './image/grafskaya.jpg'
    },
    {
        name: 'Памятник Затопленным Кораблям',
        link: './image/zatopl.jpg'
    },
    {
        name: 'Панорама "Оборона Севастополя 1854-1855 гг."',
        link: './image/panorama_oborona_sevastopolja_22.jpg'
    }
];


const renderCard = function(container, cardElement) {
    container.prepend(cardElement);
};

initialCards.forEach(function(card) {
    renderCard(cardsContainer, createCard(card));
});


function createCard({ name, link }) {
    const card = cardTemplate.querySelector(".element").cloneNode(true);
    card.querySelector(".element__title").textContent = name;
    card.querySelector(".element__image").src = link;

    card.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    card.querySelector('.element__trash').addEventListener('click', function() {
        card.remove();
    });
    card.querySelector('.element__image').addEventListener('click', function() {
        popupCardImage.classList.add('popup_opened');

        titlePopupCard.textContent = name;
        imagePopupCard.src = link;
    });

    return card;

};


const showError = (formPopup, inputPopup, errorMessage) => {
    const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_error_active');
};

const hideError = (formPopup, inputPopup) => {
    const errorElement = formPopup.querySelector(`.${inputPopup.id}-error`);
    inputPopup.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input_error_active');
    errorElement.textContent.reset;
};

const checkInputValidity = (formPopup, inputPopup) => {
    if (!inputPopup.validity.valid) {
        showError(formPopup, inputPopup, inputPopup.validationMessage);
    } else {
        hideError(formPopup, inputPopup);
    };
};

function setEventListeners(formPopup) {
    const inputList = Array.from(formPopup.querySelectorAll('.popup__input'));
    const buttonForm = formPopup.querySelector('.popup__btn-save');
    toggleButtonState(inputList, buttonForm);
    inputList.forEach((inputPopup) => {
        inputPopup.addEventListener('input', function() {
            checkInputValidity(formPopup, inputPopup);
            toggleButtonState(inputList, buttonForm);
        });
    });
};

function enableValidation() {
    const popupList = Array.from(document.querySelectorAll('.popup__container'));
    popupList.forEach((formPopup) => {
        formPopup.addEventListener('submit', function(e) {
            e.preventDefault();
        });
        const fieldsetList = Array.from(formPopup.querySelectorAll('.form-set'));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });

    });
};

enableValidation();

function hasInvalidInput(inputList) {
    return inputList.some((inputPopup) => {
        return !inputPopup.validity.valid;
    })
};

function toggleButtonState(inputList, buttonForm) {
    if (hasInvalidInput(inputList)) {
        buttonForm.classList.add('popup__btn-save_inactive');
    } else {
        buttonForm.classList.remove('popup__btn-save_inactive');
    };
};



formProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupOpen.addEventListener('click', visibleEditProfilePopup);
addCard.addEventListener('click', visibleAddElement);
buttonCloseAdd.addEventListener('click', closePopupAdd);
buttonCloseEdit.addEventListener('click', closePopupEdit);
formCard.addEventListener('submit', addElementFormSubmitHandler);
buttonCloseElement.addEventListener('click', closeImageCard);
document.addEventListener('keydown', closePopupEsc);
document.addEventListener('click', closeClickOverlay);