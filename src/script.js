let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(current) {
  let nowday = days[current.getDay()];
  let nowhour = current.getHours();
  let nowminute = ("0" + current.getMinutes()).slice(-2);
  let currentTime = document.querySelector("#currentDay");
  currentTime.innerHTML = `${nowday} ${nowhour}:${nowminute}`;
}
formatDate(new Date());

function convertDegreeF(event) {
  event.preventDefault();
  let changeDegree = document.querySelector("#currentTemp");
  let fdegree = changeDegree.innerHTML;
  fdegree = Number(fdegree);
  changeDegree.innerHTML = Math.round((fdegree * 9) / 5 + 32);
}
let degreeF = document.querySelector("#degree-F");
degreeF.addEventListener("click", convertDegreeF);

function convertDegreeC(event) {
  event.preventDefault();
  let changeDegreeC = document.querySelector("#currentTemp");
  let cdegree = changeDegreeC.innerHTML;
  cdegree = Number(cdegree);
  changeDegreeC.innerHTML = Math.round(((cdegree - 32) * 5) / 9);
}
let degreeC = document.querySelector("#degree-C");
degreeC.addEventListener("click", convertDegreeC);

function showData(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${temperature}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = `Wind speed: ${wind} km/h`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let weatherElement = document.querySelector("#weather-description");
  weatherElement.innerHTML = `${response.data.weather[0].description}`;
}
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = `${cityInput.value}`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city}`;
  let apiKey = "bc3f2145fd14d46824982be4e0451c8d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

let searchingForm = document.querySelector("#searching-form");
searchingForm.addEventListener("submit", showCity);
let searchingForm2 = document.querySelector(".searchButton");
searchingForm2.addEventListener("click", showCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey2 = `bc3f2145fd14d46824982be4e0451c8d`;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=metric`;
  axios.get(apiUrl2).then(showCurrentData);
}
function showCurrentData(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${temperature}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = `Wind speed: ${wind} km/h`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let weatherElement = document.querySelector("#weather-description");
  weatherElement.innerHTML = `${response.data.weather[0].description}`;
  let cityCurrentName = document.querySelector("#current-city");
  cityCurrentName.innerHTML = `${response.data.name}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentPosition);
