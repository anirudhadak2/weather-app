import { CURRENT_FORECAST_URL } from "./app-data.js";

let getCurrentWeatherData = async () => {
  const response = await fetch(CURRENT_FORECAST_URL);
  return response.json();
};

export const formatTemperature = (temp) => {
  return (temp | 0) + "°C";
};

const loadCurrentForcast = ({
  name: city,
  weather: [{ description, icon }],
  main: { temp, temp_min, temp_max },
}) => {
  document.querySelector(".now-temp").textContent = formatTemperature(temp);
  document.querySelector(".city-name").textContent = city;
  document.querySelector(".temp-desc").textContent = description;

  var options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  var today = new Date();
  document.querySelector(".now-date").textContent = today.toLocaleDateString(
    "en-US",
    options
  );

  document.querySelector(".min-max-temp").textContent = `L: ${formatTemperature(
    temp_min
  )}     H: ${formatTemperature(temp_max)}`;
};

const loadFeelsLike = ({ main: { feels_like } }) => {
  document.querySelector(".feels-like-temp").textContent =
    formatTemperature(feels_like);
};

const loadHumidity = ({ main: { humidity } }) => {
  document.querySelector(".humidity-percent").textContent = `${humidity}%`;
};

document.addEventListener("DOMContentLoaded", async function () {
  const weatherData = await getCurrentWeatherData();
  loadCurrentForcast(weatherData);
  loadFeelsLike(weatherData);
  loadHumidity(weatherData);
});
