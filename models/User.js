class User {
    constructor(id, followers = null,) {
        this.id = id;
        this.followers = followers;
    }
}

module.exports = User;