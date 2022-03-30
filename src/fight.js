// import { monsterPower } from "./rip.js";
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

const DEAD_BOSS_KEY = "dead boss";
const ALIVE_BOSS_KEY = "alive boss";
const DEAD_ACCOUNTS_KEY = "dead account";
let aliveBoss = [];
let deadBoss = [];
let currentAccount = {};
let deadAccounts = [];
let currentBoss = {};
let monsterPower;
let monsterRank;
let life;

function playGame() {
  console.log("continue game");
  if (!!localStorage.getItem(DEAD_ACCOUNTS_KEY)) {
    deadAccounts = JSON.parse(localStorage?.getItem(DEAD_ACCOUNTS_KEY));
  }
  const a = localStorage.getItem(DEAD_BOSS_KEY);
  deadBoss = a ? JSON.parse(a) : [];
  aliveBoss = JSON.parse(localStorage?.getItem(ALIVE_BOSS_KEY));
  life = localStorage.getItem("life");

  currentAccount = JSON.parse(localStorage.getItem("account"));
  pickRick();
  saveList();
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
  //   power.innerText = `POWER LEVEL: ${calculateRank(data)}`;
  //   dead.innerText = `STATUS: ${data.status}`;
  // }
}

function saveEverything() {
  localStorage.setItem("life", life);
  localStorage.setItem("password", password);
  localStorage.setItem(DEAD_BOSS_KEY, JSON.stringify(deadBoss));
  localStorage.setItem(ALIVE_BOSS_KEY, JSON.stringify(aliveBoss));
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
  life = life - 1;
  deadAccounts.unshift(currentAccount);
  localStorage.removeItem("account");
  ispassword = true;
  saveEverything();
  grantedEl.classList.add(CLASSNAME_HIDDEN);
  initialEl.classList.remove(CLASSNAME_HIDDEN);
  // scannedEl.children.foreach((item) => item.classList.remove(CLASSNAME_HIDDEN));
  init();
}

function updateUserPower() {
  document.querySelector(
    "#profileEl h2"
  ).innerText = `POWER LEVEL: ${calculateRank(currentAccount.power)}`;
}

function exp(item) {
  switch (item) {
    case "rickillable":
      return 1;
    case "A":
      return 0.5;
    case "B":
      return 0.2;
    case "C":
      return 0.1;
    case "trash":
      return 0.05;
  }
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
    updateUserPower();
  } else {
    userKilled();
  }
}

function fightRick() {
  if (currentAccount.power <= currentBoss.power) {
    currentAccount.power = currentAccount.power - 1;
    rickKilled();
    // pickRick();
  } else {
    userKilled();
  }
}

function rickKilled() {
  deadBoss.push(currentBoss);
  aliveBoss = aliveBoss.filter((boss) => boss.id !== currentBoss.id);
  currentBoss = aliveBoss[0];
  saveList();
  rickPicture.src = currentBoss.image;
  rickName.innerText = `${currentBoss.name}(${currentBoss.status})`;
  rickPower.innerText = "POWER LEVEL: Rickillable";
}

function random() {
  const randomCharacter = Math.floor(Math.random() * 826);
  return randomCharacter;
}

async function createMonster() {
  const id = random();
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "Dead") {
        createMonster();
      } else if (data.name.toLowerCase().includes("rick")) {
        createMonster();
      } else {
        // console.log(parseInt(data.episode[0].slice(-2).replaceAll("/", "")));
        monsterPower = calculatePower(data);
        monsterRank = calculateRank(monsterPower);
        console.log(monsterPower);
        picture.src = data.image;
        soldierName.innerText = `${data.name}(${data.status})`;
        power.innerText = `POWER LEVEL: ${monsterRank}`;
      }
    });
}
function pickRick() {
  const id = 3 - aliveBoss.length;
  // console.log(aliveBoss);
  currentBoss = aliveBoss[id];
  currentBoss.bossNumber = id;
  currentBoss.power = 5 - 2 * id;

  rickPicture.src = currentBoss.image;
  rickName.innerText = `${currentBoss.name}(${currentBoss.status})`;
  rickPower.innerText = "POWER LEVEL: Rickillable";
}

// function pickRick() {
//   const randomNumber = Math.floor(Math.random() * aliveBoss.length);
//   // console.log(aliveBoss);
//   currentBoss = aliveBoss[randomNumber];
//   currentBoss.rickNumber = randomNumber;
//   currentBoss.power = Math.random() * 5;

//   rickPicture.src = currentBoss.image;
//   rickName.innerText = `${currentBoss.name}(${currentBoss.status})`;
//   rickPower.innerText = "POWER LEVEL: Rickillable";
// }

createMonster();

fightMob.addEventListener("click", fightMonster);
runAway.addEventListener("click", createMonster);
killRick.addEventListener("click", fightRick);
