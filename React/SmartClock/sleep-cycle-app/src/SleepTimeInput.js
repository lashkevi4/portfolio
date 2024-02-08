import React, { useState } from 'react';

function SleepTimeInput({ onTimeSelect }) { // Добавьте сюда onTimeSelect
  const [time, setTime] = useState('');

  const handleChange = (e) => {
    setTime(e.target.value);
    onTimeSelect(e.target.value); // Вызов функции, переданной из App
  };

  return (
    <div>
      <input
        type="time"
        id="sleepTime"
        value={time}
        onChange={handleChange} // Используйте handleChange здесь
      />
    </div>
  );
}

export default SleepTimeInput;
