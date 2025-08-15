import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#1E3523] fixed w-full top-0 left-0 shadow-md z-50 font-inter">
      <div className="flex justify-between items-center w-full px-6 py-4">
        {/* Logo → Home */}
        <Link
          to="/"
          className="text-[#EAFE45] text-3xl tracking-wide"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700, 
            letterSpacing: "0.5px",
          }}
        >
          Reflectly
        </Link>

        {/* Nav links */}
        <div className="flex space-x-6 text-[18px] font-medium">
          <Link
            to="/dashboard"
            className="text-[#E4E8D5] hover:text-[#EAFE45] transition-colors"
          >
            Start Journaling
          </Link>
          <Link
            to="/history"
            className="text-[#E4E8D5] hover:text-[#EAFE45] transition-colors"
          >
            History
          </Link>
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
