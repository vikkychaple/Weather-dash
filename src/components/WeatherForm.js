
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
import ReactPaginate from "react-paginate";

// Debounce function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const WeatherForm = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Cache object to store previous API results
  const cache = {};

  // Fetch weather data
  const fetchData = async () => {
    if (!latitude || !longitude || !startDate || !endDate) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Validate latitude and longitude ranges
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      setErrorMessage("Please enter valid latitude and longitude values.");
      return;
    }

    // Ensure start date is before end date
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("Start date must be earlier than the end date.");
      return;
    }

    // Create a cache key from input parameters
    const cacheKey = `${latitude}-${longitude}-${startDate}-${endDate}`;

    // Check if data is already cached
    if (cache[cacheKey]) {
      setWeatherData(cache[cacheKey]);
      return;
    }

    const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean&timezone=auto`;

    setLoading(true); // Set loading to true before fetching
    setErrorMessage(""); // Clear previous error messages

    try {
      const response = await axios.get(url);

      // Check if the response contains the necessary data
      if (response.data && response.data.daily) {
        const fetchedData = response.data.daily;
        setWeatherData(fetchedData);

        // Cache the fetched data
        cache[cacheKey] = fetchedData;
      } else {
        setErrorMessage("No data available for the given parameters.");
      }
    } catch (error) {
      setErrorMessage("Error fetching weather data: " + error.message);
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced function to fetch data
  const debouncedFetchData = debounce(fetchData, 1000);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Pagination logic
  const dataToShow = weatherData
    ? weatherData.time.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    : [];

  const chartData = weatherData ? {
    labels: weatherData.time,
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: weatherData.temperature_2m_max,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Min Temp (°C)',
        data: weatherData.temperature_2m_min,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Mean Temp (°C)',
        data: weatherData.temperature_2m_mean,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  } : {};

  // Fetch weather data on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    // Trigger the debounced fetch when the form changes
    debouncedFetchData();
    // eslint-disable-next-line
  }, [latitude, longitude, startDate, endDate]); // Dependency array to track input changes

  return (
    <div>
      <form className="bg-gray-100 p-4 rounded-lg mb-6" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            step="0.01"
            className="input"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
          <input
            type="number"
            step="0.01"
            className="input"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
          <input
            type="date"
            className="input"
        
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            className="input"
           
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn mt-4" disabled={loading}>
          {loading ? "Fetching..." : "Fetch Weather Data"}
        </button>
      </form>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {weatherData && weatherData.time && (
        <>
          {/* Graph displaying temperature trends */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Weather Data Graph</h2>
            <Line data={chartData} />
          </div>

          {/* Table displaying the same data in a tabular format */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Weather Data Table</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Max Temp (°C)</th>
                  <th className="border p-2">Min Temp (°C)</th>
                  <th className="border p-2">Mean Temp (°C)</th>
                  <th className="border p-2">Max Apparent Temp (°C)</th>
                  <th className="border p-2">Min Apparent Temp (°C)</th>
                  <th className="border p-2">Mean Apparent Temp (°C)</th>
                </tr>
              </thead>
              <tbody>
                {dataToShow.map((time, index) => (
                  <tr key={index}>
                    <td className="border p-2">{time}</td>
                    <td className="border p-2">{weatherData.temperature_2m_max[index]}</td>
                    <td className="border p-2">{weatherData.temperature_2m_min[index]}</td>
                    <td className="border p-2">{weatherData.temperature_2m_mean[index]}</td>
                    <td className="border p-2">{weatherData.apparent_temperature_max[index]}</td>
                    <td className="border p-2">{weatherData.apparent_temperature_min[index]}</td>
                    <td className="border p-2">{weatherData.apparent_temperature_mean[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={Math.ceil(weatherData.time.length / itemsPerPage)}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherForm;





