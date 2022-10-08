`use strict`;

import {
  API_KEY,
  setCurrentForcastURL,
  setHourlyForecastURL,
} from "./app-data.js";
import { loadCurrentWeatherData } from "./index.js";
import { loadHourlyData } from "./hourlyweather.js";
import { load5DayForecast } from "./fiveday.js";

let selectedCity, selectedCityText;

const getCitiesUsingGeoLocation = async (city) => {
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
  );
  return response.json();
};

const onSearch = async (event) => {
  const dataList = document.querySelector("#cities");
  let { value } = event.target;
  if (!value) {
    selectedCity = null;
    selectedCityText = "";
  }
  if (value && value !== selectedCityText) {
    const listOfCities = await getCitiesUsingGeoLocation(value);

    let optionString = ``;
    for (let { lon, lat, name, state, country } of listOfCities) {
      optionString += `<option city-details='${JSON.stringify({
        lon,
        lat,
        name,
      })}' value="${name}">${name} ${state},${country}</option>`;
    }
    dataList.innerHTML = optionString;
  }
};

const debounce = (callFn) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(callFn, 500, ...args);
  };
};

const onCitySelection = (event) => {
  selectedCityText = event.target.value;
  let options = document.querySelectorAll("#cities > option");

  if (options?.length) {
    let selectedOption = Array.from(options).find(
      (option) => option.value === selectedCityText
    );
    selectedCity = JSON.parse(selectedOption.getAttribute("city-details"));
    console.log(selectedCity);
    setCurrentForcastURL(selectedCity);
    setHourlyForecastURL(selectedCity);
    loadCurrentWeatherData();
    loadHourlyData();
  }
};

const debounceSearch = debounce((event) => onSearch(event));

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", debounceSearch);
  searchInput.addEventListener("change", onCitySelection);
});
