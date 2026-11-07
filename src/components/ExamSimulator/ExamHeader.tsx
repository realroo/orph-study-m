import React from 'react';
import { SectionConfig, SectionType } from '../../types/exam';
import { Clock, Globe, FileText, Info, Calculator as CalcIcon } from 'lucide-react';

interface ExamHeaderProps {
  paperTitle: string;
  sections: SectionConfig[];
  currentSection: SectionType;
  onSelectSection: (sec: SectionType) => void;
  remainingSeconds: number;
  selectedLanguage: 'en' | 'hi';
  onToggleLanguage: (lang: 'en' | 'hi') => void;
  onOpenQuestionPaper: () => void;
  onOpenInstructions: () => void;
  onToggleCalculator: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({
  paperTitle,
  sections,
  currentSection,
  onSelectSection,
  remainingSeconds,
  selectedLanguage,
  onToggleLanguage,
  onOpenQuestionPaper,
  onOpenInstructions,
  onToggleCalculator
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = remainingSeconds <= 120; // less than 2 minutes

  return (
    <header className="bg-slate-800 text-white border-b-2 border-emerald-600 select-none">
      {/* Top Bar: Title & Utilities */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
            TCS iON Mode
          </span>
          <span className="font-semibold text-slate-100 truncate max-w-md sm:max-w-xl">
            {paperTitle}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded border border-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">View in:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => onToggleLanguage(e.target.value as 'en' | 'hi')}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-800 text-white">English</option>
              <option value="hi" className="bg-slate-800 text-white">Hindi (हिंदी)</option>
            </select>
          </div>

          {/* Calculator toggle */}
          <button
            onClick={onToggleCalculator}
            className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded transition-colors"
            title="Open Virtual Calculator"
          >
            <CalcIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          {/* Question Paper button */}
          <button
            onClick={onOpenQuestionPaper}
            className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Question Paper</span>
          </button>

          {/* Instructions button */}
          <button
            onClick={onOpenInstructions}
            className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Instructions</span>
          </button>
        </div>
      </div>

      {/* Second Bar: Section Tabs & Live Timer */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-4 bg-slate-900">
        {/* Sections Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-xs text-slate-400 mr-2 font-medium">Sections:</span>
          {sections.map((sec) => {
            const isActive = currentSection === sec.name;
            return (
              <button
                key={sec.name}
                onClick={() => onSelectSection(sec.name)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {sec.name} ({sec.totalQuestions})
              </button>
            );
          })}
        </div>

        {/* Real Countdown Timer */}
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${isLowTime ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`} />
          <span className="text-xs text-slate-300">Time Left:</span>
          <span 
            className={`text-base font-bold font-mono tabular-nums px-2.5 py-0.5 rounded ${
              isLowTime ? 'bg-red-950 text-red-300 border border-red-700 animate-pulse' : 'bg-slate-800 text-emerald-400 border border-slate-700'
            }`}
          >
            {formatTime(remainingSeconds)}
          </span>
        </div>
      </div>
    </header>
  );
};
