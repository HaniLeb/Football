'use strict'

class Standings {
    constructor(data, id, newId) {
        this.data = data;
        this.id = id;
        this.newId = newId;
    }

    standingsFunc() {
        const league = this.data.standings[0];
        const teams = document.createElement('div');
        teams.id = "teams";
        // console.log(league);

        if (this.newId !== this.id) {
            div_standings.lastChild.remove();
        }

        // console.log(league[i].team.name);

        for (let i = 0; i < league.length; i++) {
            const teamInfo = document.createElement('div');
            const liNumbers = document.createElement('div');

            teamInfo.className = 'team-info';
            teamInfo.innerHTML = `
            <p class='rank'>${league[i].rank}</p>
            <img class='logo' src='${league[i].team.logo}'>
            <p class='team-name'>${league[i].team.name}</p>`;

            liNumbers.className = 'points';
            liNumbers.innerHTML = `
            <p>${league[i].all.played}</p>
            <p>${league[i].all.win}</p>
            <p>${league[i].all.draw}</p>
            <p>${league[i].all.lose}</p>
            <p>${league[i].all.goals.for}</p>
            <p>${league[i].all.goals.against}</p>
            <p>${league[i].goalsDiff}</p>
            <p>${league[i].points}</p>`;

            teams.append(teamInfo, liNumbers);
            div_standings.appendChild(teams);
        }
    }
}