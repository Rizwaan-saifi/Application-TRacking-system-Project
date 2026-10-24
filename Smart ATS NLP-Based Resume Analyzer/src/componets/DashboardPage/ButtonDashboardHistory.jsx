import React from "react";
import { Link } from "react-router-dom";

const ButtonDashboardHistory = ({ link, logo, button, active }) => {
  return (
    <Link to={link}>
      <button
        className={`px-3 py-1.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer transition ${
          active
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-gray-400 hover:text-white hover:bg-gray-900"
        }`}
      >
        {logo}
        <span>{button}</span>
      </button>
    </Link>
  );
};

export default ButtonDashboardHistory;
