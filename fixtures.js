class Fixtures {
  constructor(data) {
    this.data = data;
  }

  addDates(d_select) {
    const fixtures = this.data.response;
    // console.log(this.data);
    // console.log(fixtures);

    for (let i = 0; i < fixtures.length; i++) {
      const date = fixtures[i].fixture.date;
      const day = new Date(date);

      arrDay.push(day);

      arrDay.sort((a, b) => {
        return a - b;
      });
    }

    for (let i = 0; i < arrDay.length; i++) {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      const localDate = arrDay[i].toLocaleDateString("fr-FR", options);
      newArr.push(localDate);
      newArr = [...new Set(newArr)];
    }

    for (let i = 0; i < newArr.length; i++) {
      const optionD = document.createElement("option");

      optionD.value = newArr[i];
      optionD.classList = "day";
      optionD.innerHTML = newArr[i];

      select.appendChild(optionD);

      if (optionD.value === d_select) {
        optionD.setAttribute("selected", "");
      }
    }
  }

  createMatches(d_select) {
    const fixtures = this.data.response;
    const allMatches = document.querySelector(".all-matches");

    for (let i = 0; i < fixtures.length; i++) {
      const date = fixtures[i].fixture.date;
      const dateOfMatch = new Date(date);
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      const localDate = dateOfMatch.toLocaleDateString("fr-FR", options);

      if (d_select === localDate) {
        const div_match = document.createElement("div");
        const div_home = document.createElement("div");
        const div_time = document.createElement("div");
        const div_away = document.createElement("div");

        const times_tamp = fixtures[i].fixture.timestamp;
        const time = new Date(times_tamp * 1000);

        div_match.className = "match";
        div_home.className = "team-home";
        div_time.className = "time";
        div_away.className = "team-away";

        div_home.innerHTML = `
      <p>${fixtures[i].teams.home.name}</p>
      <img class="logo" src='${fixtures[i].teams.home.logo}'>
      <p>${fixtures[i].goals.home}</p>`;

        div_time.innerHTML = `
      <p>${time.getHours()}h${(time.getMinutes() < 10 ? "0" : "") + time.getMinutes()}</p>`;

        div_away.innerHTML = `
      <p>${fixtures[i].goals.away}</p>
      <img class="logo" src=${fixtures[i].teams.away.logo}>
      <p>${fixtures[i].teams.away.name}</p>`;

        div_match.append(div_home, div_time, div_away);
        allMatches.appendChild(div_match);
        sect_fix.appendChild(allMatches);
      }
    }
  }
}
