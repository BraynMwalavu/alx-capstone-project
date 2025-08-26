import React from "react";

/*PrimaryButton Component: This is a reusable button component designed for consistency across the app.
 */
export default function PrimaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick} // Attach the click handler passed from parent
      className="
        /* --- Base Styles --- */
        bg-[#EAFE45]            /* Bright yellow background */
        text-[#1E3523]          /* Dark green text for contrast */
        font-poppins font-semibold 
        text-[16px]             /* Standard readable font size */
        px-6 py-3               /* Padding for comfortable click area */
        rounded-lg              /* Smooth rounded corners */

        /* --- Transitions & Hover Effects --- */
        transition-all          /* Animate all property changes smoothly */
        hover:bg-[#1E3523]      /* Background switches to dark green */
        hover:text-[#EAFE45]    /* Text switches to yellow */
        hover:border-2          /* Adds a border on hover */
        hover:border-[#EAFE45]  /* Border matches yellow accent */

        /* --- Shadow --- */
        shadow-md               /* Subtle depth for elevation */
      "
    >
      {text /* Button label is dynamic, based on prop */}
    </button>
  );
}
