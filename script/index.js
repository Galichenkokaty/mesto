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
const cardAdd = document.querySelector('.profile__button-add');
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
const buttonSave = document.querySelector('.popup__btn-save');



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
    buttonSave.disabled = true;
    buttonSave.classList.add('popup__btn-save_inactive');
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEdit() {
    closePopup(popupEditProfile);
};

function closePopupAdd() {
    closePopup(popupAddCard);
    formAddElement.reset();

};

function closeImageCard() {
    closePopup(popupCardImage);
};

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    info.textContent = jobInput.value;
    closePopupEdit();

};

function addElementFormSubmitHandler(evt) {
    evt.preventDefault();

    renderCard(cardsContainer, createCard({ name: titleInput.value, link: linkInput.value }));

    closePopupAdd();
    buttonSave.disabled = true;
    buttonSave.classList.add('popup__btn-save_inactive');


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
    const imageCard = card.querySelector('.element__image');
    card.querySelector(".element__title").textContent = name;
    imageCard.src = link;

    card.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    card.querySelector('.element__trash').addEventListener('click', function() {
        card.remove();
    });
    imageCard.addEventListener('click', function() {
        popupCardImage.classList.add('popup_opened');

        titlePopupCard.textContent = name;
        imagePopupCard.src = link;
    });

    return card;

};



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
popupAddCard.addEventListener('keydown', closePopupEsc);
popupEditProfile.addEventListener('keydown', closePopupEsc);
popupCardImage.addEventListener('keydown', closePopupEsc);