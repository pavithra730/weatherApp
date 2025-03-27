import React, { useState } from 'react'
import axios from "axios"
export const Weather = () => {
    const [city,setcity]=useState("");
    const [weather,setweather]=useState(null);
    const API_key = "e1983d5f58a8490781c33215252703";

    const GetWeather =async()=>{
        if(!city)return;
        const url=`https://api.weatherapi.com/v1/current.json?key=${API_key}&q=${city}`;
        try{
            const response =await axios.get(url);
            setweather(response.data);
        }
        catch(error){
            console.error("Error Fetching weather:",error);
            setweather(null);
        }
    };
  return (
    <div className='container'>
        <h1>Weather App</h1>
        <div className="search-box">
        <input type="text" placeholder='Enter City Name' value={city} onChange={(e)=>{setcity(e.target.value)}} />
        <button onClick={GetWeather}>See Weather</button>
        </div>
        
        {weather && (
        <div className='weather-card'>
          <h2 className='city'>{weather.location.name}, {weather.location.country}</h2>
          <p className='temperature'>Temperature: {weather.current.temp_c}°C</p>
          <p className='weather-description'>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      )}
    </div>
  )
}
