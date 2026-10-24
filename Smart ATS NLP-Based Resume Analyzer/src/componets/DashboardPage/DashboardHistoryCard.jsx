import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavCard from "../NavCard";
import { LayoutDashboard, Clock4, FileSpreadsheet, LogOut, Sparkles } from "lucide-react";
import ButtonDashboardHistory from "./ButtonDashboardHistory";
import { authService } from "../../services/api";

const DashboardHistoryCard = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <NavCard />
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <ButtonDashboardHistory
            link="/dashboard"
            logo={<LayoutDashboard className="w-4 h-4" />}
            button="Dashboard"
            active={location.pathname === "/dashboard"}
          />
          <ButtonDashboardHistory
            link="/history"
            logo={<Clock4 className="w-4 h-4" />}
            button="History"
            active={location.pathname === "/history"}
          />
          <Link
            to="/analysis"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              location.pathname === "/analysis"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-900"
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Latest</span> Report
          </Link>
        </nav>

        {/* User / Auth State */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-rose-400 p-2 rounded-xl hover:bg-gray-900 transition text-xs flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-gray-900 border border-gray-700 hover:border-gray-500 text-gray-200 transition"
            >
              Sign In
            </Link>
          )}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
            ATS
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHistoryCard;
