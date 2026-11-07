import React from 'react';
import { Question, CandidateResponse, QuestionStatus } from '../../types/exam';
import { Check, CheckCircle2 } from 'lucide-react';

interface QuestionPaletteProps {
  questions: Question[];
  currentQuestionIndex: number;
  onSelectQuestion: (idx: number) => void;
  responses: Record<string, CandidateResponse>;
  onSubmitTest: () => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentQuestionIndex,
  onSelectQuestion,
  responses,
  onSubmitTest
}) => {
  // Compute counts for palette legend
  let answeredCount = 0;
  let notAnsweredCount = 0;
  let notVisitedCount = 0;
  let markedCount = 0;
  let answeredAndMarkedCount = 0;

  questions.forEach((q) => {
    const res = responses[q.id];
    const status: QuestionStatus = res ? res.status : 'not_visited';
    if (status === 'answered') answeredCount++;
    else if (status === 'not_answered') notAnsweredCount++;
    else if (status === 'marked_for_review') markedCount++;
    else if (status === 'answered_and_marked') answeredAndMarkedCount++;
    else notVisitedCount++;
  });

  const getStatusClasses = (status: QuestionStatus, isCurrent: boolean) => {
    let base = 'w-9 h-9 rounded-md text-xs font-bold flex items-center justify-center transition-all cursor-pointer relative ';
    if (isCurrent) {
      base += 'ring-2 ring-blue-600 ring-offset-1 scale-105 ';
    }

    switch (status) {
      case 'answered':
        return base + 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700';
      case 'not_answered':
        return base + 'bg-red-500 text-white shadow-2xs hover:bg-red-600';
      case 'marked_for_review':
        return base + 'bg-purple-600 text-white shadow-2xs hover:bg-purple-700';
      case 'answered_and_marked':
        return base + 'bg-purple-600 text-white shadow-2xs hover:bg-purple-700';
      case 'not_visited':
      default:
        return base + 'bg-slate-200 text-slate-700 hover:bg-slate-300';
    }
  };

  return (
    <aside className="w-full lg:w-80 bg-slate-50 border-l border-slate-200 flex flex-col justify-between overflow-y-auto select-none">
      <div className="p-4 space-y-4">
        {/* Candidate Info Card */}
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
          <img
            src="/src/assets/images/avatar_mentor_1794057337587.jpg"
            alt="Candidate profile"
            className="w-12 h-12 rounded-lg object-cover border border-slate-200"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-slate-400 font-medium">Candidate</div>
            <div className="text-xs font-bold text-slate-900 truncate">Aqdus A. (Aspirant)</div>
            <div className="text-[11px] text-slate-500 font-mono">Roll: 2025-IBPS-9812</div>
          </div>
        </div>

        {/* Official TCS iON Status Legend */}
        <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px] space-y-2">
          <div className="font-bold text-slate-700 border-b border-slate-100 pb-1 uppercase tracking-wider text-[10px]">
            Palette Legend
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] tabular-nums">
                {answeredCount}
              </span>
              <span className="text-slate-600 truncate">Answered</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-red-500 text-white font-bold flex items-center justify-center text-[10px] tabular-nums">
                {notAnsweredCount}
              </span>
              <span className="text-slate-600 truncate">Not Answered</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] tabular-nums">
                {notVisitedCount}
              </span>
              <span className="text-slate-600 truncate">Not Visited</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-purple-600 text-white font-bold flex items-center justify-center text-[10px] tabular-nums">
                {markedCount}
              </span>
              <span className="text-slate-600 truncate">Marked for Review</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <div className="relative w-5 h-5 rounded bg-purple-600 text-white font-bold flex items-center justify-center text-[10px] tabular-nums">
              {answeredAndMarkedCount}
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
            </div>
            <span className="text-slate-600 text-[10px] leading-tight">
              Answered &amp; Marked for Review (Evaluated)
            </span>
          </div>
        </div>

        {/* Question Palette Number Grid */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <div className="text-xs font-bold text-slate-800 mb-3 flex items-center justify-between">
            <span>Question Palette ({questions.length})</span>
            <span className="text-[11px] text-slate-400 font-normal">Click to navigate</span>
          </div>

          <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto p-1">
            {questions.map((q, idx) => {
              const res = responses[q.id];
              const status: QuestionStatus = res ? res.status : 'not_visited';
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion(idx)}
                  className={getStatusClasses(status, isCurrent)}
                  title={`Question ${q.questionNumber}: ${status.replace('_', ' ')}`}
                >
                  <span>{q.questionNumber}</span>
                  {status === 'answered_and_marked' && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit Test Button */}
      <div className="p-4 bg-white border-t border-slate-200">
        <button
          onClick={onSubmitTest}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Submit Test &amp; View Analytics</span>
        </button>
      </div>
    </aside>
  );
};
