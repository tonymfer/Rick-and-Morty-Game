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
const newGameEl = document.querySelector("#new-game");
const modal = document.querySelector("#myModal");
const helpButton = document.querySelector("#help");
const closeButton = document.getElementsByClassName("close")[0];
title.classList.add("bigFont");

const gameOverVideo = document.querySelector("#gameover");
const gameWinVideo = document.querySelector("#gameWin");
const gameBackgroundVideo = document.querySelector("#game-background");
const bgMusic = new Howl({
  src: ["/img/timeisout.mp3"],
  autoplay: true,
  loop: true,
  volume: 1,
});
const gameoverMusic = new Audio("/img/lostalllife.mp3");
bgMusic.play();

const CLASSNAME_HIDDEN = "hidden";
let ispassword = !!localStorage.getItem("password");
let password;
let account = {};
let cards = [];
let cardId;

helpButton.onclick = function () {
  modal.style.display = "block";
};
closeButton.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function init() {
  const saved = !!localStorage.getItem("life");
  const dead = !localStorage.getItem("account");
  const paused = !dead;

  const win =
    !localStorage.getItem("alive boss") && !!localStorage.getItem("dead boss");
  if (!saved) {
    createEl.classList.remove(CLASSNAME_HIDDEN);
    newGameEl.classList.add(CLASSNAME_HIDDEN);
  }
  if (saved) {
    // container.classList.add("greenPortal");
    life = parseInt(localStorage.getItem("life"));
    if (dead) {
      if (win) {
        title.innerHTML = "YOU SAVED CITADEL";
        helpButton.classList.add(CLASSNAME_HIDDEN);
        newGameEl.classList.add(CLASSNAME_HIDDEN);
        setTimeout(() => {
          title.classList.remove(CLASSNAME_HIDDEN);
        }, 6000);
        setTimeout(() => {
          newGameEl.classList.remove(CLASSNAME_HIDDEN);
        }, 9000);
        initialEl.classList.remove(CLASSNAME_HIDDEN);
        gameBackgroundVideo.classList.add(CLASSNAME_HIDDEN);
        gameBackgroundVideo.pause();
        gameWinVideo.play();
        gameoverMusic.play();
        localStorage.clear();
        gameOverVideo.classList.remove(CLASSNAME_HIDDEN);
      } else if (life === 0) {
        helpButton.classList.add(CLASSNAME_HIDDEN);
        newGameEl.classList.add(CLASSNAME_HIDDEN);
        setTimeout(() => {
          title.classList.remove(CLASSNAME_HIDDEN);
        }, 6000);
        setTimeout(() => {
          newGameEl.classList.remove(CLASSNAME_HIDDEN);
        }, 9000);
        title.innerHTML = "GAMEOVER";
        initialEl.classList.remove(CLASSNAME_HIDDEN);
        gameBackgroundVideo.classList.add(CLASSNAME_HIDDEN);
        gameBackgroundVideo.pause();
        gameOverVideo.play();
        gameoverMusic.play();
        localStorage.clear();
        gameOverVideo.classList.remove(CLASSNAME_HIDDEN);

        // container.classList.remove("citadelSaved");
        // container.classList.add("citadelBoom");
      } else {
        title.classList.remove(CLASSNAME_HIDDEN);
        const children = [].slice.call(scannedEl.children);
        children.forEach((element) =>
          element.classList.remove(CLASSNAME_HIDDEN)
        );

        title.innerText = `LIFE : ${localStorage.getItem("life")}`;
        initialEl.classList.remove(CLASSNAME_HIDDEN);
        createEl.classList.add(CLASSNAME_HIDDEN);
        console.log(cards);
      }
    }
    if (paused) {
      title.innerHTML = "CONTINUE?";
      formEl.classList.remove(CLASSNAME_HIDDEN);
      password = localStorage.getItem("password");
      account = JSON.parse(localStorage.getItem("account"));
    }
  }
}

async function fetchRicks() {
  const url = `https://rickandmortyapi.com/api/character/[74,119,118]`;
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const boss = [];
      boss.push(data[0]);
      boss.push(data[2]);
      boss.push(data[1]);
      boss[0].power = 4;
      boss[1].power = 1;
      boss[2].power = -10;
      console.log(boss);
      localStorage.setItem("alive boss", JSON.stringify(boss));
    });
}

async function fetchCards() {
  const numberOfCharacters = 826;
  // const booleanCard = !!cards.legnt
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
  console.log(cards);
  cardId = parseInt(event.path[1].id);
  account = cards.find((element) => {
    if (element.name === event.path[1].querySelector("h3").innerText) {
      return element;
    }
  });
  console.log("check", account.name);
  account.power = calculatePower(account);
  account.rank = calculateRank(calculatePower(account));
  const rankEl = document.createElement("h2");
  rankEl.innerText = `POWER LEVEL: ${account.rank}`;
  rankEl.style.color = rankColor(account.power);
  card.insertBefore(rankEl, card.querySelector("h3"));
  title.innerText = `LIFE : ${
    !!localStorage.getItem("life") ? localStorage.getItem("life") : 3
  }`;
  card.classList.add(CLASSNAME_HIDDEN);
  // localStorage.setItem("cards", JSON.stringify(cards));
  var children = [].slice.call(scannedEl.children);
  children.forEach((element) => element.classList.toggle(CLASSNAME_HIDDEN));

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
    newGameEl.classList.add(CLASSNAME_HIDDEN);
    helpButton.classList.add(CLASSNAME_HIDDEN);
    bgMusic.pause();
    gameBackgroundVideo.play();
    container.classList.add("enterGreen");
    scanContainer.removeChild(button);
    if (!ispassword) {
      scanContainer.removeChild(input);
    }
    localStorage.setItem("password", input.value);
    scannedEl.removeChild(card);
    title.classList.add(CLASSNAME_HIDDEN);
    setTimeout(() => {
      container.classList.remove("enterGreen");
      container.classList.remove("greenPortal");
      gameBackgroundVideo.classList.remove(CLASSNAME_HIDDEN);
      // container.classList.add("citadelSaved");
      initialEl.classList.remove("mainAlign");
      initialEl.classList.add(CLASSNAME_HIDDEN);
      grantedEl.classList.remove(CLASSNAME_HIDDEN);
    }, 1500);
    playGame();
    if (minute === "03") {
      timeBomb();
    }
    createProfile(account);
    // navigator.geolocation.getCurrentPosition(window.myLocation, onGeoError);
    cards = cards.filter((card) => card.name !== account.name);
  });
}

function checkAccount(event) {
  event.preventDefault();
  const input = pwEl.value;
  // if (true) {
  if (input === password) {
    container.classList.remove("greenPortal");
    gameBackgroundVideo.play();
    initialEl.classList.add(CLASSNAME_HIDDEN);
    scannedEl.classList.add(CLASSNAME_HIDDEN);
    grantedEl.classList.remove(CLASSNAME_HIDDEN);
    playGame();
    createProfile(account);
    // console.log(account);
    // navigator.geolocation.getCurrentPosition(window.myLocation, onGeoError);
  } else {
    alert("NICE TRY EVIL MORTY, I AM WATCHING YOU");
  }
}

function createAccount() {
  localStorage.setItem("life", 3);
  localStorage.setItem("remainingRick", 3);
  createEl.classList.add(CLASSNAME_HIDDEN);
  scanningEl.classList.remove(CLASSNAME_HIDDEN);
  if (cards.length === 0) {
    fetchCards();
  } else {
    for (let i = 0; i < cards.length; i++) {
      const item = document.getElementById(i.toString());
      console.log("hide this", item);
      item.classList.remove(CLASSNAME_HIDDEN);
    }
  }
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
  while (profileEl.firstChild) {
    profileEl.removeChild(profileEl.firstChild);
  }
  const power = calculatePower(data);
  const img = document.createElement("img");
  img.src = data.image;
  const h3 = document.createElement("h3");
  h3.innerText = `${data.name}`;
  const rank = document.createElement("h2");
  rank.innerText = `POWER LEVEL: ${calculateRank(power)}`;
  rank.style.color = rankColor(power);
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

function restartGame() {
  localStorage.clear();
  location.reload();
}

createEl.addEventListener("click", createAccount);
formEl.addEventListener("submit", checkAccount);
newGameEl.addEventListener("click", restartGame);
init();
