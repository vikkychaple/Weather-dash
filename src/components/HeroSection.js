
import React from "react";

const HeroSection = () => {
  const backgroundImageUrl = "/images/bg.jpg"; 

  return (
    <div
      className="relative h-screen sm:h-64 text-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-md text-center animate-fade-in">
        <h1 className="text-4xl sm:text-3xl font-bold">Welcome to Weather Dashboard</h1>
        <p className="text-lg sm:text-base mt-2">
          Get detailed and accurate weather data for any location!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
