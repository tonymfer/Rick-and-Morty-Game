const weather = document.querySelector("#weather span");
const realMap = document.querySelector("#weather a");
const rickLoc = document.querySelector("#locate-rick a");
const rickWed = document.querySelector("#locate-rick span");
// document.querySelector("#find-me").addEventListener("click", geoFindMe);
const API_KEY = "08644542a25b99b81b333944503b43ab";

function myLocation(position, event) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      realMap.href = `https://www.openstreetmap.org/#map=18/${lat}/${lon}`;
      realMap.innerText = ` Latitude: ${lat} °, Longitude: ${lon} °`;
      weather.innerText = `CITY: ${data.name} WEATHER: ${data.weather[0].main}/ ${data.main.temp} °C`;
    });
}
function plusMinus(item) {
  const number = Math.random() * 2;
  if (number > 1) {
    return Math.random() * item;
  } else {
    return Math.random() * -item;
  }
}

function rickLocation(event) {
  console.log(event);
  const lat = plusMinus(90);
  const lon = plusMinus(180);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      rickLoc.href = `https://www.openstreetmap.org/#map=18/${lat}/${lon}`;
      rickLoc.innerText = `Latitude: ${lat} °, Longitude: ${lon} °`;
      rickWed.innerText = `WEATHER: ${data.weather[0].main}/ ${data.main.temp} °C`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

// navigator.geolocation.getCurrentPosition(myLocation, onGeoError);
