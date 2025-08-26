import React from "react";
import { Link } from "react-router-dom"; 
// Importing Link from react-router-dom for navigation withot refreshing the app.

// Navbar component (top navigation bar)
export default function Navbar() {
  return (
    // <nav> wrapper with Tailwind classes following brang guide.
    <nav className="bg-[#1E3523] fixed w-full top-0 left-0 shadow-md z-50 font-inter">
      
      {/* Flex container for content inside navbar */}
      <div className="flex justify-between items-center w-full px-6 py-4">
        
        {/* Logo → navigates back to homepage */}
        <Link
          to="/"
          className="text-[#EAFE45] text-3xl tracking-wide"
          style={{
            fontFamily: "'Dancing Script', cursive", // Adds a script-like font
            fontWeight: 700, // Bold weight
            letterSpacing: "0.5px", // Slight spacing for elegance
          }}
        >
          Reflectly
        </Link>

        {/* Navigation links (right side) */}
        {/* flex + space-x-6 = horizontal spacing between links */}
        <div className="flex space-x-6 text-[18px] font-medium">
          
          {/* Dashboard link */}
          <Link
            to="/dashboard"
            className="text-[#E4E8D5] hover:text-[#EAFE45] transition-colors"
          >
            Start Journaling
          </Link>

          {/* History link */}
          <Link
            to="/history"
            className="text-[#E4E8D5] hover:text-[#EAFE45] transition-colors"
          >
            History
          </Link>

          {/* Insights link */}
          <Link
            to="/insights"
            className="text-[#E4E8D5] hover:text-[#EAFE45] transition-colors"
          >
            Insights
          </Link>
        </div>
      </div>
    </nav>
  );
}
