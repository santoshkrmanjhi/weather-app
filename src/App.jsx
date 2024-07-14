import React, { useEffect, useState } from 'react'
import TopButtons from "./components/TopButtons"
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TempDetails from './components/TempDetails'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './components/Services/weatherService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const[query, setQuery]=useState({q:"khunti"})
  const[units, setUnits]=useState("metric")
  const[weather, setWeather]=useState(null)

  const getWeather = async()=>{
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${cityName.toUpperCase()}`);

    await getFormattedWeatherData({...query, units}).then( data => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      setWeather(data)
    })
    console.log(data)
  }

  useEffect(()=>{
  getWeather();

  },[query, units]);

  const formatBackground = () =>{
    if(!weather) return 'from-cyan-600 to-blue-700';
    const threshold = units === 'metric' ? 20:60;
    if(weather.temp <= threshold) return 'from-cyan-600 to-blue-700';
    return 'from-yellow-600 to-orange-700';
  }
  

  return (
    <div className={`mx-auto md:max-w-screen-lg  mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      { weather && (
        <>
        <TimeAndLocation weather={weather} />
        <TempDetails weather={weather} units={units} />
        <Forecast title="3 hours step forecast" data={weather.hourly} />
        <Forecast title="Daily forecast" data={weather.daily} />
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
      
    </div>
  )
}

export default App