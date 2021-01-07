class Auth {
    constructor() {
        this.Authenticated = false
    }

    login() {
        this.Authenticated = true
    }

    logout() {
        this.Authenticated = false
    }

    isAuthenticated() {
        return this.Authenticated;
    }

}

export default new Auth()