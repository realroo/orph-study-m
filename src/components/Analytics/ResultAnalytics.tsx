import React, { useState } from 'react';
import { TestResult, ExamPaper, Question } from '../../types/exam';
import { 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowLeft, 
  RotateCcw, 
  Bookmark, 
  BookmarkCheck,
  TrendingUp,
  Award,
  Zap,
  PieChart as PieIcon,
  Activity,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export interface HistoricalTestProgress {
  testId: string;
  testName: string;
  date: string;
  scorePercentage: number;
  percentile: number;
}

interface ResultAnalyticsProps {
  result: TestResult;
  paper: ExamPaper;
  onRetakeTest: () => void;
  onBackToCatalog: () => void;
  onToggleBookmark: (question: Question) => void;
  bookmarkedQuestionIds: Set<string>;
}

export const ResultAnalytics: React.FC<ResultAnalyticsProps> = ({
  result,
  paper,
  onRetakeTest,
  onBackToCatalog,
  onToggleBookmark,
  bookmarkedQuestionIds
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'solutions'>('overview');
  const [solutionFilter, setSolutionFilter] = useState<'all' | 'incorrect' | 'unattempted' | 'correct'>('all');

  const formatSeconds = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  const filteredQuestions = paper.questions.filter((q) => {
    const res = result.responses[q.id];
    const isAttempted = res && res.selectedOptionIndex !== null && 
      (res.status === 'answered' || res.status === 'answered_and_marked');
    const isCorrect = isAttempted && res.selectedOptionIndex === q.correctOptionIndex;

    if (solutionFilter === 'correct') return isCorrect;
    if (solutionFilter === 'incorrect') return isAttempted && !isCorrect;
    if (solutionFilter === 'unattempted') return !isAttempted;
    return true;
  });

  // Calculate current test score percentage
  const currentScorePercentage = Math.max(
    0,
    Math.min(100, Math.round((result.totalScore / Math.max(1, result.maxScore)) * 100))
  );

  // 1. Donut Chart Data (Correct = Green, Incorrect = Red, Unattempted = Gray)
  const donutData = [
    { name: 'Correct', value: result.correctCount, color: '#10b981' },
    { name: 'Incorrect', value: result.incorrectCount, color: '#ef4444' },
    { name: 'Unattempted', value: result.unattemptedCount, color: '#94a3b8' }
  ];

  // 2. Historical 10 Mock Tests Progress Data
  const progressData: HistoricalTestProgress[] = [
    { testId: 't1', testName: 'SBI PO Diagnostic Mock 1', date: 'Oct 14', scorePercentage: 52, percentile: 68.4 },
    { testId: 't2', testName: 'SBI PO Speed Drill 02', date: 'Oct 17', scorePercentage: 56, percentile: 73.1 },
    { testId: 't3', testName: 'IBPS PO Prelims Live Mock', date: 'Oct 20', scorePercentage: 61, percentile: 79.5 },
    { testId: 't4', testName: 'Quant High Speed Test', date: 'Oct 23', scorePercentage: 59, percentile: 77.2 },
    { testId: 't5', testName: 'RRB Officer Scale 1 Mock', date: 'Oct 26', scorePercentage: 66, percentile: 83.9 },
    { testId: 't6', testName: 'SBI PO Full Length Mock 02', date: 'Oct 29', scorePercentage: 70, percentile: 87.4 },
    { testId: 't7', testName: 'SSC CGL Tier 1 Diagnostic', date: 'Nov 01', scorePercentage: 74, percentile: 90.2 },
    { testId: 't8', testName: 'RBI Grade B Phase 1 Mock', date: 'Nov 03', scorePercentage: 77, percentile: 92.5 },
    { testId: 't9', testName: 'SBI PO 2024 Memory PYQ', date: 'Nov 05', scorePercentage: 81, percentile: 95.1 },
    { 
      testId: 'current', 
      testName: result.paperTitle, 
      date: 'Today', 
      scorePercentage: currentScorePercentage, 
      percentile: result.percentile 
    }
  ];

  // Custom Tooltip for Donut Chart
  const CustomDonutTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const totalQ = paper.questions.length;
      const pct = totalQ > 0 ? Math.round((data.value / totalQ) * 100) : 0;
      return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg border border-slate-700 text-xs">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: data.payload.color }}
            />
            <span className="font-semibold">{data.name}:</span>
            <span className="font-bold tabular-nums">{data.value} Qs ({pct}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Tooltip for Line Chart
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as HistoricalTestProgress;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs space-y-1">
          <div className="font-bold text-emerald-400 text-[11px] truncate max-w-xs">
            {data.testName}
          </div>
          <div className="text-slate-300">
            Date: <span className="text-white font-medium">{data.date}</span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800">
            <span>Score: <strong className="text-emerald-400 font-bold">{data.scorePercentage}%</strong></span>
            <span>Percentile: <strong className="text-blue-400 font-bold">{data.percentile}%ile</strong></span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToCatalog}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Test Series</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetakeTest}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Full Mock</span>
          </button>
        </div>
      </div>

      {/* Main Diagnostic Header Card */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span>OFFICIAL MOCK TEST ANALYSIS</span>
              <span aria-hidden="true">·</span>
              <span>COMPLETED AT {result.completedAt}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {result.paperTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Exam: <strong>{result.examTitle}</strong> · TCS iON Calibrated Percentile Engine
            </p>
          </div>

          {/* Cutoff Status Badge */}
          <div className="self-start lg:self-center">
            {result.cutoffCleared ? (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">Cleared Prelims Cutoff</div>
                  <div className="text-[11px] text-emerald-200">
                    Your Score {result.totalScore} ≥ UR Cutoff {paper.cutoffScore.UR}
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 flex items-center gap-2.5 shadow-sm">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">Cutoff Not Met</div>
                  <div className="text-[11px] text-amber-200">
                    Needs {(paper.cutoffScore.UR - result.totalScore).toFixed(2)} marks to bridge UR cutoff
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4 Primary Score Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Score Secured</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
              {result.totalScore} <span className="text-xs font-normal text-slate-400">/ {result.maxScore}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              +{result.positiveScore} Correct | -{result.negativeScore} Negative
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>All India Rank (AIR)</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 tabular-nums">
              #{result.allIndiaRank.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Out of {result.totalCandidates.toLocaleString()} candidates
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>All India Percentile</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 tabular-nums">
              {result.percentile}%ile
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Better than {result.percentile}% of applicants
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Net Accuracy</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums">
              {result.accuracyPercentage}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {result.correctCount} Correct · {result.incorrectCount} Wrong
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs: Diagnostic Overview vs Step-by-Step Solutions */}
      <div className="flex items-center gap-3 border-b border-slate-200 mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'text-emerald-700 border-b-2 border-emerald-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Progress Graphs &amp; Visual Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('solutions')}
          className={`pb-3 text-sm font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'solutions'
              ? 'text-emerald-700 border-b-2 border-emerald-600'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Detailed Solutions &amp; Step-by-Step Shortcuts ({paper.questions.length})</span>
        </button>
      </div>

      {/* Tab 1: Diagnostic Overview with Interactive Recharts */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Progress Graphs & Circles (Donut & Line Chart) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Donut Chart (Circle) Breakdown */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    <PieIcon className="w-4 h-4 text-emerald-600" />
                    <span>Attempt Breakdown</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Total: {paper.questions.length} Questions
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Question Response Distribution
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visual ratio of correct, incorrect, and skipped questions in this mock test.
                </p>
              </div>

              {/* Chart Container */}
              <div className="relative h-64 w-full flex items-center justify-center my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomDonutTooltip />} />
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Badge inside the Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-2xl font-black text-slate-900 tabular-nums">
                    {result.accuracyPercentage}%
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Accuracy
                  </span>
                </div>
              </div>

              {/* Custom Legend Cards */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>Correct</span>
                  </div>
                  <div className="text-base font-bold text-emerald-900 tabular-nums mt-0.5">
                    {result.correctCount}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-red-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span>Incorrect</span>
                  </div>
                  <div className="text-base font-bold text-red-900 tabular-nums mt-0.5">
                    {result.incorrectCount}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                    <span>Skipped</span>
                  </div>
                  <div className="text-base font-bold text-slate-800 tabular-nums mt-0.5">
                    {result.unattemptedCount}
                  </div>
                </div>
              </div>
            </div>

            {/* Line Chart (Graph) - Last 10 Mock Tests Progress */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Performance Trajectory</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    +29% Growth Trend
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Score Percentage Across Last 10 Mock Tests
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Continuous progression curve plotting test dates against net percentage scored.
                </p>
              </div>

              {/* Line Chart Container */}
              <div className="h-64 w-full mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={progressData}
                    margin={{ top: 12, right: 16, left: -20, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={{ stroke: '#e2e8f0' }}
                      tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                    />
                    <YAxis
                      domain={[40, 100]}
                      ticks={[40, 60, 80, 100]}
                      unit="%"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                    />
                    <Tooltip content={<CustomLineTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="scorePercentage"
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#059669', stroke: '#d1fae5', strokeWidth: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Trajectory Highlights Footer */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <div className="text-slate-400">Baseline (Oct 14)</div>
                  <div className="font-bold text-slate-700 tabular-nums mt-0.5">52% Score</div>
                </div>
                <div>
                  <div className="text-slate-400">Peak Performance</div>
                  <div className="font-bold text-emerald-700 tabular-nums mt-0.5">
                    {Math.max(...progressData.map((d) => d.scorePercentage))}% Score
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Average Percentile</div>
                  <div className="font-bold text-blue-700 tabular-nums mt-0.5">85.4th %ile</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sectional Breakdown Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Sectional Performance Matrix</h3>
                <p className="text-xs text-slate-500">Evaluation against official sectional cutoff benchmarks</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Section</th>
                    <th className="py-3 px-3 text-center">Score / Max</th>
                    <th className="py-3 px-3 text-center">Attempted</th>
                    <th className="py-3 px-3 text-center text-emerald-700">Correct</th>
                    <th className="py-3 px-3 text-center text-red-600">Incorrect</th>
                    <th className="py-3 px-3 text-center">Accuracy</th>
                    <th className="py-3 px-3 text-center">Time Spent</th>
                    <th className="py-3 px-3 text-center">Cutoff Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.sectionBreakdown.map((sec) => (
                    <tr key={sec.section} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{sec.section}</td>
                      <td className="py-3 px-3 text-center font-bold tabular-nums">
                        {sec.score} / {sec.maxScore}
                      </td>
                      <td className="py-3 px-3 text-center tabular-nums">{sec.attempted}</td>
                      <td className="py-3 px-3 text-center font-semibold text-emerald-700 tabular-nums">{sec.correct}</td>
                      <td className="py-3 px-3 text-center font-semibold text-red-600 tabular-nums">{sec.incorrect}</td>
                      <td className="py-3 px-3 text-center font-bold tabular-nums">
                        {sec.accuracy}%
                      </td>
                      <td className="py-3 px-3 text-center text-slate-600 tabular-nums">
                        {formatSeconds(sec.timeSpentSeconds)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {sec.clearedCutoff ? (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Cleared
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Below Cutoff
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Weakness Doctor & Strategy Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>AI Performance Diagnosis</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Speed vs. Accuracy Calibration
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your average response time was <strong className="text-slate-900">{Math.round(result.totalTimeSeconds / Math.max(1, result.correctCount + result.incorrectCount))} seconds</strong> per question compared to topper benchmark of <strong className="text-slate-900">24 seconds</strong>. 
                Focus on memorizing standard quadratic root sign tables and 1-30 cube shortcuts to compress quantitative solving time by ~35%.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
                <div>• Recommended Daily Drill: <strong>10 Quadratic Equations &amp; Syllogism Speed Tests</strong></div>
                <div>• Target Accuracy: <strong>92%+ in Reasoning &amp; Quant</strong></div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Official Expected Cutoffs Comparison</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Category-wise Qualifying Thresholds
              </h4>
              <div className="space-y-2 text-xs pt-1">
                {Object.entries(paper.cutoffScore).map(([cat, score]) => (
                  <div key={cat} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700">{cat} Category</span>
                    <span className="font-bold text-slate-900 tabular-nums">Cutoff: {score}</span>
                    <span className={`text-[11px] font-semibold ${result.totalScore >= score ? 'text-emerald-700' : 'text-red-600'}`}>
                      {result.totalScore >= score ? `+${(result.totalScore - score).toFixed(2)} above` : `-${(score - result.totalScore).toFixed(2)} deficit`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Detailed Solutions & Step-by-Step Shortcuts */}
      {activeTab === 'solutions' && (
        <div className="space-y-6">
          {/* Solution Filters */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">Filter Questions:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSolutionFilter('all')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    solutionFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({paper.questions.length})
                </button>
                <button
                  onClick={() => setSolutionFilter('incorrect')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    solutionFilter === 'incorrect' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  Incorrect ({result.incorrectCount})
                </button>
                <button
                  onClick={() => setSolutionFilter('unattempted')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    solutionFilter === 'unattempted' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Unattempted ({result.unattemptedCount})
                </button>
                <button
                  onClick={() => setSolutionFilter('correct')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    solutionFilter === 'correct' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  Correct ({result.correctCount})
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Tip: Click bookmark icon on any question to save into your pre-exam revision notes
            </div>
          </div>

          {/* Question Solution Cards */}
          <div className="space-y-6">
            {filteredQuestions.map((q) => {
              const res = result.responses[q.id];
              const isAttempted = res && res.selectedOptionIndex !== null &&
                (res.status === 'answered' || res.status === 'answered_and_marked');
              const userOpt = isAttempted ? res.selectedOptionIndex : null;
              const isCorrect = userOpt === q.correctOptionIndex;
              const isBookmarked = bookmarkedQuestionIds.has(q.id);

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-xl border bg-white shadow-2xs space-y-4 transition-all ${
                    !isAttempted 
                      ? 'border-slate-200' 
                      : isCorrect 
                        ? 'border-emerald-200 bg-emerald-50/10' 
                        : 'border-red-200 bg-red-50/10'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        Q.{q.questionNumber} ({q.section})
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        · {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Attempt Status Badge */}
                      {!isAttempted ? (
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                          Unattempted
                        </span>
                      ) : isCorrect ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct (+{q.marksPositive})</span>
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect (-{q.marksNegative})</span>
                        </span>
                      )}

                      {/* Time Comparison Badge */}
                      <span className="text-xs text-slate-500 tabular-nums">
                        Your time: {res?.timeSpentSeconds || 0}s · Topper: {q.topperTimeSeconds}s
                      </span>

                      {/* Bookmark toggle */}
                      <button
                        onClick={() => onToggleBookmark(q)}
                        className={`p-1.5 rounded-md transition-colors ${
                          isBookmarked 
                            ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' 
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                        title={isBookmarked ? 'Bookmarked' : 'Save question to revision'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Optional Passage */}
                  {q.passage && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-serif leading-relaxed">
                      {q.passage}
                    </div>
                  )}

                  {/* Question Text */}
                  <div className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                    {q.questionTextEn}
                  </div>

                  {/* Options with Status Highlighting */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.optionsEn.map((opt, optIdx) => {
                      const isThisCorrect = optIdx === q.correctOptionIndex;
                      const isThisUserSelected = optIdx === userOpt;

                      let optClasses = 'p-3 rounded-lg border flex items-start gap-2.5 transition-colors ';
                      if (isThisCorrect) {
                        optClasses += 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400/50';
                      } else if (isThisUserSelected && !isThisCorrect) {
                        optClasses += 'bg-red-50 border-red-300 text-red-950 font-medium';
                      } else {
                        optClasses += 'bg-slate-50/60 border-slate-200 text-slate-700';
                      }

                      return (
                        <div key={optIdx} className={optClasses}>
                          <span className="font-bold text-slate-500 shrink-0">
                            ({String.fromCharCode(65 + optIdx)})
                          </span>
                          <span className="flex-1">{opt}</span>
                          {isThisCorrect && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                              Correct Answer
                            </span>
                          )}
                          {isThisUserSelected && !isThisCorrect && (
                            <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded shrink-0">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Shortcut Tip Callout */}
                  {q.shortcutTip && (
                    <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-lg text-xs text-amber-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-amber-900">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>MockMaster Shortcut Trick (Exam Hall Method):</span>
                      </div>
                      <p className="leading-relaxed pl-5 font-mono text-[11px] text-amber-900">
                        {q.shortcutTip}
                      </p>
                    </div>
                  )}

                  {/* Step-by-Step Mathematical Explanation */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 space-y-2">
                    <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                      Complete Detailed Derivation &amp; Solution:
                    </div>
                    <div className="leading-relaxed whitespace-pre-line text-slate-700 select-text">
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
