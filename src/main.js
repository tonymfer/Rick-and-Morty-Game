const formEl = document.querySelector("#login");
const killEl = document.querySelector("#tokill-form");
const idEl = document.querySelector("#id");
const pwEl = document.querySelector("#pw");
const welcomeEl = document.querySelector("#welcome");
const createEl = document.querySelector("#create-account");
const initialEl = document.querySelector("#initial");
const grantedEl = document.querySelector("#access-granted");

// inputEl.addEventListener("input", inputChange);
const CLASSNAME_HIDDEN = "hidden";

function checkAccount(event) {
  event.preventDefault();
  const name = idEl.value;
  const password = pwEl.value;
  const savedId = JSON.parse(localStorage.getItem(name));
  const isSaved = !!localStorage.getItem(name);
  if (!isSaved) {
    alert(
      "ARE U A MEMBER OF SHIELD?\nif not, please create an account and join HYDRA :)"
    );
  }
  if (isSaved) {
    if (password === savedId.password) {
      paintWelcome(name);
      initialEl.classList.add(CLASSNAME_HIDDEN);
      grantedEl.classList.remove(CLASSNAME_HIDDEN);
    } else {
      alert("INCORRECT PASSWORD");
    }
  }
}

function createAccount(event) {
  event.preventDefault();
  const name = idEl.value;
  if (name) {
    formEl.classList.add(CLASSNAME_HIDDEN);
    const account = {
      password: pwEl.value,
      id: Date.now(),
    };
    localStorage.setItem(`${name}`, JSON.stringify(account));
    paintWelcome(name);
    initialEl.classList.add(CLASSNAME_HIDDEN);
    grantedEl.classList.remove(CLASSNAME_HIDDEN);
  } else {
    alert("enter ID");
  }
}

function paintWelcome(username) {
  welcomeEl.innerText = `WELCOME ${username.toUpperCase()} HAIL HYDRA`;
  welcomeEl.classList.remove(CLASSNAME_HIDDEN);
}

createEl.addEventListener("click", createAccount);
formEl.addEventListener("submit", checkAccount);

console.log(savedId);

//
