import React, { useState } from 'react';
import axios from 'axios';

const DatePicker = ({ onPredict }) => {
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [predictionSteps, setPredictionSteps] = useState(720); // Default to 12 days
  const [error, setError] = useState('');

  const handlePredict = async () => {
    try {
      // Combine date, hour, and minute into a single datetime string
      const formattedDateTime = `${date}T${hour}:${minute}:00`;

      const response = await axios.post('http://127.0.0.1:5000/predict', {
        date_time: formattedDateTime.replace('T', ' '),
        prediction_steps: predictionSteps,
      });
      onPredict(response.data);
      setError(''); // Clear any previous error
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setError('Failed to fetch predictions. Please try again.');
    }
  };

  return (
    <div className="date-time-section">
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Time: </label>
        <select value={hour} onChange={(e) => setHour(e.target.value)}>
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={String(i).padStart(2, '0')}>
              {String(i).padStart(2, '0')}
            </option>
          ))}
        </select>
        :
        <select value={minute} onChange={(e) => setMinute(e.target.value)}>
          {['00', '15', '30', '45'].map((min) => (
            <option key={min} value={min}>
              {min}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Prediction Steps: </label>
        <select
          value={predictionSteps}
          onChange={(e) => setPredictionSteps(Number(e.target.value))}
        >
          <option value={720}>7.5 days (720 steps)</option>
          <option value={336}>3.5 days (336 steps)</option>
          <option value={192}>2 days (192 steps)</option>
          <option value={96}>1 days (96 steps)</option>
        </select>
      </div>
      <button onClick={handlePredict}>Predict</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DatePicker;