// import { monsterPower } from "./rip.js";
const toKillForm = document.getElementById("tokill-form");
const toKillList = document.getElementById("tokill-list");
const toKillInput = toKillForm.querySelector("input");
const rickEl = document.querySelector("#kill-this-rick");
const rickFaceEl = rickEl.getElementsByTagName("img");
const rickNameEl = rickEl.getElementsByTagName("h2");
const challengersEl = rickEl.getElementsByTagName("li");
const fightMob = document.querySelector("#fightMob");
const runAway = document.querySelector("#runaway");
const deadSoldier = document.querySelector("#levelUp");
const picture = document.querySelector("#levelUp img");
const soldierName = document.querySelector("#levelUp h3");
const power = document.querySelector("#levelUp h2");
const rickPicture = document.querySelector("#kill-this-rick img");
const rickName = document.querySelector("#kill-this-rick h3");
const rickPower = document.querySelector("#kill-this-rick h2");
const killRick = document.querySelector("#challenge");

const DEAD_RICK_KEY = "dead Ricks";
const ALIVE_RICK_KEY = "alive Ricks";
const DEAD_ACCOUNTS_KEY = "dead account";
let aliveRicks = [];
let deadRicks = [];
let currentAccount = {};
let deadAccounts = [];
let currentRick = {};
let monsterPower;
let monsterRank;

function playGame() {
  console.log("continue game");
  if (!!localStorage.getItem(DEAD_ACCOUNTS_KEY)) {
    deadAccounts = JSON.parse(localStorage?.getItem(DEAD_ACCOUNTS_KEY));
  }
  deadRicks = JSON.parse(localStorage?.getItem(DEAD_RICK_KEY));
  aliveRicks = JSON.parse(localStorage?.getItem(ALIVE_RICK_KEY));

  currentAccount = JSON.parse(localStorage.getItem("account"));
  pickRick();
  // setTimeout(pickRick(), 2000);
}

function newGame() {
  console.log("new game begin");
  currentAccount = JSON.parse(localStorage.getItem("account"));
  deadAccounts = JSON.parse(localStorage?.getItem(DEAD_ACCOUNTS_KEY));

  //  if (data.name.toLowerCase().includes("rick")) {
  //   newRick();
  // } else {
  //   picture.src = data.image;
  //   soldierName.innerText = `Rest In Peace "${data.name}"`;
  //   power.innerText = `POWER LEVEL: ${calculatePower(data)}`;
  //   dead.innerText = `STATUS: ${data.status}`;
  // }
}

function saveEverything() {
  localStorage.setItem(DEAD_RICK_KEY, JSON.stringify(deadRicks));
  localStorage.setItem(ALIVE_RICK_KEY, JSON.stringify(aliveRicks));
  localStorage.setItem(DEAD_ACCOUNTS_KEY, JSON.stringify(deadAccounts));
}

function onSubmit(event) {
  event.preventDefault();
  const rick = toKillInput.value;

  toKillInput.value = "";
  const rickData = {
    name: `Rick C-${rick}`,
    id: Date.now(),
  };
  avengers.push(rickData);
  addToKill(rickData);
  saveList();
}

function getRicks(event) {
  event.preventDefault();

  // const li = document.createElement("li");
  // li.id = rickData.id;
  // const span = document.createElement("span");
  // button.innerText = "X";
  // li.appendChild(span);

  // span.innerText = rickData.name;
  // toKillList.appendChild(li);
  // button.addEventListener("click", deleteToKill);
  //   locate.addEventListener("click", avengerLocation);
}

function userKilled() {
  console.log(deadAccounts, currentAccount);
  deadAccounts.unshift(currentAccount);
  console.log(deadAccounts, currentAccount);
  localStorage.removeItem("account");
  saveEverything();
  location.reload();
}

function powerUp() {
  document.querySelector(
    "#profileEl h2"
  ).innerText = `POWER LEVEL: ${calculatePower(currentAccount.power)}`;
}

function fightMonster() {
  console.log(currentAccount.rank, monsterRank);
  if (currentAccount.power <= monsterPower) {
    if (currentAccount.rank === monsterRank) {
      currentAccount.power = currentAccount.power - 0.5;
      console.log("5!!!!!!!!!!!!");
    } else {
      currentAccount.power = currentAccount.power - 0.1;
      console.log("1!!!!!!!!!!!!!");
    }
    console.log(currentAccount.power);
    createMonster();
    powerUp();
  } else {
    userKilled();
    alert("you are dead!");
  }
}

function fightRick() {
  if (currentAccount.power <= currentRick.power) {
    user.power = user.power - 1;
    deadRicks.push(currentRick);
    pickRick();
  } else {
    userKilled();
    alert("you are dead!");
  }
}

function rickKilled(event) {
  const li = event.target.parentElement;

  setTimeout(li.remove(), 2000);
  ricks = ricks.filter((rick) => rick.id !== parseInt(li.id));
  saveList();
}
function random() {
  const randomCharacter = Math.floor(Math.random() * 826);
  return randomCharacter;
}

function createMonster() {
  const id = random();
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "Dead") {
        createMonster();
      } else if (data.name.toLowerCase().includes("rick")) {
        createMonster();
      } else {
        // console.log(parseInt(data.episode[0].slice(-2).replaceAll("/", "")));
        monsterPower = episodeToNumber(data);
        monsterRank = calculatePower(monsterPower);
        console.log(monsterPower);
        picture.src = data.image;
        soldierName.innerText = `${data.name}(${data.status})`;
        power.innerText = `POWER LEVEL: ${monsterRank}`;
      }
    });
}
function pickRick() {
  const randomNumber = Math.floor(Math.random() * aliveRicks.length);
  // console.log(aliveRicks);
  currentRick = aliveRicks[randomNumber];
  currentRick.rickNumber = randomNumber;
  currentRick.power = Math.random() * 5;

  rickPicture.src = currentRick.image;
  rickName.innerText = `${currentRick.name}(${currentRick.status})`;
  rickPower.innerText = "POWER LEVEL: Rickillable";
}

createMonster();

fightMob.addEventListener("click", fightMonster);
runAway.addEventListener("click", createMonster);
killRick.addEventListener("click", fightRick);
