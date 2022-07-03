export class UserInfo {
    constructor({ name, info }) {
        this._userName = name;
        this._userInfo = info;
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userInfo.textContent
        };
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
    }
}
