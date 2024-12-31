import React, { useState } from "react";

const WeatherTable = ({ data }) => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.time.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedData = data.time.slice(startIndex, endIndex).map((_, index) => ({
    date: data.time[startIndex + index],
    maxTemp: data.temperature_2m_max[startIndex + index],
    minTemp: data.temperature_2m_min[startIndex + index],
    meanTemp: data.temperature_2m_mean[startIndex + index],
  }));

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Max Temp (°C)</th>
            <th className="px-4 py-2 border">Min Temp (°C)</th>
            <th className="px-4 py-2 border">Mean Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{row.date}</td>
              <td className="px-4 py-2 border">{row.maxTemp}</td>
              <td className="px-4 py-2 border">{row.minTemp}</td>
              <td className="px-4 py-2 border">{row.meanTemp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 0}
          className="btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages - 1}
          className="btn"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WeatherTable;
