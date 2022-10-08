export const API_KEY = "fef49ce1d974b0ae4ea9afef9b560df5";
export const city = "hyderabad";
export const CURRENT_FORECAST_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

export const HOURLY_FORCASTE_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

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
