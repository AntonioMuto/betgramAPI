class Bet {
    constructor(id, totalLikes = 0, likes = null,) {
        this.id = id;
        this.totalLikes = totalLikes;
        this.likes = likes;
    }
}

module.exports = Bet;