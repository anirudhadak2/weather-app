import { getIcon } from "./hourlyweather.js";
import { formatTemperature } from "./index.js";
export const load5DayForecast = (dayWiseData) => {
  const fiveDayContainer = document.querySelector(".five-day-container");
  let innerHTMLString = "";

  Array.from(dayWiseData).map(([day, { icon, minTemp, maxTemp }], index) => {
    if (index < 5) {
      innerHTMLString += `<article class="day-wise-forecast">
    <h3>${index === 0 ? "Today" : day}</h3>
    <img class="icon" src=${getIcon(icon)} alt="">
    <p class="min-temp">${formatTemperature(minTemp)}</p>
    <p class="max-temp">${formatTemperature(maxTemp)}</p>
  </article>`;
    }
  });

  fiveDayContainer.innerHTML = innerHTMLString;
};
