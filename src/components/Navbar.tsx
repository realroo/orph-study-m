import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Zap, 
  Bookmark, 
  BarChart3, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'pyq' | 'current_affairs' | 'analytics' | 'bookmarks';
  setActiveTab: (tab: 'catalog' | 'pyq' | 'current_affairs' | 'analytics' | 'bookmarks') => void;
  onOpenCustomDrill: () => void;
  onStartQuickMock: () => void;
  hasRecentResult: boolean;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCustomDrill,
  onStartQuickMock,
  hasRecentResult,
  bookmarkCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <button 
            onClick={() => setActiveTab('catalog')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                MockMaster<span className="text-emerald-600">Pro</span>
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                activeTab === 'catalog'
                  ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Test Series &amp; Exams</span>
            </button>

            <button
              onClick={() => setActiveTab('pyq')}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                activeTab === 'pyq'
                  ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Previous Year Papers (PYQ)</span>
            </button>

            <button
              onClick={() => setActiveTab('current_affairs')}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                activeTab === 'current_affairs'
                  ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Daily GA &amp; Quizzes</span>
            </button>

            {hasRecentResult && (
              <button
                onClick={() => setActiveTab('analytics')}
                className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                  activeTab === 'analytics'
                    ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600'
                    : 'hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>My Performance Report</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                activeTab === 'bookmarks'
                  ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Questions {bookmarkCount > 0 && `(${bookmarkCount})`}</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCustomDrill}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Build custom practice quiz by topic and difficulty"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Custom Drill</span>
            </button>

            <button
              onClick={onStartQuickMock}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Free SBI PO Mock</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-between border-t border-slate-100 py-2.5 overflow-x-auto text-xs gap-3">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'catalog' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600'
            }`}
          >
            Exams
          </button>
          <button
            onClick={() => setActiveTab('pyq')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'pyq' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600'
            }`}
          >
            PYQ Papers
          </button>
          <button
            onClick={() => setActiveTab('current_affairs')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'current_affairs' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600'
            }`}
          >
            Daily GA
          </button>
          {hasRecentResult && (
            <button
              onClick={() => setActiveTab('analytics')}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
                activeTab === 'analytics' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600'
              }`}
            >
              Scorecard
            </button>
          )}
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
              activeTab === 'bookmarks' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600'
            }`}
          >
            Bookmarks ({bookmarkCount})
          </button>
        </div>
      </div>
    </header>
  );
};
