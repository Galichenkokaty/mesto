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

    name.textContent = nameInput.value;
    info.textContent = jobInput.value;
    closePopupEdit();
};



function addElementFormSubmitHandler(evt) {
    evt.preventDefault();

    const card = cardTemplate.querySelector(".element").cloneNode(true);
    card.querySelector(".element__title").textContent = titleInput.value;
    card.querySelector(".element__image").src = linkInput.value;

    card.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    card.querySelector('.element__trash').addEventListener('click', function() {
        card.remove();
    });
    card.querySelector('.element__image').addEventListener('click', function() {
        openPopup(popupCardImage);

        const card = cardTemplate.querySelector(".element").cloneNode(true);
        titlePopupCard.textContent = document.querySelector(".element__title").textContent;
        imagePopupCard.src = document.querySelector(".element__image").src;

    });
    cardsContainer.prepend(card);
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




formProfile.addEventListener('submit', editProfileFormSubmitHandler);
popupOpen.addEventListener('click', visibleEditProfilePopup);
addCard.addEventListener('click', visibleAddElement);
buttonCloseAdd.addEventListener('click', closePopupAdd);
buttonCloseEdit.addEventListener('click', closePopupEdit);
formCard.addEventListener('submit', addElementFormSubmitHandler);
buttonCloseElement.addEventListener('click', closeImageCard);