import React, { useState } from 'react';
import { CurrentAffairItem } from '../types/exam';
import { 
  Zap, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  FileSpreadsheet, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { formulaCheatSheets } from '../data/mockData';

interface CurrentAffairsSectionProps {
  items: CurrentAffairItem[];
}

export const CurrentAffairsSection: React.FC<CurrentAffairsSectionProps> = ({ items }) => {
  const [activeQuizAnswers, setActiveQuizAnswers] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<'news' | 'formulas'>('news');

  const handleSelectQuiz = (itemId: string, optIdx: number) => {
    setActiveQuizAnswers((prev) => ({
      ...prev,
      [itemId]: optIdx
    }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            <span>Daily General Awareness</span>
            <span aria-hidden="true">·</span>
            <span>Banking &amp; SSC Special</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Current Affairs &amp; Formula Cheat Sheets
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Curated daily for RBI Grade B, SBI PO, and SSC CGL General Awareness with interactive daily quizzes.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'news'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daily News &amp; Quizzes
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'formulas'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Formula Cheat Sheets
          </button>
        </div>
      </div>

      {activeTab === 'news' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const quiz = item.quizQuestion;
            const userAnswer = activeQuizAnswers[item.id] ?? null;
            const isAnswered = userAnswer !== null;
            const isCorrect = isAnswered && quiz && userAnswer === quiz.answer;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1 text-xs text-slate-700">
                    <div className="font-semibold text-slate-900 text-[11px] uppercase tracking-wider">
                      Key Exam Takeaways:
                    </div>
                    {item.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attached Interactive Daily Quiz Card */}
                {quiz && (
                  <div className="p-5 bg-slate-50/80 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                        <span>Daily Practice MCQ:</span>
                      </span>
                      {isAnswered && (
                        <span className={`text-[11px] font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                          {isCorrect ? 'Correct! +1.0' : 'Incorrect (-0.25)'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-slate-800">
                      {quiz.question}
                    </p>

                    <div className="space-y-1.5">
                      {quiz.options.map((opt, optIdx) => {
                        const isSelected = userAnswer === optIdx;
                        const isThisAnswer = optIdx === quiz.answer;

                        let btnClasses = 'w-full text-left p-2 rounded text-xs transition-colors border ';
                        if (isAnswered) {
                          if (isThisAnswer) {
                            btnClasses += 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                          } else if (isSelected && !isThisAnswer) {
                            btnClasses += 'bg-red-100 border-red-300 text-red-900';
                          } else {
                            btnClasses += 'bg-white border-slate-200 text-slate-600 opacity-60';
                          }
                        } else {
                          btnClasses += 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectQuiz(item.id, optIdx)}
                            className={btnClasses}
                          >
                            <span className="font-bold text-slate-500 mr-1.5">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="text-[11px] text-slate-600 pt-1 leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                        <strong>Explanation:</strong> {quiz.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Formula Sheets Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formulaCheatSheets.map((sheet, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4"
            >
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {sheet.subject}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {sheet.topic}
                </h3>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {sheet.points.map((pt, ptIdx) => (
                  <li key={ptIdx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
