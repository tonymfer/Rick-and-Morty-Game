const formEl = document.querySelector("#login");
const killEl = document.querySelector("#tokill-form");
const scanningEl = document.querySelector("#scanning");
const pwEl = document.querySelector("#pw");
const welcomeEl = document.querySelector("#welcome");
const createEl = document.querySelector("#create-account");
const initialEl = document.querySelector("#initial");
const grantedEl = document.querySelector("#access-granted");
const scannedEl = document.querySelector("#scanned");
const body = document.querySelector("body");

const CLASSNAME_HIDDEN = "hidden";
let account = {};

function randomCharacter(event) {
  createEl.classList.add(CLASSNAME_HIDDEN);
  scanningEl.classList.remove(CLASSNAME_HIDDEN);

  const numberOfCharacters = 493;
  const randomNumber = Math.floor(Math.random() * numberOfCharacters);
  createAccount(randomNumber);
}

function init() {
  const url = `https://rickandmortyapi.coms/api/character`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  const isSaved = !!localStorage.getItem("account");
  if (!isSaved) {
    createEl.classList.remove(CLASSNAME_HIDDEN);
  }
  if (isSaved) {
    pwEl.classList.remove(CLASSNAME_HIDDEN);
    account = JSON.parse(localStorage.getItem("account"));
  }
}

function checkAccount(event) {
  event.preventDefault();
  const input = pwEl.value;

  if (input === account.password) {
    initialEl.classList.add(CLASSNAME_HIDDEN);
    grantedEl.classList.remove(CLASSNAME_HIDDEN);
  } else {
    alert("NICE TRY RICK, I AM ALWAYS ABOVE YOU");
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
    scannedEl.classList.add(CLASSNAME_HIDDEN);
    grantedEl.classList.remove(CLASSNAME_HIDDEN);
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(account);

      if (data.status !== "Alive" && data.status !== "unknown") {
        randomCharacter();
      } else if (data.name.toLowerCase().includes("rick")) {
        randomCharacter();
      } else {
        scanningEl.classList.add(CLASSNAME_HIDDEN);
        account = data;
        img.src = data.image;
        h3.innerText = `WELCOME ${data.name}`;
        scannedEl.appendChild(img);
        scannedEl.appendChild(h3);
        scannedEl.appendChild(input);
        scannedEl.appendChild(button);
        scannedEl.classList.remove(CLASSNAME_HIDDEN);
        console.log(account);
      }
    });
  // if (name) {
  //   formEl.classList.add(CLASSNAME_HIDDEN);
  //   localStorage.setItem(`${name}`, JSON.stringify(account));
  //   paintWelcome(name);
  //   initialEl.classList.add(CLASSNAME_HIDDEN);
  //   grantedEl.classList.remove(CLASSNAME_HIDDEN);
  // } else {
  //   alert("enter ID");
  // }
}

function paintWelcome(username) {
  welcomeEl.innerText = `WELCOME ${username.toUpperCase()}`;
  welcomeEl.classList.remove(CLASSNAME_HIDDEN);
}

createEl.addEventListener("click", randomCharacter);
formEl.addEventListener("submit", checkAccount);
init();
