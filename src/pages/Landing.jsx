import React from "react"; 
import { useNavigate } from "react-router-dom"; 
import heroImage from "../assets/images/hero-image.jpeg"; 
import PrimaryButton from "../components/PrimaryButton.jsx"; 

// The Landing component is the "welcome page" of the app.
// It introduces users to Reflectly Journal.
export default function Landing() {
  // `useNavigate` is a React Router hook that lets us programmatically
  // move users to another page without using a link element.
  const navigate = useNavigate();

  return (
    // Outer wrapper: fills the screen and centers everything vertically + horizontally.
  
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-[#1E3523] px-4">
      
      {/* Hero Image section */}
      {/* Displays a decorative image with rounded corners and shadow for depth. */}
      <img
        src={heroImage}
        alt="Reflectly Hero"
        className="w-full max-w-2xl h-auto rounded-xl shadow-lg"
      />

      {/* Main heading (App title) */}
      {/* Uses responsive margin (`mt-6 sm:mt-8 md:mt-10`) to give breathing space. 
          Font size scales up from `3xl` → `4xl` → `5xl` at larger breakpoints.
          The heading is built in parts so different words can have custom styling. */}
      <h1 className="mt-6 sm:mt-8 md:mt-10 text-3xl sm:text-4xl md:text-5xl leading-snug">
        {/* "Welcome to" - styled in off-white brand color */}
        <span className="text-[#E4E8D5]">Welcome to </span>

        {/* "Reflectly" - highlighted in bright yellow, 
            custom cursive font for personality, bold weight for emphasis*/}
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

        {/* "Journal" - styled like the first part, in off-white */}
        <span className="text-[#E4E8D5]"> Journal</span>
      </h1>

      {/* Call-to-Action section */}
      {/*  When clicked, it uses `navigate` to move the user to the dashboard page*/}
      <div className="mt-4 sm:mt-6 md:mt-8">
        <PrimaryButton
          text="Start Journaling"
          onClick={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
}
