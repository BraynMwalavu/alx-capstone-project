import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/hero-image.jpeg";
import PrimaryButton from "../components/PrimaryButton.jsx";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-[#1E3523] px-4">
      {/* Hero Image */}
      <img
        src={heroImage}
        alt="Reflectly Hero"
        className="w-full max-w-2xl h-auto rounded-xl shadow-lg"
      />

      {/* Heading */}
      <h1 className="mt-6 sm:mt-8 md:mt-10 text-3xl sm:text-4xl md:text-5xl leading-snug">
        <span className="text-[#E4E8D5]">Welcome to </span>
        <span
          className="text-[#EAFE45]"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,          
            letterSpacing: "0.5px", 
          }}
        >
          Reflectly
        </span>
        <span className="text-[#E4E8D5]"> Journal</span>
      </h1>

      {/* Call to Action */}
      <div className="mt-4 sm:mt-6 md:mt-8">
        <PrimaryButton
          text="Start Journaling"
          onClick={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
}
