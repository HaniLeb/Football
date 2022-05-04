class Data {
    constructor(data, id, newId) {
        this.data = data;
        this.id = id;
        this.newId = newId;
    }

    standings() {
        const league = this.data.standings[0];
        const teams = document.createElement('div');
        teams.id = "teams";
        console.log(league);

        if (this.newId !== this.id) {
            standingsDiv.lastChild.remove();
        }


        for (let i = 0; i < league.length; i++) {
            // console.log(league[i].team.name);

            // Create paragraphe, list and images in DOM
            const teamInfo = document.createElement('div');
            teamInfo.className = 'team-info';
            const rank = document.createElement('p');
            rank.className = 'rank';
            const logo = document.createElement('img');
            logo.className = 'logo';
            const teamName = document.createElement('p');
            teamName.className = 'team-name';
            const liNumbers = document.createElement('div');
            liNumbers.className = 'points';

            const matchPlay = document.createElement('p');
            const victory = document.createElement('p');
            const draw = document.createElement('p');
            const defeat = document.createElement('p');
            const goalTaken = document.createElement('p');
            const goalConceded = document.createElement('p');
            const goalDifference = document.createElement('p');
            const points = document.createElement('p');

            // Data Affectation
            rank.innerText = league[i].rank;
            logo.src = league[i].team.logo;
            teamName.innerText = league[i].team.name;

            matchPlay.innerText = league[i].all.played;
            victory.innerText = league[i].all.win;
            draw.innerText = league[i].all.draw;
            defeat.innerText = league[i].all.lose;
            goalTaken.innerText = league[i].all.goals.for;
            goalConceded.innerText = league[i].all.goals.against;
            goalDifference.innerText = league[i].goalsDiff;
            points.innerText = league[i].points;

            teamInfo.append(rank, logo, teamName);
            liNumbers.append(points, matchPlay, victory, draw, defeat, goalTaken, goalConceded, goalDifference);

            teams.append(teamInfo, liNumbers);
            standingsDiv.appendChild(teams);
        }
    }

    match() {
        const allMatchs = this.data;
        const all = document.createElement('div');
        all.id = 'all-matchs';

        console.log(allMatchs);

        if (this.newId !== this.id) {
            matchsSection.lastChild.remove();
        }

        for (let i = 0; i < allMatchs.length; i++) {
            const divByMatch = document.createElement('div');
            divByMatch.className = 'match';

            const divByTimes = document.createElement('div');
            divByTimes.className = 'date';
            const divByTeams = document.createElement('div');
            divByTeams.className = 'team-vs';
            const divHome = document.createElement('div');
            divHome.className = 'home';
            const divAway = document.createElement('div');
            divAway.className = 'away';
            const divByVenue = document.createElement('div');
            divByVenue.className = 'venue';
            const versus = document.createElement('div');
            versus.className = 'vs';

            // DivByTimes
            const dayOfmatch = document.createElement('p');
            const time = document.createElement('p');

            // DivByTeams
            const logoHomeTeam = document.createElement('img');
            const nameHomeTeam = document.createElement('p');
            const homeGoals = document.createElement('p');
            const logoAwayTeam = document.createElement('img');
            const nameAwayTeam = document.createElement('p');
            const awayGoals = document.createElement('p');
            // DivByVenue
            const referee = document.createElement('p');
            const city = document.createElement('p');
            const nameStadium = document.createElement('p');
            // Date et Heure
            const timestamp = allMatchs[i].fixture.timestamp;
            const date = new Date(timestamp * 1000);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const hours = date.getHours();
            const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();


            dayOfmatch.textContent = `📆${day}/${month}/${year}`;
            time.textContent = `🕓${hours}H${minutes}`
            // Fin Date Et Heure

            logoHomeTeam.src = allMatchs[i].teams.home.logo;
            nameHomeTeam.textContent = allMatchs[i].teams.home.name;
            homeGoals.textContent = allMatchs[i].goals.home;
            versus.innerHTML = "<p>VS</p>";
            logoAwayTeam.src = allMatchs[i].teams.away.logo;
            nameAwayTeam.textContent = allMatchs[i].teams.away.name;
            awayGoals.textContent = allMatchs[i].goals.away;

            referee.textContent = allMatchs[i].fixture.referee;
            city.textContent = allMatchs[i].fixture.venue.city;
            nameStadium.textContent = allMatchs[i].fixture.venue.name;

            divByTimes.append(dayOfmatch, time);
            divHome.append(logoHomeTeam, nameHomeTeam, homeGoals);
            divAway.append(logoAwayTeam, nameAwayTeam, awayGoals);
            divByTeams.append(divHome, versus, divAway);
            divByVenue.append(referee.textContent.replace(', England', ''), city, nameStadium);

            divByMatch.append(divByTimes, divByTeams, divByVenue);
            all.appendChild(divByMatch)
            matchsSection.appendChild(all);
        }
    }

    selectDate() {
    }
}