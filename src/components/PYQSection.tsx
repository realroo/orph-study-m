import React, { useState } from 'react';
import { ExamPaper, ExamSeries } from '../types/exam';
import { 
  FileText, 
  Download, 
  Play, 
  Calendar, 
  CheckCircle, 
  Award, 
  Clock, 
  HelpCircle,
  Eye,
  X
} from 'lucide-react';

interface PYQSectionProps {
  seriesList: ExamSeries[];
  onStartPaper: (paper: ExamPaper) => void;
}

export const PYQSection: React.FC<PYQSectionProps> = ({
  seriesList,
  onStartPaper
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedExamStream, setSelectedExamStream] = useState<string>('all');
  const [pdfPreviewPaper, setPdfPreviewPaper] = useState<ExamPaper | null>(null);

  // Extract all PYQ papers from the series
  const allPyqs: { paper: ExamPaper; series: ExamSeries }[] = [];
  seriesList.forEach((s) => {
    s.papers.forEach((p) => {
      if (p.paperType === 'pyq') {
        allPyqs.push({ paper: p, series: s });
      }
    });
  });

  const filteredPyqs = allPyqs.filter(({ paper, series }) => {
    const matchesYear = selectedYear === 'all' || (paper.year && paper.year.toString() === selectedYear);
    const matchesStream = selectedExamStream === 'all' || series.category === selectedExamStream;
    return matchesYear && matchesStream;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
          <span>Official Archives</span>
          <span aria-hidden="true">·</span>
          <span>Authentic Memory Based Papers</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Previous Year Question Papers (PYQs)
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Actual question sets from 2021–2024 shifts with detailed step-by-step solutions, shortcuts, and cutoff trends. Available as online live tests or printable PDF papers.
        </p>
      </div>

      {/* Filters Strip */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Year selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Exam Year:</span>
            <div className="flex items-center gap-1">
              {['all', '2024', '2023'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    selectedYear === yr
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {yr === 'all' ? 'All Years' : yr}
                </button>
              ))}
            </div>
          </div>

          {/* Stream selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Stream:</span>
            <select
              value={selectedExamStream}
              onChange={(e) => setSelectedExamStream(e.target.value)}
              className="px-2.5 py-1 text-xs font-medium rounded-md border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Streams</option>
              <option value="banking">Banking &amp; Insurance</option>
              <option value="ssc">SSC &amp; Central</option>
              <option value="regulatory">Regulatory Bodies</option>
              <option value="railways">Railways</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-900">{filteredPyqs.length}</span> Solved PYQ Papers
        </div>
      </div>

      {/* PYQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPyqs.map(({ paper, series }) => (
          <div
            key={paper.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-6">
              {/* Card Meta */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {paper.year} Official PYQ
                </span>
                <span className="text-xs text-slate-500 tabular-nums font-mono">
                  {series.shortCode}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                {paper.paperTitle}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{paper.durationMinutes} Mins</span>
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
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Actual Cutoff (UR):</span>
                  <strong className="text-slate-900 font-bold">{paper.cutoffScore.UR} Marks</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total Attempts:</span>
                  <span className="tabular-nums font-medium">{paper.attemptsCount.toLocaleString()} candidates</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setPdfPreviewPaper(paper)}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View &amp; Print PDF</span>
              </button>

              <button
                onClick={() => onStartPaper(paper)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Solve in TCS iON</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Paper Preview & Print Modal */}
      {pdfPreviewPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold">{pdfPreviewPaper.paperTitle}</h3>
                  <div className="text-[11px] text-slate-400">PDF Question Paper with Step-by-Step Solutions</div>
                </div>
              </div>
              <button
                onClick={() => setPdfPreviewPaper(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Printable Body */}
            <div className="p-8 overflow-y-auto space-y-8 flex-1 font-serif bg-slate-50/50">
              <div className="text-center border-b border-slate-300 pb-4">
                <div className="text-xl font-bold font-sans text-slate-900 uppercase tracking-wider">
                  MockMaster Official Examination Paper
                </div>
                <div className="text-sm text-slate-600 mt-1 font-sans">
                  {pdfPreviewPaper.paperTitle} · Time: {pdfPreviewPaper.durationMinutes} Minutes · Marks: {pdfPreviewPaper.totalMarks}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-sans">
                  Negative Marking: -{pdfPreviewPaper.negativeMarkingRatio} marks per incorrect attempt
                </div>
              </div>

              {pdfPreviewPaper.questions.map((q, idx) => (
                <div key={q.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3 font-sans">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>Q.{idx + 1} ({q.section} - {q.topic})</span>
                    <span className="text-emerald-700">Marks: +{q.marksPositive.toFixed(2)} | -{q.marksNegative.toFixed(2)}</span>
                  </div>

                  <p className="font-semibold text-slate-900 leading-relaxed whitespace-pre-line text-sm">
                    {q.questionTextEn}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.optionsEn.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded border ${
                          optIdx === q.correctOptionIndex
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="mr-1.5 font-bold">({String.fromCharCode(65 + optIdx)})</span>
                        <span>{opt}</span>
                        {optIdx === q.correctOptionIndex && (
                          <span className="ml-2 text-[10px] text-emerald-700 bg-emerald-100 px-1 py-0.5 rounded font-bold">
                            ✓ Key Answer
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Solution Box */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 space-y-1">
                    <strong className="text-slate-900">Explanation &amp; Shortcut:</strong>
                    <div className="whitespace-pre-line text-slate-600">{q.explanation}</div>
                    {q.shortcutTip && (
                      <div className="text-amber-800 font-mono text-[11px] pt-1">
                        Trick: {q.shortcutTip}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Print ready format. Press Ctrl+P or Command+P to print.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Print Paper
                </button>
                <button
                  onClick={() => {
                    setPdfPreviewPaper(null);
                    onStartPaper(pdfPreviewPaper);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  Take as Live Mock Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
