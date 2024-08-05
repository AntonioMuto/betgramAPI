class TeamDetails {
    constructor(id, followers = null, type, name, shortName, country, logo, stadiumName, addressLocation, addressCountry, primaryLeagueId, primaryLeagueName) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.shortName = shortName;
        this.country = country;
        this.logo = logo;
        this.stadiumName = stadiumName;
        this.locationCity = addressLocation;
        this.locationName = addressCountry;
        this.followers = followers;
        this.primaryLeagueId = primaryLeagueId;
        this.primaryLeagueName = primaryLeagueName;
    }
}

module.exports = TeamDetails;