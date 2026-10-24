import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHistoryCard from "../componets/DashboardPage/DashboardHistoryCard";
import {
  Clock,
  Search,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Award,
  FileText,
  Calendar,
  Trash2,
  AlertCircle
} from "lucide-react";
import { resumeService } from "../services/api";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [clearing, setClearing] = useState(false);

  const fetchHistory = async () => {
    try {
      const data = await resumeService.getHistory();
      setHistory(data.history || []);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDeleteRecord = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this analysis record?")) return;

    setDeletingId(id);
    try {
      await resumeService.deleteAnalysis(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete record:", err);
      alert("Failed to delete record. Please check backend connection.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL analysis history? This cannot be undone.")) return;

    setClearing(true);
    try {
      await resumeService.clearAllHistory();
      setHistory([]);
    } catch (err) {
      console.error("Failed to clear history:", err);
      alert("Failed to clear history.");
    } finally {
      setClearing(false);
    }
  };

  const filtered = history.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.job_title?.toLowerCase().includes(query) ||
      item.company?.toLowerCase().includes(query) ||
      item.interpretation?.toLowerCase().includes(query)
    );
  });

  const getBadgeStyle = (score) => {
    if (score >= 75) return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
    if (score >= 50) return "bg-amber-500/10 border-amber-500/30 text-amber-400";
    return "bg-rose-500/10 border-rose-500/30 text-rose-400";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <DashboardHistoryCard />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-extrabold tracking-tight">Analysis History</h1>
            <p className="text-gray-400 text-sm mt-1">
              Job roles extracted directly from Job Descriptions and their candidate match scores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search extracted role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Clear All Button */}
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                disabled={clearing}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* History List / Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            Loading analysis records...
          </div>
        ) : filtered.length > 0 ? (
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="divide-y divide-gray-800">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={async () => {
                    try {
                      const fullAnalysis = await resumeService.getAnalysisById(item.id);
                      navigate("/analysis", { state: { analysisResult: fullAnalysis } });
                    } catch (err) {
                      navigate("/analysis");
                    }
                  }}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-800/40 transition cursor-pointer group"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      {/* Extracted Role from JD */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                          Role from JD
                        </span>
                        <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition">
                          {item.job_title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1.5">
                        <span className="text-gray-300 font-medium">{item.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.created_at).toLocaleDateString()} at{" "}
                          {new Date(item.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full border text-xs font-bold ${getBadgeStyle(
                          item.ats_score
                        )}`}
                      >
                        {Math.round(item.ats_score)}% • {item.interpretation}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={(e) => handleDeleteRecord(e, item.id)}
                      disabled={deletingId === item.id}
                      className="px-2.5 py-1.5 rounded-xl text-gray-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition flex items-center gap-1.5 cursor-pointer text-xs"
                      title="Delete this analysis record"
                    >
                      <Trash2 className={`w-3.5 h-3.5 text-rose-400 ${deletingId === item.id ? "animate-spin" : ""}`} />
                      <span className="hidden sm:inline font-medium">Delete</span>
                    </button>

                    <div className="text-gray-500 group-hover:text-indigo-400 transition">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1">No Records Found</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
              {search
                ? `No analyses matched "${search}". Try searching with a different keyword.`
                : "You haven't run any resume evaluations yet."}
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition cursor-pointer"
            >
              Run Your First Analysis
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
