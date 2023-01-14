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
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-sm">
        <img src="" alt="" width="42">
          <div class="this-day-temp">12°C </div>
          <div class="forecast-day">${day}</div>
        </div>
        
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "43404b5o63abt26b054d57526860b5f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  document.querySelector("#townCity").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#percipitation").innerHTML =
    response.data.condition.description;
  let descriptionIcon = document.querySelector("#icon");
  descriptionIcon.setAttribute("src", response.data.condition.icon_url);
  descriptionIcon.setAttribute("alt", response.data.condition.icon);
  getForecast(response.data.coordinates);
}

function searchTown(city) {
  let apiKey = "43404b5o63abt26b054d57526860b5f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cities").value;
  searchTown(city);
}
let search = document.querySelector("#place");
search.addEventListener("submit", citySubmit);

searchTown("Tallinn");
