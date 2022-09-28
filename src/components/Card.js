export class Card {
  constructor(data, templateElement, openPopupCard, openPopupConfirmDelete, likeCardHandler) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._idCard = data.idCard;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._templateElement = templateElement;
    this._openPopupCard = openPopupCard;
    this._openPopupConfirmDelete = openPopupConfirmDelete;
    this._likeCardHandler = likeCardHandler;

  };

  _listEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', this._imageClickHandler);

    this._element.querySelector('.element__like').addEventListener('click', () => { this._likeCardHandler(this._idCard) });

    this._element.querySelector('.element__trash').addEventListener('click', () => { this._openPopupConfirmDelete(this._idCard) });
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateElement)
      .content
      .querySelector(".element").cloneNode(true);

    return cardTemplate;
  }

  _imageClickHandler = () => {
    this._openPopupCard({ link: this._link, name: this._name });
  }


  trashCardHandler = () => {
    this._element.remove();
  }

  isLiked = () => {
    return this._likes.find(user => user._id === this._userId);
  }

  setLikes(likes) {
    this._likes = likes;
    this._likeNumber.textContent = this._likes.length;
    if (this.isLiked()) {
      this._buttonLike.classList.add('element__like_active');
    } else {
      this._buttonLike.classList.remove('element__like_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeNumber = this._element.querySelector('.element__like-number');
    this._buttonLike = this._element.querySelector('.element__likes');

    this.setLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__trash').style.display = 'none';
    }
    const img = this._element.querySelector('.element__image');
    img.alt = this._name;
    img.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._listEventListeners();
    return this._element;

  }

}