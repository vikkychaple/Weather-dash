import React from "react";
import { Line } from "react-chartjs-2";

const WeatherGraph = ({ data }) => {
  const labels = data.time;
  const chartData = {
    labels,
    datasets: [
      {
        label: "Max Temperature (°C)",
        data: data.temperature_2m_max,
        borderColor: "red",
        fill: false,
      },
      {
        label: "Min Temperature (°C)",
        data: data.temperature_2m_min,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Mean Temperature (°C)",
        data: data.temperature_2m_mean,
        borderColor: "green",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Dates" } },
      y: { title: { display: true, text: "Temperature (°C)" } },
    },
  };

  return (
    <div className="mb-6">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherGraph;
