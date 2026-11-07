import React from 'react';
import { GraduationCap, ShieldCheck, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                MockMaster<span className="text-emerald-500">Pro</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's premier competitive examination preparation &amp; mock test portal. Calibrated TCS iON simulator, genuine previous year question papers, and in-depth percentile diagnostics.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">100% Pattern Compliance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-[11px]">All India Ranking</span>
              </div>
            </div>
          </div>

          {/* Banking Exams */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Banking &amp; Insurance
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">SBI PO Prelims &amp; Mains</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">SBI Clerk Mock Tests</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">IBPS PO All India Tests</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">IBPS RRB Officer Scale 1</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">RBI Assistant Speed Mocks</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">LIC AAO Generalist</span></li>
            </ul>
          </div>

          {/* SSC & Railways */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              SSC &amp; Railways
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">SSC CGL Tier 1 &amp; Tier 2</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">SSC CHSL 10+2 Papers</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">SSC MTS &amp; Havaldar</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">RRB NTPC CBT 1 &amp; 2</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">RRB Group D Speed Tests</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Delhi Police Constable</span></li>
            </ul>
          </div>

          {/* Regulatory & Resources */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Regulatory &amp; PYQs
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">RBI Grade B Phase 1 &amp; 2</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">SEBI Grade A General</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">NABARD Grade A</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">2024 Memory Based PYQs</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Daily Current Affairs Capsule</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Banking GA Flashcards</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} MockMaster Pro. Engineered for Indian competitive exam aspirants.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Precision built for serious aspirants</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
