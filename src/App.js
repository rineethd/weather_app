import React, { useState} from "react";
import axios from "axios";
import cloudsImage from "./assets/clouds.png";
import clearImage from "./assets/clear.png";
import rainImage from "./assets/rain.png";
import mistImage from "./assets/mist.png";
import snowImage from "./assets/snow.png";
import drizzleImage from "./assets/drizzle.png";

function App() {
  const [data, setData] = useState();
  const [city, setCity] = useState("");
  const [error,setError]=useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=7f7f4e66b47b3f5e97051a2af04aa065`;
  

  const weatherImage = {
    Clouds: cloudsImage,
    Clear: clearImage,
    Rain: rainImage,
    Mist: mistImage,
    Snow: snowImage,
    Drizzle: drizzleImage,
  };
  
  const searchCity = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError("");
        })
        .catch((error) => {
          setData(null);
          setError("City not found. Please enter a valid city name.");
        });
      setCity("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={city}
          type="text"
          onChange={(event) => setCity(event.target.value)}
          onKeyDown={searchCity}
          placeholder="Enter City"
        />
      </div>
      <div className="bottom-container">
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : data && data.main && data.name ? (
          <div className="container">
            <div className="top">
              <div className="loc">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp}°F</h1> : null}
                {data.weather ? (
              <div className="desc">
                 <p className="weather-description">{data.weather[0].main}</p>
                 <img
                   className="weather-image"
                   src={weatherImage[data.weather[0].main]}
                   alt={data.weather[0].main}
                   width={50}
                   height={50}
                  />
              </div>
                ) : null}
                {data.main && data.main.temp_max && data.main.temp_min && (
                  <div className="temp-range">
                    <span className="arrow">↑</span>
                    <span className="first">{data.main.temp_max}°F</span>
                    <span className="arrow">↓</span>
                    <span>{data.main.temp_min}°F</span>
                  </div>
                )}
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className="bold">{data.main.feels_like}°F</p> : null}
                <p>Feels like</p>
              </div>
              <div className="humid">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;