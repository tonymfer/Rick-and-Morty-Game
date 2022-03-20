const toKillForm = document.getElementById("tokill-form");
const toKillList = document.getElementById("tokill-list");
const toKillInput = toKillForm.querySelector("input");

const AVENGERS_KEY = "avengers";
let avengers = [];

function saveList() {
  localStorage.setItem(AVENGERS_KEY, JSON.stringify(avengers));
}

// function checkDuplication(avenger) {
//   console.log(
//     avengers.filter((item) => item.name.toLowerCase().includes(avenger))[0].name
//   );
//   if (
//     undefined ===
//     avengers.filter((item) => item.name.toLowerCase().includes(avenger)).name
//   ) {
//     return true;
//   } else {
//     false;
//   }
// }

function onSubmit(event) {
  event.preventDefault();
  const avenger = toKillInput.value;

  toKillInput.value = "";
  const avengerObj = {
    name: avenger,
    id: Date.now(),
  };
  avengers.push(avengerObj);
  addToKill(avengerObj);
  saveList();
}

function addToKill(avenger) {
  const li = document.createElement("li");
  li.id = avenger.id;
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerText = "X";
  li.appendChild(span);
  li.appendChild(button);

  span.innerText = avenger.name;
  toKillList.appendChild(li);
  button.addEventListener("click", deleteToKill);
  //   locate.addEventListener("click", avengerLocation);
}

function deleteToKill(event) {
  const li = event.target.parentElement;
  li.remove();
  avengers = avengers.filter((avenger) => avenger.id !== parseInt(li.id));
  saveList();
}

const savedAvengers = localStorage.getItem(AVENGERS_KEY);

if (savedAvengers !== null) {
  const parsedAvengers = JSON.parse(savedAvengers);
  parsedAvengers.forEach(addToKill);
}

toKillForm.addEventListener("submit", onSubmit);
