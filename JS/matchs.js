'use strict'

const all = document.createElement('div');
all.id = 'all-matchs';
let option;

// Date du jour
const today = new Date();
const today_date = `${today.getDate()}/${('0' + (today.getMonth() + 1)).slice(-2)}/${today.getFullYear()}`;

let all_matches_dates = [];

class Match {
    constructor(data, id, newId) {
        this.data = data;
        this.id = id;
        this.newId = newId;
    }

    // Fonction qui crée des cards de chaque match, récupère en paramètre la date sélectionner et la compare aux dates du tableau
    createMatch(date) {
        const all_matches = this.data;

        if (this.newId !== this.id) {
            matches_section.lastChild.remove();
        }

        for (let i = 0; i < all_matches_dates.length; i++) {

            if (date === all_matches_dates[i]) {

                const div_match = document.createElement('div');
                const div_teams = document.createElement('div');

                const div_time = document.createElement('div');
                const div_home = document.createElement('div');
                const div_away = document.createElement('div');
                const div_venue = document.createElement('div');
                const div_vs = document.createElement('div');

                const times_tamp = all_matches[i].fixture.timestamp;
                const date = new Date(times_tamp * 1000);

                const referee = all_matches[i].fixture.referee;

                div_match.className = 'match';
                div_teams.className = 'team-vs';

                div_time.className = 'date';
                div_time.innerHTML = `
                    <p>📆${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}</p>
                    <p>🕓${date.getHours()}H${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}</p>`;

                div_home.className = 'home';
                div_home.innerHTML = `
                <img src='${all_matches[i].teams.home.logo}'>
                <p>${all_matches[i].teams.home.name}</p>
                <p>${all_matches[i].goals.home}</p>`;

                div_away.className = 'away';
                div_away.innerHTML = `
                <img src=${all_matches[i].teams.away.logo}>
                <p>${all_matches[i].teams.away.name}</p>
                <p>${all_matches[i].goals.away}</p>`;

                div_venue.className = 'venue';
                div_venue.innerHTML = `
                <p>${referee.replace(', England', '')}</p>
                <p>${all_matches[i].fixture.venue.city}</p>
                <p>${all_matches[i].fixture.venue.name}</p>`;

                div_vs.className = 'vs';
                div_vs.innerHTML = "<p>VS</p>";

                div_teams.append(div_home, div_vs, div_away);
                div_match.append(div_time, div_teams, div_venue);
                all.appendChild(div_match)
                matches_section.appendChild(all);
            }
        }
    }

    optionsDate() {
        const all_matches_for_date = this.data;
        // console.log(this.id);

        all_matches_dates = [];

        // Ajout de toutes les dates de chaque matches dans un tableau
        for (let i = 0; i < all_matches_for_date.length; i++) {
            // Date et Heure de chaque match !
            const timestamp = all_matches_for_date[i].fixture.timestamp;
            const date = new Date(timestamp * 1000);

            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);

            all_matches_dates.push(`${day}/${month}/${year}`);
        }

        // Ordonnée les dates dans un nouveau tableau
        let newArr = [...new Set(all_matches_dates)];
        console.log(newArr);

        if (date_select.childElementCount > 0) {
            newArr = [];
        }

        // Fonction qui Ordronne les dates
        newArr.sort(function (a, b) {
            console.log('reoganisation des dates');
            a = a.split('/').reverse().join('');
            // console.log(a);
            b = b.split('/').reverse().join('');
            // console.log(b);
            return a > b ? 1 : a < b ? -1 : 0;
        });
        if (newArr.length > 0) {
            // Crée et Ajoute les balises option, avec la date de chaque match dans la balise select
            for (let i = 0; i < newArr.length; i++) {
                console.log('add options');
                option = document.createElement('option');
                option.className = 'day';
                option.textContent = newArr[i];
                option.value = newArr[i];
                date_select.appendChild(option);
            }
        }

        // Par Defaut quand l'utilisateur arrive sur la page la permière date de la balise sction est sélectioner et affiche les matchs
        // Le cas ou il n'y ait aucune date de sélectionner et ou aucune date du jour qui correspond aux dates du tableau ?
        // On sélectionne une date au hasard
    }
}