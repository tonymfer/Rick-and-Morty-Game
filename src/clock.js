const clockTitle = document.querySelector(".js-clock");

function tillXmas() {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const second = new Date().getSeconds();

  clockTitle.innerText = `CURRENT TIME ${hour}: ${minute}: ${second}`;
}

tillXmas();
setInterval(tillXmas, 1000);
