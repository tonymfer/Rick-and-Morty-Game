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
const title = initialEl.querySelector("h1");

const CLASSNAME_HIDDEN = "hidden";
const haveAcc = !!localStorage.getItem("life");
const ispassword = !!localStorage.getItem("password");
let password;
let account = {};

function randomCharacter(event) {
  title.innerText = `REMAINING CHANCE : ${
    !!localStorage.getItem("life") ? localStorage.getItem("life") : 5
  }`;
  createEl.classList.add(CLASSNAME_HIDDEN);
  scanningEl.classList.remove(CLASSNAME_HIDDEN);

  const numberOfCharacters = 826;
  const numberOfPages = 42;
  const randomNumber = Math.floor(Math.random() * numberOfCharacters);
  const randomPage = Math.floor(Math.random() * numberOfPages);
  createAccount(randomNumber);
}

function init() {
  const haveDude = !!localStorage.getItem("account");
  const life = parseInt(localStorage?.getItem("life"));
  if (!haveAcc) {
    createEl.classList.remove(CLASSNAME_HIDDEN);
  }
  if (haveAcc) {
    if (life === 0) {
      title.innerHTML = "GAMEOVER";
      localStorage.clear();
    } else if (!haveDude) {
      title.innerHTML = "CONTINUE?";
      createEl.innerText = "GET A NEW DUDE";
      createEl.classList.remove(CLASSNAME_HIDDEN);
    } else {
      title.innerHTML = "CONTINUE?";
      formEl.classList.remove(CLASSNAME_HIDDEN);
      password = localStorage.getItem("password");
      account = JSON.parse(localStorage.getItem("account"));
    }
  }
}

function checkAccount(event) {
  event.preventDefault();
  const input = pwEl.value;
  // if (true) {
  if (input === password) {
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
  button.innerText = "GO";
  button.addEventListener("click", () => {
    localStorage.setItem("account", JSON.stringify(account));
    if (!haveAcc) {
      localStorage.setItem("life", 5);
    }
    localStorage.setItem("remainingRick", 5);
    if (!password) {
      localStorage.setItem("password", input.value);
    }
    container.classList.remove("greenPortal");
    initialEl.classList.remove("mainAlign");
    initialEl.classList.add(CLASSNAME_HIDDEN);
    grantedEl.classList.remove(CLASSNAME_HIDDEN);
    playGame();
    createProfile(account);
    navigator.geolocation.getCurrentPosition(window.myLocation, onGeoError);
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
        account.power = calculatePower(data);
        account.rank = calculateRank(calculatePower(data));
        console.log(account);
        img.src = data.image;
        h3.innerText = `WELCOME ${data.name}`;
        scannedEl.appendChild(img);
        scannedEl.appendChild(h3);
        if (!ispassword) {
          scannedEl.appendChild(input);
        }
        scannedEl.appendChild(button);
        scannedEl.classList.remove(CLASSNAME_HIDDEN);
      }
    });
}

function calculatePower(item) {
  return parseInt(item.episode[0].slice(-2).replaceAll("/", ""));
}

function calculateRank(item) {
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
  const power = calculatePower(data);
  const img = document.createElement("img");
  img.src = data.image;
  const h3 = document.createElement("h3");
  h3.innerText = `${data.name}`;
  const rank = document.createElement("h2");
  rank.innerText = `POWER LEVEL: ${calculateRank(power)}`;
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
