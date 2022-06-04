'use strict'

const buttons = document.querySelectorAll('#league button');
const div_standings = document.getElementById('standings');
const matches_section = document.getElementById('matchs');
const teams = document.getElementById('teams');
const type_data = ['standings', 'fixtures'];
const date_select = document.getElementById('date-select');

let id = '';
let day_select;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com',
        'X-RapidAPI-Key': '02168b2ea6mshd6d5ec5dff0c885p18add9jsna8d7835ada6b'
    }
}

// Fonction asynchrone qui appelle une api et retourne un objet json
async function callApi(type, id) {
    try {
        const resp = await fetch(`https://api-football-beta.p.rapidapi.com/${type}?season=2021&league=${id}`, options);
        if (resp.ok) {
            return resp.json();
        }
        throw new Error(`${resp.statusText} ${resp.status}`);
    } catch (err) {
        console.error(err);
    }
}

// Fonction qui récupère en paramètre le type de requête et id et les passe en paramètre aux fonctions callApi() et data()
function paramOfApi(type, idLeague, id, newId) {
    callApi(type, idLeague).then(data => {
        get_data(data, id, newId);
    })
}

// Fonction qui récupère en paramètre les données et les id et instancie des objets Data()
function get_data(data, id, newId) {
    const data_get = data.get;
    // console.log(data);
    switch (data_get) {
        case type_data[0]:
            const league = new Standings(data.response[0].league, id, newId);
            league.standingsFunc();
            break;
        case type_data[1]:
            const matchs = new Match(data.response, id, newId);

            matchs.optionsDate();

            if (all.childElementCount === 0) {
                console.log('Veuillez sélectionner une date');
            }

            // Sélectionne et crée les matchs en fonction de la date du jour
            for (let i = 0; i < all_matches_dates.length; i++) {
                day_select = all_matches_dates[i]

                if (all.childElementCount >= 0 && today_date === day_select) {
                    option.setAttribute('selected', '');
                    matchs.createMatch(day_select);
                }
            }

            // Crée et sélectionne les matchs au moment du click
            date_select.addEventListener('change', function (e) {
                // Date sélectionner
                const optionDay = e.target.value;
                // console.log(optionDay);

                for (let i = 0; i < all_matches_dates.length; i++) {
                    day_select = all_matches_dates[i]

                    if (all.childElementCount >= 0 && optionDay === day_select) {
                        // console.log(day_select);
                        all.replaceChildren();
                        matchs.createMatch(day_select);
                    }
                }
            })
            break;
    }
}

try {
    // Sélection par defaut de la ligue
    if (id === '') {
        paramOfApi(type_data[0], 39, '', '');
        paramOfApi(type_data[1], 39, '', '');
    }
    // Selection de la ligue au moment du clique
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const newId = button.getAttribute('data-league');

            if (newId !== id) {
                paramOfApi(type_data[0], newId, '', newId);
                paramOfApi(type_data[1], newId, '', newId);
                all.replaceChildren();
                return id = newId;
            }
        })
    })
} catch (e) {
    console.error(e);
}