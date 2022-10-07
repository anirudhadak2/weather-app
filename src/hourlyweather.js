import { HOURLY_FORCASTE_URL } from "./app-data.js";
import { formatTemperature } from "./index.js";

const getHourlyForecast = async () => {
  const response = await fetch(HOURLY_FORCASTE_URL);

  const data = await response.json();
  return data.list.map((forecast) => {
    const {
      dt_txt,
      main: { temp, temp_min, temp_max },
      weather: [{ description, icon }],
    } = forecast;
    return { temp, temp_min, temp_max, description, icon, dt_txt };
  });
};

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const loadHourlyForcast = (hourlyForecastData) => {
  let dataFor12Hour = hourlyForecastData.slice(1, 13);
  const hourlyContainer = document.querySelector(".hourly-container");
  let innerHTMLString = ``;

  for (let { dt_txt, icon, temp } of dataFor12Hour) {
    innerHTMLString += ` <article>
    <h3 class="time">${dt_txt.split(" ")[1]}</h3>
    <img class="icon" src="${getIcon(icon)}">
    <p class="temp">${formatTemperature(temp)} C</p>
  </article>`;
  }
  hourlyContainer.innerHTML = innerHTMLString;
};

document.addEventListener("DOMContentLoaded", async function () {
  const hourlyForecastData = await getHourlyForecast();
  console.log(hourlyForecastData);
  loadHourlyForcast(hourlyForecastData);
});
