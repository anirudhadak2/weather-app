import {
  HOURLY_FORCASTE_URL,
  dayWiseData,
  DAY_OF_THE_WEEK,
} from "./app-data.js";
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

export const getIcon = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const loadHourlyForcast = (hourlyForecastData) => {
  const timeFormatter = Intl.DateTimeFormat("en", {
    hour12: true,
    hour: "numeric",
  });

  let dataFor12Hour = hourlyForecastData.slice(1, 13);
  const hourlyContainer = document.querySelector(".hourly-container");
  let innerHTMLString = ``;

  for (let { dt_txt, icon, temp } of dataFor12Hour) {
    innerHTMLString += ` <article>
    <h3 class="time">${timeFormatter.format(new Date(dt_txt))}</h3>
    <img class="icon" src="${getIcon(icon)}">
    <p class="temp">${formatTemperature(temp)} C</p>
  </article>`;
  }
  hourlyContainer.innerHTML = innerHTMLString;
};

const getDayWiseForecast = (hourlyForecastData) => {
  for (let forecast of hourlyForecastData) {
    const [date] = forecast.dt_txt.split(" ");
    const dayOfTheWeek = DAY_OF_THE_WEEK[new Date(date).getDay()];

    if (dayWiseData.has(dayOfTheWeek)) {
      let forcastForTheDay = dayWiseData.get(dayOfTheWeek);
      forcastForTheDay.push(forecast);

      dayWiseData.set(dayOfTheWeek, forcastForTheDay);
    } else {
      dayWiseData.set(dayOfTheWeek, [forecast]);
    }
  }

  for (let [day, data] of dayWiseData) {
    let minTemp = Math.min(...data.map(({ temp_min }) => temp_min));

    let maxTemp = Math.max(...data.map(({ temp_max }) => temp_max));

    dayWiseData.set(day, {
      minTemp,
      maxTemp,
      icon: data.find((d) => d.icon).icon,
    });
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  const hourlyForecastData = await getHourlyForecast();

  loadHourlyForcast(hourlyForecastData);

  getDayWiseForecast(hourlyForecastData);
});
