import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const Card = ({ title, para, logo, badge = "01", ribbonColor = "from-indigo-600 to-indigo-800" }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="relative group w-full max-w-sm">
      {/* Hanging Bookmark Ribbon */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsBookmarked(!isBookmarked);
        }}
        className="absolute -top-3.5 right-6 z-20 cursor-pointer"
        title={isBookmarked ? "Bookmarked!" : "Bookmark this feature"}
      >
        <div
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)" }}
          className={`w-9 h-14 sm:w-10 sm:h-16 flex flex-col items-center pt-2.5 transition-all duration-300 ease-out group-hover:translate-y-1.5 shadow-lg bg-gradient-to-b ${ribbonColor} text-white shadow-indigo-600/30`}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 fill-current animate-bounce" />
          ) : (
            <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
          )}
          <span className="text-[9px] font-mono font-bold tracking-tighter mt-1 opacity-90">
            {badge}
          </span>
        </div>
      </div>

      {/* Main Card Surface */}
      <div className="bg-[#0f1422] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/15 cursor-pointer min-h-[280px]">
        <div>
          {/* Logo container */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
            {logo}
          </div>

          <h3 className="text-xl font-serif font-medium text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed font-sans">
            {para}
          </p>
        </div>

        <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 group-hover:text-indigo-400 transition-colors font-medium">
          <span>{isBookmarked ? "Saved Feature ✓" : "Interactive Bookmark"}</span>
          <span className="text-slate-600 group-hover:text-indigo-400">0{badge}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
