import React from 'react';
import { Question } from '../types/exam';
import { Bookmark, BookmarkX, Trash2, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface BookmarksDrawerProps {
  bookmarkedQuestions: Question[];
  onRemoveBookmark: (questionId: string) => void;
  onClearAll: () => void;
  onStartRevisionQuiz: (questions: Question[]) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  bookmarkedQuestions,
  onRemoveBookmark,
  onClearAll,
  onStartRevisionQuiz
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            <span>Personal Revision Vault</span>
            <span aria-hidden="true">·</span>
            <span>Pre-Exam Golden Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Saved &amp; Bookmarked Questions ({bookmarkedQuestions.length})
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            High-yield tricky questions you marked during mock test attempts and solution reviews.
          </p>
        </div>

        {bookmarkedQuestions.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>

            <button
              onClick={() => onStartRevisionQuiz(bookmarkedQuestions)}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Solve Bookmarks Live Drill</span>
            </button>
          </div>
        )}
      </div>

      {/* Bookmarks List */}
      {bookmarkedQuestions.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No bookmarked questions yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            While reviewing solutions in any mock test, click the bookmark icon on any difficult question to save it here for fast pre-exam revision.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookmarkedQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-6 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-4 hover:border-slate-300 transition-all"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    Saved #{idx + 1} — {q.section}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({q.topic})
                  </span>
                </div>

                <button
                  onClick={() => onRemoveBookmark(q.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1 text-xs"
                  title="Remove from bookmarks"
                >
                  <BookmarkX className="w-4 h-4" />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>

              {/* Passage */}
              {q.passage && (
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-700 font-serif leading-relaxed">
                  {q.passage}
                </div>
              )}

              {/* Question Text */}
              <div className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                {q.questionTextEn}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.optionsEn.map((opt, optIdx) => {
                  const isCorrect = optIdx === q.correctOptionIndex;
                  return (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded border ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                          : 'bg-slate-50/60 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="font-bold text-slate-500 mr-1.5">
                        ({String.fromCharCode(65 + optIdx)})
                      </span>
                      <span>{opt}</span>
                      {isCorrect && (
                        <span className="ml-2 text-[10px] text-emerald-700 bg-emerald-100 px-1 py-0.5 rounded font-bold">
                          Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Solution & Shortcut Callout */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900">Solution:</div>
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
      )}
    </section>
  );
};
