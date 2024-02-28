import './App.css'
import React, { useState } from 'react';
import SleepTimeInput from './SleepTimeInput';

function App() {
  const [wakeUpTimes, setWakeUpTimes] = useState([]);

  const handleTimeSelect = (time) => {
    const sleepTime = new Date();
    sleepTime.setHours(time.substring(0, 2), time.substring(3), 0, 0);

    const recommendedWakeUpTimes = [];
    const sleepDurations = [];
    for (let cycle = 4; cycle <= 6; cycle++) {
      const wakeTime = new Date(sleepTime.getTime() + cycle * 90 * 60 * 1000);
      recommendedWakeUpTimes.push({
        time: wakeTime.toLocaleTimeString().substring(0, 5),
        duration: cycle * 1.5 // Продолжительность сна в часах
      });
    }

    setWakeUpTimes(recommendedWakeUpTimes);
  };


  return (
    <div className="App">
      <h1>Время засыпания</h1>
      <SleepTimeInput onTimeSelect={handleTimeSelect} />
      <div className="recommended-times">
        <h2>Время пробуждения</h2>
        {wakeUpTimes.map((item, index) => (
          <div key={index}>
            {item.time} - {item.duration.toFixed(1)} часов сна
          </div>
        ))}
      </div>
    </div>

  );
}

export default App;
