const formEl = document.querySelector("#login");
const killEl = document.querySelector("#tokill-form");
const scanningEl = document.querySelector("#scanning");
const pwEl = document.querySelector("#pw");
const profileEl = document.querySelector("#profileEl");
const createEl = document.querySelector("#create-account");
const initialEl = document.querySelector("#initial");
const grantedEl = document.querySelector("#access-granted");
const scannedEl = document.querySelector("#scanned");
const scanContainer = document.querySelector("#cards-container");
const cardEl = scannedEl.querySelector("div");
// const card2 = scannedEl.querySelector("#card2");
// const card3 = scannedEl.querySelector("#card3");
// const card4 = scannedEl.querySelector("#card4");
// const card5 = scannedEl.querySelector("#card5");
const body = document.querySelector("body");
const container = document.querySelector("#container");
const title = initialEl.querySelector("h1");

const CLASSNAME_HIDDEN = "hidden";
const haveAcc = !!localStorage.getItem("life");
const ispassword = !!localStorage.getItem("password");
let password;
let account = {};
let cards = [];

async function fetchRicks() {
  const url = `https://rickandmortyapi.com/api/character/[74,119,118]`;
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const boss = [];
      boss.push(data[0]);
      boss.push(data[2]);
      boss.push(data[1]);
      localStorage.setItem("boss", JSON.stringify(boss));
    });
}

async function fetchCards() {
  const numberOfCharacters = 826;
  let num = Math.floor(Math.random() * numberOfCharacters);
  title.innerText = "PICK YOUR DUDE";

  const url = `https://rickandmortyapi.com/api/character/${num}`;
  if (cards.length < 5) {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.name.toLowerCase().includes("rick")) {
          const div = document.createElement("div");
          div.id = cards.length;
          cards.push(data);

          const img = document.createElement("img");
          const h3 = document.createElement("h3");

          img.src = data.image;
          img.classList.add("blur");
          img.addEventListener("click", pickCard);

          h3.innerText = `${data.name}`;
          h3.classList.add(CLASSNAME_HIDDEN);

          div.appendChild(img);
          div.appendChild(h3);
          scannedEl.appendChild(div);
        }
      })
      .then(() => fetchCards());
  }

  if (cards.length == 5) {
    scanningEl.classList.add(CLASSNAME_HIDDEN);
    scannedEl.classList.remove(CLASSNAME_HIDDEN);
  }
}

function pickCard(event) {
  const card = event.path[1];
  const cardId = parseInt(event.path[1].id);
  account = cards[cardId];
  account.power = calculatePower(cards[cardId]);
  account.rank = calculateRank(calculatePower(cards[cardId]));
  const rankEl = document.createElement("h2");
  rankEl.innerText = account.rank;
  rankEl.style.color = rankColor(account.power);
  card.insertBefore(rankEl, card.querySelector("h3"));
  title.innerText = `REMAINING CHANCE : ${
    !!localStorage.getItem("life") ? localStorage.getItem("life") : 3
  }`;

  for (let i = 0; i < 5; i++) {
    if (i === cardId) {
      cards.splice(i, 1);
    } else {
      const item = document.getElementById(i.toString());
      console.log("hide this", item);
      item.classList.add(CLASSNAME_HIDDEN);
    }
  }
  console.log(card);
  const name = card.querySelector("h3");
  const cardRank = card.querySelector("h2");
  const image = card.querySelector("img");

  name.classList.remove(CLASSNAME_HIDDEN);
  cardRank.classList.remove(CLASSNAME_HIDDEN);
  image.classList.remove("blur");
  const button = document.createElement("button");
  const input = document.createElement("input");
  input.placeholder = "enter your screte code";
  if (!ispassword) {
    scanContainer.appendChild(input);
  }
  scanContainer.appendChild(button);
  button.innerText = "GO";
  button.addEventListener("click", () => {
    localStorage.setItem("account", JSON.stringify(account));
    console.log(account);
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
}

function init() {
  const haveDude = !!localStorage.getItem("account");
  const life = parseInt(localStorage?.getItem("life"));
  if (!haveDude) {
    createEl.classList.remove(CLASSNAME_HIDDEN);
  }
  if (haveDude) {
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
    alert("NICE TRY EVIL MORTY, I AM WATCHING YOU");
  }
}

function createAccount() {
  createEl.classList.add(CLASSNAME_HIDDEN);
  scanningEl.classList.remove(CLASSNAME_HIDDEN);
  fetchCards();
  fetchRicks();

  // if (data.status !== "Alive" && data.status !== "unknown") {
  //   randomCharacter();
  // } else if (data.name.toLowerCase().includes("rick")) {
  //   randomCharacter();
  // } else {
  //   scanningEl.classList.add(CLASSNAME_HIDDEN);
  //   account = data;
  //   account.power = calculatePower(data);
  //   account.rank = calculateRank(calculatePower(data));
  //   console.log(account);
  //   img.src = data.image;
  //   h3.innerText = `WELCOME ${data.name}`;
  //   scannedEl.appendChild(img);
  //   scannedEl.appendChild(h3);
  //   if (!ispassword) {
  //     scannedEl.appendChild(input);
  //   }
  //   scannedEl.appendChild(button);
  //   scannedEl.classList.remove(CLASSNAME_HIDDEN);
  // }
}

function calculatePower(item) {
  return parseInt(item.episode[0].slice(-2).replaceAll("/", ""));
}

function rankColor(item) {
  if (item <= 5) {
    return "red";
  } else if (item <= 10) {
    return "yellow";
  } else if (item <= 20) {
    return "blue";
  } else if (item <= 30) {
    return "";
  } else if (item <= 40) {
    return "brown";
  } else {
    return "green";
  }
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
    return "garbage";
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

createEl.addEventListener("click", createAccount);
formEl.addEventListener("submit", checkAccount);
init();
