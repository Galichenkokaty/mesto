export class UserInfo {
    constructor({ name, info} ) {
        this._userName = name;
        this._userInfo = info;
        this._inputUserName = document.querySelector('.popup__input_line_name');
        this._inputUserInfo = document.querySelector('.popup__input_line_information');
    }

    getUserInfo() {
        this._inputUserName.value = this._userName.textContent; 
        this._inputUserInfo.value = this._userInfo.textContent; 
      
    }

    setUserInfo(data) {
        console.log(data);
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.information;
    }
}
