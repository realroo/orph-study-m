import React, { useState } from 'react';
import { ExamSeries, ExamPaper } from '../types/exam';
import { 
  X, 
  Clock, 
  HelpCircle, 
  Award, 
  Download, 
  Play, 
  FileText, 
  CheckCircle,
  Filter,
  Sparkles
} from 'lucide-react';

interface PaperExplorerModalProps {
  series: ExamSeries | null;
  onClose: () => void;
  onStartPaper: (paper: ExamPaper) => void;
  onDownloadPdf: (paper: ExamPaper) => void;
}

export const PaperExplorerModal: React.FC<PaperExplorerModalProps> = ({
  series,
  onClose,
  onStartPaper,
  onDownloadPdf
}) => {
  const [filterType, setFilterType] = useState<'all' | 'full_mock' | 'pyq'>('all');

  if (!series) return null;

  const filteredPapers = series.papers.filter((paper) => {
    if (filterType === 'all') return true;
    return paper.paperType === filterType;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <span>{series.badge}</span>
              <span aria-hidden="true">·</span>
              <span>{series.shortCode}</span>
              <span aria-hidden="true">·</span>
              <span>{series.papers.length} Papers Available</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {series.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Complete collection of full-length mocks, authentic previous year memory papers, and sectional tests calibrated to TCS iON standards.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-medium text-slate-600">Filter Papers:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  filterType === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                All Papers ({series.papers.length})
              </button>
              <button
                onClick={() => setFilterType('full_mock')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  filterType === 'full_mock'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Full Mocks
              </button>
              <button
                onClick={() => setFilterType('pyq')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  filterType === 'pyq'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Previous Year Papers (PYQ)
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Real time scoring with negative marking (-{series.papers[0]?.negativeMarkingRatio} per error)
          </div>
        </div>

        {/* Paper List Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredPapers.map((paper, idx) => {
            const isPYQ = paper.paperType === 'pyq';

            return (
              <div
                key={paper.id}
                className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    {paper.isFree ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        FREE ACCESS
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        PRO TEST
                      </span>
                    )}

                    {isPYQ && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {paper.year} PYQ Memory Based
                      </span>
                    )}

                    <span className="text-xs text-slate-500 tabular-nums">
                      {paper.attemptsCount.toLocaleString()} Aspirants Attempted
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {paper.paperTitle}
                  </h4>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{paper.durationMinutes} Minutes</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>{paper.totalQuestions} Questions</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      <span>{paper.totalMarks} Marks</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">
                      UR Cutoff: <strong>{paper.cutoffScore.UR}</strong>
                    </span>
                  </div>

                  {/* Section badges preview */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {paper.sections.map((sec) => (
                      <span
                        key={sec.name}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                      >
                        {sec.name} ({sec.totalQuestions}Q)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => onDownloadPdf(paper)}
                    className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
                    title="Download question paper PDF with answers"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF Paper</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onStartPaper(paper);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Take Live Test</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Includes step-by-step solutions with shortcuts and All India Rank</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
