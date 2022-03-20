const bodyEl = document.querySelector("body");

const colors = [
  "#ef5777",
  "#575fcf",
  "#4bcffa",
  "#34e7e4",
  "#0be881",
  "#f53b57",
  "#3c40c6",
  "#0fbcf9",
  "#00d8d6",
  "#05c46b",
  "#ffc048",
  "#ffdd59",
  "#ff5e57",
  "#d2dae2",
  "#485460",
  "#ffa801",
  "#ffd32a",
  "#ff3f34",
];

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const giveMeColor = () => {
  const colorOne = randomColor();
  const colorTwo = randomColor();
  const degree = Math.random() * 90;
  bodyEl.style.background = `linear-gradient(${degree}deg, ${colorOne}, ${colorTwo})`;
};

// buttonEl.addEventListener("click", giveMeColor);

setInterval(giveMeColor, 1000);
