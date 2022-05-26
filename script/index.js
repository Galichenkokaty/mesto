let openPopup = document.querySelector('.profile__edit');
let closeAdd = document.querySelector('button[name="closeAdd"]');
let closeEdit = document.querySelector('button[name="closeEdit"]');
const closeImage = document.querySelector('button[name="closeImage"]');
let popupEditProfile = document.querySelector('.popup_editProfile');
let formProfile = document.querySelector('form[name="edit-profile"]');
let nameInput = document.querySelector('.popup__input_line_name');
let jobInput = document.querySelector('.popup__input_line_information');
let name = document.querySelector('.profile__title');
let info = document.querySelector('.profile__subtitle');
let addElement = document.querySelector('.profile__button-add');
let popupElement = document.querySelector('.popup_addElement');
const elementContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector(".template__element").content;
const title = document.querySelector('.popup__input_line_title');
const link = document.querySelector('.popup__input_line_link');
const formElement = document.querySelector('form[name="add-element"]');
const trash = document.querySelector('.element__trash');
const popupElementImage = document.querySelector('.popup__image');




function visibleAddElement() {
    popupElement.classList.add('popup_opened');
}

function visiblePopup() {
    popupEditProfile.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = info.textContent;

}

function popupCloseEdit() {
    popupEditProfile.classList.remove('popup_opened');
}

function popupCloseAdd() {
    popupElement.classList.remove('popup_opened');
}

function popupCloseImage() {
    popupElementImage.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    info.textContent = jobInput.value;
    popupCloseEdit();
}

function formSubmitElement(evt) {
    evt.preventDefault();

    const Element = elementTemplate.querySelector(".element").cloneNode(true);
    Element.querySelector(".element__title").textContent = title.value;
    Element.querySelector(".element__image").src = link.value;

    Element.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    Element.querySelector('.element__trash').addEventListener('click', function() {
        Element.remove();
    });
    Element.querySelector('.element__image').addEventListener('click', function() {
        document.querySelector('.popup_element').classList.add('popup_opened');
        document.querySelector('.element__image').classList.add('popup_opened');

        const Element = elementTemplate.querySelector(".element").cloneNode(true);
        document.querySelector(".popup__text").textContent = title.value;
        document.querySelector(".popup__image").src = link.value;

    })

    document.querySelector('.popup__close_image').addEventListener('click', function() {
        document.querySelector('.popup_element').classList.remove('popup_opened');
    });

    elementContainer.prepend(Element);

    popupCloseAdd();

}


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


const infoCard = initialCards.map(function(item) {
    return {
        name: item.name,
        link: item.link
    };
});

function render() {
    infoCard.forEach(renderCard);
}

function renderCard({ name, link }) {
    const Element = elementTemplate.querySelector(".element").cloneNode(true);
    Element.querySelector(".element__title").textContent = name;
    Element.querySelector(".element__image").src = link;

    Element.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    Element.querySelector('.element__trash').addEventListener('click', function() {
        Element.remove();
    });
    Element.querySelector('.element__image').addEventListener('click', function() {
        document.querySelector('.popup_element').classList.add('popup_opened');
        document.querySelector('.element__image').classList.add('popup_opened');


        const Element = elementTemplate.querySelector(".element").cloneNode(true);
        document.querySelector(".popup__text").textContent = name;
        document.querySelector(".popup__image").src = link;
    });

    elementContainer.prepend(Element);

    document.querySelector('.popup__close_image').addEventListener('click', function() {
        document.querySelector('.popup_element').classList.remove('popup_opened');
    });
}
render();

formProfile.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener('click', visiblePopup);
addElement.addEventListener('click', visibleAddElement);
closeAdd.addEventListener('click', popupCloseAdd);
closeEdit.addEventListener('click', popupCloseEdit);
formElement.addEventListener('submit', formSubmitElement);