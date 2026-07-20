import { useState } from "react";

function App() {
  // Stores the city entered by the user
  const [city, setCity] = useState("");

  // Stores the weather data
  const [weather, setWeather] = useState(null);

  // Tracks whether the API is loading
  const [loading, setLoading] = useState(false); // Bolean because of loading

  // Stores any error message
  const [error, setError] = useState(""); // Error Message when its empty
       
  // Function to fetch weather
  const getWeather = async () => {
    // Don't search if input is empty
    if (!city) return;

    // Start loading
    setLoading(true);

    // Clear previous error
    setError("");

    // Clear previous weather data
    setWeather(null);

    try {
      // STEP 1: Find latitude & longitude using city name
      const geoRes = await fetch( // Here await is for keep wait until data arrives
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      // Convert response into JavaScript object
      const geoData = await geoRes.json();

      // If city is not found, show an error
      if (!geoData.results) {
        throw new Error("City not found");
      }

      // Get latitude, longitude, city name, and country
      const { latitude, longitude, name, country } = geoData.results[0];

      // STEP 2: Fetch weather using latitude & longitude
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
      );

      // Convert weather response into JavaScript object
      const weatherData = await weatherRes.json();

      // Save only the data we need
      setWeather({
        city: name,
        country: country,
        temp: weatherData.current.temperature_2m,
        wind: weatherData.current.wind_speed_10m,
      });
    } catch (err) {
      // If any error occurs, save the error message
      setError(err.message);
    }

    // Stop loading after API call finishes
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Weather App</h1>

      {/* Input box for city name */}
      <input
        type="text"
        placeholder="Enter city"
        value={city} // Input value comes from state
        onChange={(e) => setCity(e.target.value)} // Update state while typing
      />

      {/* Call getWeather() when button is clicked */}
      <button onClick={getWeather}>Search</button>

      {/* Show loading message */}
      {loading && <h2>Loading...</h2>}

      {/* Show error message */}
      {error && <h2>{error}</h2>}

      {/* Show weather data after successful API call */}
      {weather && (
        <div>
          <h2>
            {weather.city}, {weather.country}
          </h2>

          <h3>🌡️ Temperature: {weather.temp}°C</h3>

          <h3>💨 Wind Speed: {weather.wind} km/h</h3>
        </div>
      )}
    </div>
  );
}

export default App;