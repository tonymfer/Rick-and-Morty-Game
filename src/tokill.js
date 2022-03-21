const toKillForm = document.getElementById("tokill-form");
const toKillList = document.getElementById("tokill-list");
const toKillInput = toKillForm.querySelector("input");

const RICK_KEY = "Ricks";
let ricks = [];

function init() {
  const savedRicks = localStorage.getItem(RICK_KEY);

  if (savedRicks !== null) {
    const parsedRick = JSON.parse(savedRicks);
    parsedRick.forEach(addToKill);
  }
}

init();

function saveList() {
  localStorage.setItem(RICK_KEY, JSON.stringify(ricks));
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

function addToKill(rickData) {
  const li = document.createElement("li");
  li.id = rickData.id;
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerText = "X";
  li.appendChild(span);
  li.appendChild(button);

  span.innerText = rickData.name;
  toKillList.appendChild(li);
  button.addEventListener("click", deleteToKill);
  //   locate.addEventListener("click", avengerLocation);
}

function deleteToKill(event) {
  const li = event.target.parentElement;
  li.remove();
  ricks = ricks.filter((rick) => rick.id !== parseInt(li.id));
  saveList();
}

toKillForm.addEventListener("submit", onSubmit);
