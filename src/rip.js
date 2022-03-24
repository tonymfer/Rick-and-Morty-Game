const deadSoldier = document.querySelector("#rip");
const picture = document.querySelector("#rip img");
const soldierName = document.querySelector("#rip h3");
const power = document.querySelector("#rip h2");
const dead = document.querySelector("#rip p");
function random() {
  const randomCharacter = Math.floor(Math.random() * 826);
  return randomCharacter;
}

function fightRick() {
  const id = random();
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "Alive" || data.status == "unknown") {
        fightRick();
      } else if (data.name.toLowerCase().includes("rick")) {
        fightRick();
      } else {
        picture.src = data.image;
        soldierName.innerText = `Rest In Peace "${data.name}"`;
        power.innerText = `POWER LEVEL: ${calculatePower(data)}`;
        dead.innerText = `STATUS: ${data.status}`;
      }
    });
}

setInterval(fightRick, 2000);
