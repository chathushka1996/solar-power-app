import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ prediction, real }) => {
  const [showReal, setShowReal] = useState(false);

  // Extract datetime labels and data for prediction and real values
  const labels = prediction.map((item) => item.datetime);
  const predictionData = prediction.map((item) => item.solar_power_pred);
  const realData = real.map((item) => item.solar_power_real);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Predicted Solar Power Output (kW)',
        data: predictionData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      ...(showReal && real.length > 0
        ? [
            {
              label: 'Real Solar Power Output (kW)',
              data: realData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Solar Power Output Prediction',
      },
    },
  };

  return (
    <div>
      {real.length > 0 && (
        <div className="show-real-checkbox">
          <label>
            <input
              type="checkbox"
              checked={showReal}
              onChange={() => setShowReal(!showReal)}
            />
            Show Real Values
          </label>
        </div>
      )}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Graph;