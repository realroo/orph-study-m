import React from 'react';
import { SectionConfig, Question, CandidateResponse, QuestionStatus } from '../../types/exam';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  sections: SectionConfig[];
  questions: Question[];
  responses: Record<string, CandidateResponse>;
  remainingSeconds: number;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
  sections,
  questions,
  responses,
  remainingSeconds
}) => {
  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  // Group summary per section
  const summary = sections.map((sec) => {
    const secQuestions = questions.filter((q) => q.section === sec.name);
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let notVisited = 0;

    secQuestions.forEach((q) => {
      const res = responses[q.id];
      const status: QuestionStatus = res ? res.status : 'not_visited';
      if (status === 'answered' || status === 'answered_and_marked') answered++;
      else if (status === 'not_answered') notAnswered++;
      else if (status === 'marked_for_review') marked++;
      else notVisited++;
    });

    return {
      section: sec.name,
      total: secQuestions.length,
      answered,
      notAnswered,
      marked,
      notVisited
    };
  });

  const totalAnswered = summary.reduce((acc, curr) => acc + curr.answered, 0);
  const totalQuestions = questions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold">Exam Submission Confirmation</h3>
          </div>
          <span className="text-xs text-slate-300 font-mono">
            Time Left: {formatTime(remainingSeconds)}
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-700">
            Please review your attempt summary below before final submission:
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Section Name</th>
                  <th className="py-2.5 px-3 text-center">Total Qs</th>
                  <th className="py-2.5 px-3 text-center text-emerald-700">Answered</th>
                  <th className="py-2.5 px-3 text-center text-red-600">Not Answered</th>
                  <th className="py-2.5 px-3 text-center text-purple-700">Marked</th>
                  <th className="py-2.5 px-3 text-center text-slate-500">Not Visited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {summary.map((row) => (
                  <tr key={row.section} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-800">{row.section}</td>
                    <td className="py-2 px-3 text-center tabular-nums">{row.total}</td>
                    <td className="py-2 px-3 text-center font-bold text-emerald-700 tabular-nums">{row.answered}</td>
                    <td className="py-2 px-3 text-center text-red-600 tabular-nums">{row.notAnswered}</td>
                    <td className="py-2 px-3 text-center text-purple-700 tabular-nums">{row.marked}</td>
                    <td className="py-2 px-3 text-center text-slate-500 tabular-nums">{row.notVisited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center justify-between">
            <span>
              Total Attempted: <strong className="text-emerald-700 font-bold">{totalAnswered} / {totalQuestions}</strong> questions
            </span>
            <span>Are you sure you want to submit?</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            No, Return to Test
          </button>

          <button
            onClick={onConfirmSubmit}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Yes, Submit Final Test</span>
          </button>
        </div>
      </div>
    </div>
  );
};
