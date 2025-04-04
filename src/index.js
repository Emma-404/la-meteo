function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windspeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let currentTemperature = Math.round(temperature);
  temperatureElement.innerHTML = currentTemperature;

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  temperatureElement.innerHTML = Math.round(temperature);

  checkTemperature(currentTemperature);
}

function checkTemperature(temperature) {
  if (temperature >= -50 && temperature <= -5) {
    alert(
      "uggghh! I thought I walked into a freezer! Don’t worry, I brought my personality to keep it HOT!"
    );
  } else if (temperature >= -4 && temperature <= 6) {
    alert("Caribbean would be nice..");
  } else if (temperature >= 7 && temperature <= 14) {
    alert("When does the next episode of Severance come out?");
  } else if (temperature >= 15 && temperature <= 18) {
    alert("Okay, seasonal depression is officially gone ");
  } else if (temperature >= 19 && temperature <= 23) {
    alert("Perfect weather for an overpriced coffee 🙄 ...");
  } else if (temperature >= 24 && temperature <= 28) {
    alert("Just wear SPF !!🫵");
  } else if (temperature > 28) {
    alert("Warming up for hell I see!😏");
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "4e369354et3395e2b9c0oec6dfc1eab9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">🌤️</div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>15°</strong>
      </div>
      <div class="weather-forecast-temperature">9°</div>
    </div>
  </div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
displayForecast();

checkTemperature(currentTemperature);
