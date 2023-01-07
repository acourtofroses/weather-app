let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let time = now.getHours();
if (time < 10) {
  time = `0${time}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function currentDate() {
  let currently = document.querySelector("#date");
  currently.innerHTML = ` ${day},${month} ${date}th,
  ${time}:${minutes}`;
}
currentDate();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `<div class="row">
        <div class="col-sm"><span class="weather">
⛈️</span><br/>12°C<br/>Mon
        </div>
        <div class="col-sm"><span class="weather">🌧️</span><br/>10°C<br/>Tue</div>
<div class="col-sm"><span class="weather">
  🌦️</span><br/>7°C<br/>Wed</div>
<div class="col-sm"><span class="weather">🌤️</span><br/>9°C<br/>Thu</div>
<div class="col-sm"><span class="weather">🌥️</span><br/>9°C<br/>Fri</div>
<p class='source'><a href="https://github.com/acourtofroses/weather-app"target="_blank">Open-source code <a> by Mariia Huda </p>
      </div>
    </div>`;
}
function showWeather(response) {
  document.querySelector("#townCity").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#percipitation").innerHTML =
    response.data.weather[0].main;
}

function searchTown(city) {
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cities").value;
  searchTown(city);
}
let search = document.querySelector("#place");
search.addEventListener("submit", citySubmit);

searchTown("Tallinn");
displayForecast();
