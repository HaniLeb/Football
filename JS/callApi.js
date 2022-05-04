'use strict'
const buttons = document.querySelectorAll('#league button');
// const date_select = document.getElementById('date-select');
const standingsDiv = document.getElementById('standings');
const matchsSection = document.getElementById('matchs');
const teams = document.getElementById('teams');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com',
        'X-RapidAPI-Key': '02168b2ea6mshd6d5ec5dff0c885p18add9jsna8d7835ada6b'
    }
}

async function callApi(type, id) {
    const response = await fetch(`https://api-football-beta.p.rapidapi.com/${type}?season=2021&league=${id}`, options);
    if (response.ok) {
        return response.json();
    }
    throw new Error(`${response.statusText} ${response.status}`);
}

function apiPara(type, idApi, id, newId) {
    callApi(type, idApi).then(data => {
        dataReturn(data, id, newId);
    })
}

function dataReturn(data, id, newId) {
    console.log(data);

    switch (data.get) {
        case "standings":
            const league = new Data(data.response[0].league, id, newId);
            league.standings();
            break;
        case "fixtures":
            const matchs = new Data(data.response, id, newId);
            // matchs.selectDate();
            matchs.match();
            break;

        default:
            break;
    }
}

try {
    const standings = `standings`;
    const fixtures = `fixtures`;
    let id = '';

    // Sélection par defaut de la ligue au moment ou il n'y aucun clique
    if (id === '') {
        apiPara(standings, 39, '', '');
        apiPara(fixtures, 39, '', '');
    }
    // Selection de la ligue au moment du clique
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const newId = button.getAttribute('data-league');

            if (newId !== id) {
                apiPara(standings, newId, '', newId);
                apiPara(fixtures, newId, '', newId);

                return id = newId;
            }
        })
    })

} catch (e) {
    console.error(e);
}