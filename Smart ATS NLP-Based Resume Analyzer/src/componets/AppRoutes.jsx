import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage.jsx";
import RagisterPage from "../pages/RagisterPage";
import DashboardPage from "../pages/DashboardPage.jsx";
import HistoryPage from "../pages/HistoryPage";
import AnalysisPage from "../pages/AnalysisPage.jsx";
import LoadingPage from "../pages/LoadingPage.jsx";
import AtsRulesPage from "../pages/AtsRulesPage.jsx";
import CvStandardsPage from "../pages/CvStandardsPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ats-rules" element={<AtsRulesPage />} />
      <Route path="/cv-standards" element={<CvStandardsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RagisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
    </Routes>
  );
};

export default AppRoutes;
