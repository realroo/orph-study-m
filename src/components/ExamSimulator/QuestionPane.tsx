import React from 'react';
import { Question } from '../../types/exam';
import { ArrowLeft, ArrowRight, RotateCcw, BookmarkCheck } from 'lucide-react';

interface QuestionPaneProps {
  question: Question;
  questionIndex: number;
  totalQuestionsInSection: number;
  selectedOption: number | null;
  onSelectOption: (optIdx: number) => void;
  onSaveAndNext: () => void;
  onMarkForReviewAndNext: () => void;
  onClearResponse: () => void;
  onPrevious: () => void;
  hasPrevious: boolean;
  selectedLanguage: 'en' | 'hi';
}

export const QuestionPane: React.FC<QuestionPaneProps> = ({
  question,
  questionIndex,
  totalQuestionsInSection,
  selectedOption,
  onSelectOption,
  onSaveAndNext,
  onMarkForReviewAndNext,
  onClearResponse,
  onPrevious,
  hasPrevious,
  selectedLanguage
}) => {
  const isHindi = selectedLanguage === 'hi' && Boolean(question.questionTextHi);
  const questionText = isHindi ? question.questionTextHi! : question.questionTextEn;
  const options = isHindi && question.optionsHi ? question.optionsHi : question.optionsEn;

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="flex-1 flex flex-col justify-between bg-white overflow-y-auto">
      {/* Question Header */}
      <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-900">
            Question No. {question.questionNumber}
          </span>
          <span className="text-xs text-slate-500">
            ({question.topic})
          </span>
        </div>

        {/* Marking Scheme */}
        <div className="flex items-center gap-2 text-xs font-semibold tabular-nums">
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Marks: +{question.marksPositive.toFixed(2)}
          </span>
          <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
            Negative: -{question.marksNegative.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-6 flex-1 overflow-y-auto space-y-6">
        {/* Optional Passage */}
        {question.passage && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 leading-relaxed max-h-48 overflow-y-auto font-serif">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Passage</div>
            {question.passage}
          </div>
        )}

        {/* Question Text */}
        <div className="text-base text-slate-900 leading-relaxed font-medium whitespace-pre-line select-text">
          {questionText}
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {options.map((optText, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <label
                key={idx}
                onClick={() => onSelectOption(idx)}
                className={`flex items-start gap-3.5 p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-500/30 text-slate-900 font-medium'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-center pt-0.5">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={isSelected}
                    onChange={() => onSelectOption(idx)}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <div className="flex items-start gap-2 flex-1">
                  <span className="text-xs font-bold text-slate-500 pt-0.5">
                    ({optionLetters[idx]})
                  </span>
                  <span className="text-sm leading-snug">
                    {optText}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom TCS iON Navigation Bar */}
      <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Mark for Review & Clear Response */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkForReviewAndNext}
            className="px-3.5 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>Mark for Review &amp; Next</span>
          </button>

          <button
            onClick={onClearResponse}
            disabled={selectedOption === null}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              selectedOption === null
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Response</span>
          </button>
        </div>

        {/* Right Side: Previous & Save and Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              !hasPrevious
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-300'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={onSaveAndNext}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Save &amp; Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
