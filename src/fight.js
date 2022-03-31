// import { monsterPower } from "./rip.js";
const rickEl = document.querySelector("#kill-this-rick");
const rickFaceEl = rickEl.getElementsByTagName("img");
const rickNameEl = rickEl.getElementsByTagName("h2");
const challengersEl = rickEl.getElementsByTagName("li");
const fightMob = document.querySelector("#fightMob");
const runAway = document.querySelector("#runaway");
const deadSoldier = document.querySelector("#levelUp");
const picture = document.querySelector("#levelUp img");
const soldierName = document.querySelector("#monster-name");
const power = document.querySelector("#monster-power");
const rickPicture = document.querySelector("#kill-this-rick img");
const rickName = document.querySelector("#boss-name");
const rickPower = document.querySelector("#boss-power");
const killRick = document.querySelector("#challenge");
// const urDude = document.querySelector("#ur-dude");

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
  // saveList();
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
  //   power.innerText = `LEVEL: ${calculateRank(data)}`;
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
  const userImg = document.querySelector("#profileEl img");
  userImg.classList.add("invert");
  setTimeout(() => {
    userImg.classList.remove("invert");
    grantedEl.classList.add(CLASSNAME_HIDDEN);
    initialEl.classList.remove(CLASSNAME_HIDDEN);
  }, 1000);
  life = life - 1;
  deadAccounts.unshift(currentAccount);
  localStorage.removeItem("account");
  ispassword = true;
  saveEverything();
  // scannedEl.children.foreach((item) => item.classList.remove(CLASSNAME_HIDDEN));
  init();
}

function updateUserPower() {
  const rankBefore = document.querySelector("#profileEl h1");
  if (
    rankBefore.innerText !== `LEVEL: ${calculateRank(currentAccount.power)}`
  ) {
    document.querySelector("#levelUpp").classList.remove(CLASSNAME_HIDDEN);
    rankBefore.innerText = `LEVEL: ${calculateRank(currentAccount.power)}`;
    rankBefore.style.color = rankColor(currentAccount.power);
    urDude.classList.add(CLASSNAME_HIDDEN);
    setTimeout(() => {
      document.querySelector("#levelUpp").classList.add(CLASSNAME_HIDDEN);
      urDude.classList.remove(CLASSNAME_HIDDEN);
    }, 3000);
  } else {
    rankBefore.innerText = `LEVEL: ${calculateRank(currentAccount.power)}`;
    rankBefore.style.color = rankColor(currentAccount.power);
  }
}

function exp(item) {
  switch (item) {
    case "rickillable":
      return 1;
    case "A":
      return 0.3;
    case "B":
      return 0.2;
    case "C":
      return 0.1;
    case "garbage":
      return 0.05;
    case "Jerry":
      return 0.01;
  }
}

function fightMonster() {
  console.log(currentAccount.rank, monsterRank);
  if (currentAccount.power <= monsterPower) {
    // () => $(deadSoldier).css("-webkit-animation-name", "moveDown");
    picture.classList.add("invert");
    if (currentAccount.rank === monsterRank) {
      currentAccount.power = currentAccount.power - 0.5;
      document.querySelector("#doublexp").classList.remove(CLASSNAME_HIDDEN);
      urDude.classList.add(CLASSNAME_HIDDEN);
      setTimeout(() => {
        document.querySelector("#doublexp").classList.add(CLASSNAME_HIDDEN);
        urDude.classList.remove(CLASSNAME_HIDDEN);
      }, 3000);
    } else {
      currentAccount.power = currentAccount.power - 0.25;
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
    rickPicture.classList.add("invert");
    setTimeout(() => {
      rickPicture.classList.remove("invert");
    }, 3000);
    rickKilled();
    document.querySelector("#boss-killed").classList.remove(CLASSNAME_HIDDEN);
    urDude.classList.add(CLASSNAME_HIDDEN);
    setTimeout(() => {
      document.querySelector("#boss-killed").classList.add(CLASSNAME_HIDDEN);
      urDude.classList.remove(CLASSNAME_HIDDEN);
    }, 3000);
  } else {
    userKilled();
  }
}

function rickKilled() {
  deadBoss.push(currentBoss);
  aliveBoss = aliveBoss.filter((boss) => boss.id !== currentBoss.id);
  if (aliveBoss.length === 0) {
    localStorage.removeItem("account");
    ispassword = true;
    saveEverything();
    grantedEl.classList.add(CLASSNAME_HIDDEN);
    initialEl.classList.add(CLASSNAME_HIDDEN);
    // scannedEl.children.foreach((item) => item.classList.remove(CLASSNAME_HIDDEN));
    init();
  } else {
    setTimeout(() => {
      currentBoss = aliveBoss[0];
      rickPicture.src = currentBoss.image;
      rickName.innerText = `${currentBoss.name}(${currentBoss.status})`;
      rickPower.innerText = "LEVEL: Rickillable";
    }, 3000);
  }
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
        const color = rankColor(monsterPower);

        setTimeout(() => picture.classList.remove("invert"), 200);
        setTimeout(() => {
          console.log(monsterPower);
          picture.src = data.image;
          picture.disabled = true;
          soldierName.innerText = `${data.name}(${data.status})`;
          // soldierName.style.color = "red";
          power.innerText = `LEVEL: ${monsterRank}`;
          // power.classList.add(CLASSNAME_HIDDEN);
          // setTimeout(() => power.classList.remove(CLASSNAME_HIDDEN), 2000);
          power.classList.add(color);
          console.log(monsterPower);
        }, 500);
      }
    });
}
function pickRick() {
  let stat = 0;
  // console.log(aliveBoss);
  currentBoss = aliveBoss[0];
  currentBoss.bossNumber = stat;
  // currentBoss.power = 5 - 1.5 * stat;

  rickPicture.src = currentBoss.image;
  rickPicture.disabled = true;
  rickPicture.style.width = "35vw";
  rickPicture.style.maxWidth = "400px";
  rickName.innerText = `${currentBoss.name}(${currentBoss.status})`;
  rickPower.innerText = "LEVEL: Rickillable";
  rickPower.style.color = rankColor(1);
  stat = stat + 1;
  console.log(currentBoss.power);
}

// function pickRick() {
//   const randomNumber = Math.floor(Math.random() * aliveBoss.length);
//   // console.log(aliveBoss);
//   currentBoss = aliveBoss[randomNumber];
//   currentBoss.rickNumber = randomNumber;
//   currentBoss.power = Math.random() * 5;

//   rickPicture.src = currentBoss.image;
//   rickName.innerText = `${currentBoss.name}(${currentBoss.status})`;
//   rickPower.innerText = "LEVEL: Rickillable";
// }

createMonster();

fightMob.addEventListener("click", fightMonster);
runAway.addEventListener("click", createMonster);
killRick.addEventListener("click", fightRick);
