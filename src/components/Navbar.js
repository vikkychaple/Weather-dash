
import React,{useState} from 'react';
const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
      document.body.className = isDarkMode ? "light" : "dark";
    };
  
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-800">
     <div className="flex items-center space-x-3">

      <img src="./images/logo1.png" alt="Logo" className="w-12 h-auto" /> 
      <h1 className="text-2xl font-extrabold tracking-wide">
          Weather Dashboard
        </h1>{/* Adjust logo size as needed */}
        </div>
      {/* <ul className="flex space-x-6">
        {["Home", "Features", "Pricing", "API Docs"].map((link, index) => (
          <li key={index}>
            <a href={`#${link.toLowerCase()}`} className="text-white font-bold hover:text-gray-400">
              {link}
            </a>
          </li>
        ))}
      </ul> */}
       {/* Navigation Links */}
       <div className="hidden md:flex space-x-6">
        {["Home", "Features", "Pricing", "API Docs"].map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-white font-bold hover:font-bold hover:text-yellow-300 transition"
          >
            {item}
          </a>
        ))}
      </div>
      {/* Social Media Icons */}
      <ul className="flex space-x-4 items-center">
       
        <li>
          <a
            href="https://www.linkedin.com/in/vikky-chaple-495869198/"
            className="hover:text-yellow-400 "
            title="LinkedIn"
          >
            <i className="fab fa-linkedin text-lg"></i>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/vikkychaple"
            className="hover:text-yellow-400"
            title="GitHub"
          >
            <i className="fab fa-github text-lg"></i>
          </a>
        </li>
      </ul>
       {/* Theme Toggle */}
       <button
        onClick={toggleTheme}
        className={`ml-4 px-4 py-2 text-sm font-medium rounded-lg shadow-md transition ${
          isDarkMode
            ? "bg-yellow-400 text-gray-900 hover:bg-yello-500"
            : "bg-yellow-200 text-black hover:bg-yellow-300"
        }`}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>



    </nav>
  );
}

export default Navbar;
