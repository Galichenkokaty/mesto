export class UserInfo {
    constructor( {name, info ,avatar} ) {
        this._userName = document.querySelector(name);
        this._userInfo = document.querySelector(info);
        this._userAvatar = document.querySelector(avatar);   
    }

    getUserInfo() {
        return{
        name: this._userName.textContent,
        info: this._userInfo.textContent,
        avatar: this._userAvatar.src
      }
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }
}
