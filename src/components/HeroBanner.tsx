import React from 'react';
import { Search, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, Play } from 'lucide-react';

interface HeroBannerProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectExamCode: (code: string) => void;
  onStartFreeTest: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectExamCode,
  onStartFreeTest
}) => {
  const quickExams = ['SBI PO', 'SSC CGL', 'IBPS PO', 'RRB PO', 'RBI Grade B', 'RRB NTPC'];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Value proposition & Search */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet text kicker - Anti-slop: unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-3 tracking-wide">
              <span>ALL INDIA TEST SERIES</span>
              <span aria-hidden="true">·</span>
              <span>100% EXACT TCS iON SIMULATOR</span>
              <span aria-hidden="true">·</span>
              <span>LATEST 2024-2025 PATTERN</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 text-balance">
              India’s Most Calibrated Mock Tests &amp; Previous Year Papers
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Experience the exact exam screen used by SBI, IBPS, SSC, and RRB. Detailed step-by-step shortcuts, All India Percentiles, and deep diagnostic weak-area analysis.
            </p>

            {/* High-Intent Search Bar */}
            <div className="relative max-w-xl mb-4">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exam, e.g. 'SBI PO', 'SSC CGL 2024 PYQ', 'Puzzles'..."
                  className="w-full pl-12 pr-28 py-3.5 bg-slate-800/90 hover:bg-slate-800 focus:bg-slate-900 text-white placeholder-slate-400 text-sm rounded-xl border border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-20 text-xs text-slate-400 hover:text-white mr-2"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onStartFreeTest}
                  className="absolute right-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>Free Mock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick popular tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-400">Popular:</span>
              {quickExams.map((exam) => (
                <button
                  key={exam}
                  onClick={() => onSelectExamCode(exam)}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs border border-slate-700/60"
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-800/50 shadow-2xl group">
              <img
                src="/src/assets/images/hero_exam_prep_1794057337211.jpg"
                alt="Student analyzing test performance on MockMaster Pro"
                className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Live Simulator Active
                  </span>
                  <span className="text-xs text-slate-300 tabular-nums">48,920 Enrolled Today</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  SBI PO Prelims 2025 — All India Free Live Test
                </h3>
                <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                  Real TCS iON timer, positive (+1.0) &amp; negative (-0.25) marking, instant rank with percentile breakdown.
                </p>
                <button
                  onClick={onStartFreeTest}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Free Mock Test in TCS iON Engine</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">100% Free</div>
              <div className="text-xs text-slate-400">Starter Mock on Every Exam</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">TCS iON Certified</div>
              <div className="text-xs text-slate-400">Pixel-accurate test engine</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">1.4 Million+</div>
              <div className="text-xs text-slate-400">Mocks attempted by aspirants</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="text-lg font-bold text-emerald-400">AIR #1</span>
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">Topper Proven</div>
              <div className="text-xs text-slate-400">Real memory PYQs from 2021-2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
