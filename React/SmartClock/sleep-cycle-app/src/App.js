import './App.css'
import React, { useState } from 'react';
import SleepTimeInput from './SleepTimeInput';

function App() {
  const [wakeUpTimes, setWakeUpTimes] = useState([]);

  const handleTimeSelect = (time) => {
    const sleepTime = new Date();
    sleepTime.setHours(time.substring(0, 2), time.substring(3), 0, 0);

    const recommendedWakeUpTimes = [];
    for (let cycle = 4; cycle <= 6; cycle++) {
      const wakeTime = new Date(sleepTime.getTime() + cycle * 90 * 60 * 1000);
      recommendedWakeUpTimes.push(wakeTime.toLocaleTimeString().substring(0, 5));
    }

    setWakeUpTimes(recommendedWakeUpTimes);
  };

  return (
    <div className="App">
      <h1>Выберите время засыпания</h1>
      <SleepTimeInput onTimeSelect={handleTimeSelect} />
      {wakeUpTimes.length > 0 && (
        <div className="recommended-times">
          <h2>Время пробуждения:</h2>
          {wakeUpTimes.map((time, index) => (
            <div key={index}>{time}</div>
          ))}
        </div>

      )}
    </div>
  );
}

export default App;
