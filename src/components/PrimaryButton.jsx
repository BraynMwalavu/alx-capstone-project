import React from "react";

export default function PrimaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#EAFE45] 
        text-[#1E3523] 
        font-poppins font-semibold 
        text-[16px] 
        px-6 py-3 
        rounded-lg 
        transition-all 
        hover:bg-[#1E3523] hover:text-[#EAFE45] 
        hover:border-2 hover:border-[#EAFE45]
        shadow-md
      "
    >
      {text}
    </button>
  );
}
