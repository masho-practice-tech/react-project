import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import sun from "../src/assets/sun.png";
import { WiHumidity } from "react-icons/wi";
import { BsSpeedometer2 } from "react-icons/bs";
import axios from 'axios'

const Home = () => {

  const [weatherData, setWeatherData] =useState(false);
  const [error, setError] =useState(null);

  const inputRef =useRef();
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9b555c5bc20166a81b33520b309370c7`;
     
        const response = await axios.get(url);
        const data = await response.data;
        if (!response.ok) {
           setError('fetching failed', error);            
        }
      console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
    
         
      })
    } catch (error) {
      setWeatherData(false);
      console.log('failed to fetch', error)
    }
  };

  useEffect(() => {
    search("Addis Ababa");
  }, []);

  return (
    <div className="h-screen w-full py-24  bg-pink-200">
      <div className="h-[550px] mx-auto text-white bg-gradient-to-t from-blue-950 to-blue-800 w-2/3 sm:w-[500px] rounded-lg py-10 px-3">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center justify-center ">
            <input
              type="text"
              placeholder="Search"
              ref={inputRef}
              className="px-5 rounded-full outline-none py-2 text-black"
            />
            <IoSearchOutline
              size={35}
              onClick={()=> search(inputRef.current.value)}
              className="bg-white text-gray-700 py-1 cursor-pointer rounded-full"
            />
          </div>
          <div className="flex flex-col text-center my-10">
            <img
              src={sun}
              alt=""
              className="h-36 object-contain object-center "
            />
            <h1 className="text-3xl sm:text-4xl my-2">{weatherData.temprature} °C</h1>
            <h1 className="text-3xl font-mono">{weatherData.location}</h1>
          </div>
          <div className="flex gap-2 mt-8 justify-around">
            <div className="flex gap-2 ">
              <WiHumidity size={45} />
              <div className="flex flex-col">
                <p>{weatherData.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="flex gap-2">
              <BsSpeedometer2 size={30} />
              <div className="flex flex-col">
                <p>{weatherData.windSpeed} Km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
