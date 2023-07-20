import React, { useState} from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [city, setCity] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=7f7f4e66b47b3f5e97051a2af04aa065`;


  const searchCity = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
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
        {data && data.main && data.name && (
          <div className="container">
            <div className="top">
              <div className="loc">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp}°F</h1> : null}
                <div className="desc">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
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
        )}
      </div>
    </div>
  );
}

export default App;