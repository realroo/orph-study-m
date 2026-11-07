import React, { useState } from 'react';
import { ExamSeries, ExamCategory, ExamPaper } from '../types/exam';
import { 
  Building2, 
  Landmark, 
  Briefcase, 
  Train, 
  Shield, 
  Award, 
  Layers, 
  Users, 
  ArrowRight,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

interface ExamCatalogProps {
  seriesList: ExamSeries[];
  searchQuery: string;
  onSelectPaper: (paper: ExamPaper) => void;
  onExploreSeries: (series: ExamSeries) => void;
}

export const ExamCatalog: React.FC<ExamCatalogProps> = ({
  seriesList,
  searchQuery,
  onSelectPaper,
  onExploreSeries
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Exam Streams', icon: <Layers className="w-4 h-4" /> },
    { id: 'banking', label: 'Banking & Insurance', icon: <Building2 className="w-4 h-4" /> },
    { id: 'regulatory', label: 'Regulatory Bodies (RBI, SEBI)', icon: <Landmark className="w-4 h-4" /> },
    { id: 'ssc', label: 'SSC & Central Govt', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'railways', label: 'Railways (RRB)', icon: <Train className="w-4 h-4" /> },
    { id: 'insurance', label: 'Insurance (LIC, NIACL)', icon: <Shield className="w-4 h-4" /> }
  ];

  const filteredSeries = seriesList.filter((series) => {
    const matchesCategory = selectedCategory === 'all' || series.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      series.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      series.papers.some(p => p.paperTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            Exam Prep Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Mock Test Series &amp; Papers
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Strictly tailored to actual TCS iON screen mechanics with updated 2024-2025 syllabi and negative marking.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium self-start md:self-auto">
          Showing <span className="font-semibold text-slate-900">{filteredSeries.length}</span> Exam Series
        </div>
      </div>

      {/* Interactive Category Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Exam Series Cards Grid */}
      {filteredSeries.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-base font-semibold text-slate-800">No matching exams found</p>
          <p className="text-sm text-slate-500 mt-1">
            Try adjusting your search query or select "All Exam Streams" to see everything available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeries.map((series) => {
            const freePaper = series.papers.find((p) => p.isFree) || series.papers[0];
            const pyqPaper = series.papers.find((p) => p.paperType === 'pyq');

            return (
              <div
                key={series.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  {/* Card Header & Unboxed metadata */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {series.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 tabular-nums">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{series.activeAspirants.toLocaleString()} Enrolled</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 hover:text-emerald-600 transition-colors cursor-pointer"
                    onClick={() => onExploreSeries(series)}
                  >
                    {series.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-2">
                    {series.description}
                  </p>

                  {/* Test Counts & Metrics Breakdown */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-50 rounded-lg border border-slate-100 text-center mb-4">
                    <div>
                      <div className="text-xs text-slate-500">Total Tests</div>
                      <div className="text-sm font-bold text-slate-900 tabular-nums">{series.totalTests} Mocks</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Free Tests</div>
                      <div className="text-sm font-bold text-emerald-600 tabular-nums">{series.freeTestsCount} Free</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">PYQ Papers</div>
                      <div className="text-sm font-bold text-slate-900 tabular-nums">{series.pyqCount} Years</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 text-xs text-slate-600 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">Includes: <strong>{freePaper?.paperTitle}</strong></span>
                    </div>
                    {pyqPaper && (
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span className="truncate">Solved: <strong>{pyqPaper.paperTitle}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onExploreSeries(series)}
                    className="text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors flex items-center gap-1"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>View All {series.papers.length} Papers</span>
                  </button>

                  <button
                    onClick={() => freePaper && onSelectPaper(freePaper)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Take Free Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
