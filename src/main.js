const formEl = document.querySelector("#login");
const killEl = document.querySelector("#tokill-form");
const scanningEl = document.querySelector("#scanning");
const pwEl = document.querySelector("#pw");
const profileEl = document.querySelector("#profileEl");
const createEl = document.querySelector("#create-account");
const initialEl = document.querySelector("#initial");
const grantedEl = document.querySelector("#access-granted");
const scannedEl = document.querySelector("#scanned");
const body = document.querySelector("body");
const container = document.querySelector("#container");

const CLASSNAME_HIDDEN = "hidden";
let account = {};

function randomCharacter(event) {
  createEl.classList.add(CLASSNAME_HIDDEN);
  scanningEl.classList.remove(CLASSNAME_HIDDEN);

  const numberOfCharacters = 826;
  const numberOfPages = 42;
  const randomNumber = Math.floor(Math.random() * numberOfCharacters);
  const randomPage = Math.floor(Math.random() * numberOfPages);
  createAccount(randomNumber);
}

function init() {
  // const url = `https://rickandmortyapi.com/api/episode/51`;
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
  const isSaved = !!localStorage.getItem("account");
  if (!isSaved) {
    createEl.classList.remove(CLASSNAME_HIDDEN);
  }
  if (isSaved) {
    pwEl.classList.remove(CLASSNAME_HIDDEN);
    account = JSON.parse(localStorage.getItem("account"));
    // checkAccount();
  }
}

function checkAccount(event) {
  event.preventDefault();
  const input = pwEl.value;
  // if (true) {
  if (input === account.password) {
    container.classList.remove("greenPortal");
    initialEl.classList.add(CLASSNAME_HIDDEN);
    grantedEl.classList.remove(CLASSNAME_HIDDEN);
    playGame();
    createProfile(account);
    // console.log(account);
    navigator.geolocation.getCurrentPosition(window.myLocation, onGeoError);
  } else {
    alert("NICE TRY RICK, I AM WATCHING YOU");
  }
}

function createAccount(id) {
  const url = `https://rickandmortyapi.com/api/character/${id}`;

  const input = document.createElement("input");
  input.placeholder = "enter your screte code";
  const img = document.createElement("img");
  const h3 = document.createElement("h3");
  const button = document.createElement("button");
  button.innerText = "SUBMIT";
  button.addEventListener("click", () => {
    account.password = input.value;
    localStorage.setItem("account", JSON.stringify(account));
    container.classList.remove("greenPortal");
    initialEl.classList.add(CLASSNAME_HIDDEN);
    grantedEl.classList.remove(CLASSNAME_HIDDEN);
    playGame();
    createProfile(account);
  });
  const ricksUrl = `https://rickandmortyapi.com/api/character/?name=rick&status=alive`;
  fetch(ricksUrl)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("alive Ricks", JSON.stringify(data.results));
    });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data.status !== "Alive" && data.status !== "unknown") {
        randomCharacter();
      } else if (data.name.toLowerCase().includes("rick")) {
        randomCharacter();
      } else {
        scanningEl.classList.add(CLASSNAME_HIDDEN);
        account = data;
        account.power = episodeToNumber(data);
        account.rank = calculatePower(episodeToNumber(data));
        console.log(account);
        img.src = data.image;
        h3.innerText = `WELCOME ${data.name}`;
        scannedEl.appendChild(img);
        scannedEl.appendChild(h3);
        scannedEl.appendChild(input);
        scannedEl.appendChild(button);
        scannedEl.classList.remove(CLASSNAME_HIDDEN);
      }
    });
}

function episodeToNumber(item) {
  return parseInt(item.episode[0].slice(-2).replaceAll("/", ""));
}
function calculatePower(item) {
  if (item <= 5) {
    return "Rickillable";
  } else if (item <= 10) {
    return "A";
  } else if (item <= 20) {
    return "B";
  } else if (item <= 30) {
    return "C";
  } else if (item <= 40) {
    return "GARBAGE";
  } else {
    return "Jerry";
  }
}

function createProfile(data) {
  const epiNum = episodeToNumber(data);
  const img = document.createElement("img");
  img.src = data.image;
  const h3 = document.createElement("h3");
  h3.innerText = `${data.name}`;
  const rank = document.createElement("h2");
  rank.innerText = `POWER LEVEL: ${calculatePower(epiNum)}`;
  const gender = document.createElement("p");
  gender.innerText = `GENDER: ${data.gender}`;
  const species = document.createElement("p");
  species.innerText = `SPECIES: ${data.species}`;
  const status = document.createElement("p");
  status.innerText = `STATUS: ${data.status}`;
  const homeAddress = document.createElement("p");
  homeAddress.innerText = `HOME: ${data.location.name}`;
  profileEl.append(img, h3, rank, gender, species, status, homeAddress);
  profileEl.classList.remove(CLASSNAME_HIDDEN);
}

createEl.addEventListener("click", randomCharacter);
formEl.addEventListener("submit", checkAccount);
init();
