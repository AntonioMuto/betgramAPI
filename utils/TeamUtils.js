const TeamDetails = require('../models/team/TeamDetails');

const remapTeams = (team) => {
    let resTeam = {
        id: team.details.id,
        type: team.details.type,
        name: team.details.name,
        shortName: team.details.shortName,
        country: team.details.country,
        logo: team.details.sportsTeamJSONLD.logo,
        primaryLeagueId: team.details.primaryLeagueId,
        primaryLeagueName: team.details.primaryLeagueName,
        venue: team.overview.venue
    }
    return resTeam;
}   

module.exports = {
    remapTeams
};