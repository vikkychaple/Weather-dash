// // import logo from './logo.svg';

// import React, { useState } from "react";

// import './App.css';
// import Navbar from './components/Navbar';
// import HeroSection from './components/HeroSection';
// import WeatherForm from './components/WeatherForm';
// import WeatherTable from './components/WeatherTable';
// import WeatherGraph from './components/WeatherGraph';
// function App() {
//   return (
//     <div className="App">
//     <Navbar/>
//     <HeroSection/>
//     <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
//           Weather Dashboard
//         </h1>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <WeatherForm setWeatherData={setWeatherData} />
//         </div>
//         {weatherData && (
//           <div className="mt-8 space-y-8">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <WeatherGraph data={weatherData} />
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <WeatherTable data={weatherData} />
//             </div>
//           </div>
//         )}
      
//       </div>

//     </div>
//   );
// }

// export default App;




import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherGraph from "./components/WeatherGraph";
import WeatherTable from "./components/WeatherTable";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import "./App.css";
import Footer from "./components/Footer";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
          Weather Dashboard
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <WeatherForm setWeatherData={setWeatherData} />
        </div>
        {weatherData && (
          <div className="mt-8 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <WeatherGraph data={weatherData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <WeatherTable data={weatherData} />
            </div>
          </div>
        )}
      
      </div>
      <Footer/>
    </div>
  );
};

export default App;




