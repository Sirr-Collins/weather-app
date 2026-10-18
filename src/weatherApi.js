// Visual Crossing API key
const API_KEY = 'LTHNRUPQFHMNEYTS99W5B6E42'; 

const weatherApi = (() => {
  
  const fetchRawWeatherData = async (location) => {
    try {
      // Requesting metric units (Celsius, km/h) by default
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}`, {
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`City not found or API error: ${response.status}`);
      }

      const data = await response.json();
      return processWeatherData(data);

    } catch (error) {
      console.error("API Fetch Error:", error);
      return null;
    }
  };

  const processWeatherData = (rawData) => {
    const current = rawData.currentConditions;
    
    // Manually calculate Fahrenheit since we requested metric data from the API
    const tempC = current.temp;
    const tempF = (tempC * 9/5) + 32;

    return {
      city: rawData.resolvedAddress,
      tempCelsius: Math.round(tempC * 10) / 10,
      tempFahrenheit: Math.round(tempF * 10) / 10,
      conditionText: current.conditions,
      humidity: current.humidity,
      windKph: current.windspeed 
    };
  };

  return { fetchRawWeatherData };
})();

export default weatherApi;

