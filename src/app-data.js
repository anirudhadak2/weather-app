export const API_KEY = "fef49ce1d974b0ae4ea9afef9b560df5";

let CURRENT_FORECAST_URL;

let HOURLY_FORCASTE_URL;

export function setCurrentForcastURL({ lat, lon, name }) {
  CURRENT_FORECAST_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
}

export function getCurrentForcastURL() {
  return CURRENT_FORECAST_URL;
}

export function setHourlyForecastURL({ lat, lon, name }) {
  HOURLY_FORCASTE_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
}

export function getHourlyForecastURL() {
  return HOURLY_FORCASTE_URL;
}

export let dayWiseData = new Map();
export const DAY_OF_THE_WEEK = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thru",
  "Fri",
  "Sat",
];
