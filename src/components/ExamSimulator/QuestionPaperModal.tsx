import React from 'react';
import { Question } from '../../types/exam';
import { X, FileText } from 'lucide-react';

interface QuestionPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  paperTitle: string;
}

export const QuestionPaperModal: React.FC<QuestionPaperModalProps> = ({
  isOpen,
  onClose,
  questions,
  paperTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col border border-slate-200">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold truncate">Question Paper — {paperTitle}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-800">
          <div className="p-3 bg-blue-50 border border-blue-200 text-xs text-blue-900 rounded-lg">
            This window displays all questions in this test. You can review the questions here and close to answer in the main simulator window.
          </div>

          {questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Q.{idx + 1} ({q.section} - {q.topic})</span>
                <span className="text-emerald-700">Marks: +{q.marksPositive.toFixed(2)} | -{q.marksNegative.toFixed(2)}</span>
              </div>

              {q.passage && (
                <div className="p-2.5 bg-white border border-slate-200 rounded text-xs text-slate-700 font-serif leading-relaxed">
                  {q.passage}
                </div>
              )}

              <p className="whitespace-pre-line font-medium text-slate-900">
                {q.questionTextEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {q.optionsEn.map((opt, optIdx) => (
                  <div key={optIdx} className="p-2 bg-white rounded border border-slate-200">
                    <span className="font-bold text-slate-500 mr-1.5">({String.fromCharCode(65 + optIdx)})</span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
          >
            Close Question Paper
          </button>
        </div>
      </div>
    </div>
  );
};
