const deadAccList = document.querySelector("#dead-characters");
const deadRickList = document.querySelector("#dead-ricks");

function saveList() {
  deadAccounts?.forEach((element) => makeList(element, deadAccList));
  deadBoss?.forEach((element) => makeList(element, deadRickList));
}

function makeList(item, listType) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = item.name;
  li.appendChild(span);

  listType.appendChild(li);
}
