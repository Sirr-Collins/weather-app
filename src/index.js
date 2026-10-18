import './style.css';
import weatherApi from './weatherApi.js';
import dom from './dom.js';

const form = document.getElementById('weather-form');
const input = document.getElementById('location-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const location = input.value.trim();
  if (!location) return;

  // 1. Trigger the loading UI
  dom.showLoading();
  
  // 2. Fetch the data
  const weatherData = await weatherApi.fetchRawWeatherData(location);
  
  // 3. Render the data or show an error
  if (weatherData) {
    dom.renderWeather(weatherData);
  } else {
    dom.showError();
  }
  
  input.value = ''; // Clear the input field
});
