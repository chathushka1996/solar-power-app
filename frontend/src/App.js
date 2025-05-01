import React, { useState } from 'react';
import DatePicker from './components/DatePicker';
import Graph from './components/Graph';
import './App.css'; // Import the CSS file

const App = () => {
  const [predictionData, setPredictionData] = useState([]);
  const [realData, setRealData] = useState([]);

  const handlePredict = (data) => {
    setPredictionData(data.prediction);
    setRealData(data.real);
  };

  return (
    <div className="container">
      <h1>Solar Power Output Prediction</h1>
      <DatePicker onPredict={handlePredict} />
      {predictionData.length > 0 && (
        <div className="graph-section">
          <Graph prediction={predictionData} real={realData} />
        </div>
      )}
    </div>
  );
};

export default App;