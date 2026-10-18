const dom = (() => {
  let currentWeatherData = null;
  let isCelsius = true; // Default state

  const loadingIndicator = document.getElementById('loading');
  const weatherCard = document.getElementById('weather-card');
  const unitToggleBtn = document.getElementById('unit-toggle');

  const showLoading = () => {
    loadingIndicator.classList.remove('hidden');
    weatherCard.classList.add('hidden');
  };

  const renderWeather = (weatherData) => {
    currentWeatherData = weatherData;
    
    // Hide loading, show card
    loadingIndicator.classList.add('hidden');
    weatherCard.classList.remove('hidden');

    // Secure DOM node population
    document.getElementById('city-name').textContent = weatherData.city;
    document.getElementById('condition').textContent = weatherData.conditionText;
    document.getElementById('humidity').textContent = weatherData.humidity;
    document.getElementById('wind').textContent = weatherData.windKph;

    updateTemperatureDisplay();
  };

  const updateTemperatureDisplay = () => {
    if (!currentWeatherData) return;
    
    const tempElement = document.getElementById('temperature');
    if (isCelsius) {
      tempElement.textContent = currentWeatherData.tempCelsius;
      unitToggleBtn.textContent = '°C';
    } else {
      tempElement.textContent = currentWeatherData.tempFahrenheit;
      unitToggleBtn.textContent = '°F';
    }
  };

  const showError = () => {
    loadingIndicator.classList.add('hidden');
    weatherCard.classList.remove('hidden');
    weatherCard.innerHTML = `<p style="color: #ef4444; text-align: center;">Location not found.</p>`;
  };

  // Attach listener to the toggle button
  unitToggleBtn.addEventListener('click', () => {
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
  });

  return { showLoading, renderWeather, showError };
})();

export default dom;

