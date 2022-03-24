const toKillForm = document.getElementById("tokill-form");
const toKillList = document.getElementById("tokill-list");
const toKillInput = toKillForm.querySelector("input");
const rickEl = document.querySelector("#kill-this-rick");
const rickNameEl = rickEl.querySelector("h2");
const challengersEl = rickEl.querySelector("li");

const DEAD_RICK_KEY = "dead Ricks";
const ALIVE_RICK_KEY = "alive Ricks";
let aliveRicks = [];
let deadRicks = [];
let rickKillers = [];

function init() {
  const firstTime = !!localStorage.getItem("account");

  if (firstTime) {
    newAccount();
  } else {
    const parsedRick = JSON.parse(savedRicks);
    parsedRick.forEach(addToKill);
    deadRicks = localStorage?.getItem(DEAD_RICK_KEY);
    aliveRicks = localStorage?.getItem(ALIVE_RICK_KEY);
  }
}

function saveList() {
  localStorage.setItem(DEAD_RICK_KEY, JSON.stringify(deadRicks));
  localStorage.setItem(ALIVE_RICK_KEY, JSON.stringify(aliveRicks));
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
function newAccount() {
  const oneRick = aliveRicks[Math.floor(Math.random() * aliveRicks.length)];

  const ricksUrl = `https://rickandmortyapi.com/api/character/?name=rick&status=alive`;
  fetch(ricksUrl)
    .then((response) => response.json())
    .then((data) => {
      aliveRicks = data.results;
    });

  const rickKillersUrl = `https://rickandmortyapi.com/api/character/?status=alive`;
  fetch(rickKillersUrl)
    .then((response) => response.json())
    .then((data) => {
      rickKillers = data.results;
      console.log(rickKillers);
    });
  //  if (data.name.toLowerCase().includes("rick")) {
  //   newRick();
  // } else {
  //   picture.src = data.image;
  //   soldierName.innerText = `Rest In Peace "${data.name}"`;
  //   power.innerText = `POWER LEVEL: ${calculatePower(data)}`;
  //   dead.innerText = `STATUS: ${data.status}`;
  // }
}

function rickKilled(event) {
  const li = event.target.parentElement;

  setTimeout(li.remove(), 2000);
  ricks = ricks.filter((rick) => rick.id !== parseInt(li.id));
  saveList();
}

toKillForm.addEventListener("submit", newAccount);
