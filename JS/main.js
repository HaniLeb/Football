const btns = document.querySelectorAll(".btn-league");
const select = document.querySelector(".day-select");
const sect_fix = document.getElementById("fixtures");
const sect_stan = document.getElementById("standings");
let arrDay = [];
let newArr = [];

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
    "X-RapidAPI-Key": "02168b2ea6mshd6d5ec5dff0c885p18add9jsna8d7835ada6b",
  },
};

async function get(id) {
  try {
    const [standings, fixtures] = await Promise.all([
      fetch(`https://api-football-beta.p.rapidapi.com/standings?season=2021&league=${id}`, options),
      fetch(`https://api-football-beta.p.rapidapi.com/fixtures?season=2021&league=${id}`, options),
    ]);

    console.log(standings, fixtures);

    if (standings.ok && fixtures.ok) {
      const [data1, data2] = await Promise.all([standings.json(), fixtures.json()]);
      sendInStorage(data1, data2);
    } else {
      throw new Error(`${response.statusText}: ${response.status}`);
    }
  } catch (e) {
    console.error(e);
  }
}

async function getLocalData(i) {
  const local_data1 = await JSON.parse(localStorage.getItem(localStorage.key(i)))[0];
  const local_data2 = await JSON.parse(localStorage.getItem(localStorage.key(i)))[1];
  sendInStorage(local_data1, local_data2);
}

function sendInStorage(data1, data2) {
  let key = data1.response[0].league.name;
  key = key.trim().replace(" ", "_");

  if (!localStorage.getItem(key)) {
    const storage_stan = new LocalStorage(key, data1);
    storage_stan.set();
  }
  if (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)).length < 2) {
    const storage_fix = new LocalStorage(key, data2);
    storage_fix.set();
  }

  const newStandings = new Standings(data1);
  newStandings.createStan();

  const newFixtures = new Fixtures(data2);

  const day = new Date(data2.response[0].fixture.date);
  const date = day.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  newFixtures.addDates(date);
  newFixtures.createMatches(date);

  select.addEventListener("change", (e) => {
    if (sect_fix.lastElementChild.childElementCount >= 0) {
      sect_fix.lastElementChild.replaceChildren();
      newFixtures.createMatches(e.target.value);
    }
  });
}

try {
  if (localStorage.length === 0) {
    get(39);
  } else {
    getLocalData(0);
  }
} catch (e) {
  console.error(e);
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const newId = btn.getAttribute("data-id");
    const league = btn.getAttribute("data-league");

    for (var i = 0; i < localStorage.length; i++) {
      const localID = JSON.parse(localStorage.getItem(localStorage.key(i)))[0].parameters.league;

      if (!localStorage.getItem(league)) {
        get(newId);
        break;
      } else if (newId === localID) {
        getLocalData(i);
        break;
      }
    }

    sect_stan.lastElementChild.replaceChildren();
    sect_fix.firstElementChild.replaceChildren();
    sect_fix.lastElementChild.replaceChildren();
    select.replaceChildren();
    arrDay = [];
    newArr = [];
  });
});
