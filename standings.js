class Standings {
  constructor(data) {
    this.data = data;
  }

  createStan() {
    const standings = this.data.response[0].league.standings[0];
    const div_standings = document.querySelector(".all-standings");

    for (let i = 0; i < standings.length; i++) {
      const teamInfo = document.createElement("div");
      const statistics = document.createElement("div");

      teamInfo.className = "team";
      statistics.className = "points";

      teamInfo.innerHTML = `
      <p>${standings[i].rank}</p>
      <img class='logo' src='${standings[i].team.logo}' alt='${standings[i].team.name}'>
      <p>${standings[i].team.name}</p>`;

      statistics.innerHTML = `
      <p>${standings[i].all.played}</p>
      <p>${standings[i].all.win}</p>
      <p>${standings[i].all.draw}</p>
      <p>${standings[i].all.lose}</p>
      <p>${standings[i].all.goals.for}</p>
      <p>${standings[i].all.goals.against}</p>
      <p>${standings[i].goalsDiff}</p>
      <p>${standings[i].points}</p>`;

      div_standings.append(teamInfo, statistics);
    }
  }
}
