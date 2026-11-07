import React, { useState } from 'react';
import { ExamPaper, SectionType } from '../types/exam';
import { X, SlidersHorizontal, Sparkles, Play, CheckCircle } from 'lucide-react';

interface CustomDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDrill: (paper: ExamPaper) => void;
  allAvailableQuestions: any[];
}

export const CustomDrillModal: React.FC<CustomDrillModalProps> = ({
  isOpen,
  onClose,
  onLaunchDrill,
  allAvailableQuestions
}) => {
  const [selectedSection, setSelectedSection] = useState<SectionType>('Quantitative Aptitude');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'moderate' | 'exam_level' | 'hard'>('exam_level');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [customTimeMinutes, setCustomTimeMinutes] = useState<number>(10);

  if (!isOpen) return null;

  const topicsBySection: Record<SectionType, string[]> = {
    'Quantitative Aptitude': ['Quadratic Equations', 'Time & Work', 'Missing Number Series', 'Data Interpretation'],
    'Reasoning Ability': ['Syllogism', 'Inequality', 'Circular Seating Arrangement', 'Floor Puzzle'],
    'English Language': ['Error Detection', 'Cloze Test & Vocabulary', 'Reading Comprehension', 'Sentence Rearrangement'],
    'General & Banking Awareness': ['Monetary Policy & Banking', 'Indian Economy', 'Current Affairs 2024-2025', 'Static GK'],
    'Computer Knowledge': ['Computer Hardware', 'Networking & Protocols', 'MS Office Shortcuts', 'Cybersecurity']
  };

  const handleStartDrill = () => {
    // Filter questions matching chosen section or fallback
    let matched = allAvailableQuestions.filter((q) => q.section === selectedSection);
    if (matched.length === 0) matched = allAvailableQuestions;

    // Pick requested count (or repeat if needed)
    const drillQuestions = matched.slice(0, questionCount).map((q, idx) => ({
      ...q,
      questionNumber: idx + 1
    }));

    const drillPaper: ExamPaper = {
      id: `custom-drill-${Date.now()}`,
      examId: 'custom-drill',
      examTitle: `Custom Drill: ${selectedSection}`,
      category: 'banking',
      paperTitle: `High-Impact Drill: ${selectedSection} (${questionCount} Qs)`,
      paperType: 'mini_mock',
      isFree: true,
      totalQuestions: drillQuestions.length,
      totalMarks: drillQuestions.length,
      durationMinutes: customTimeMinutes,
      negativeMarkingRatio: 0.25,
      cutoffScore: { UR: Math.round(drillQuestions.length * 0.6 * 10) / 10, OBC: 0, EWS: 0, SC: 0, ST: 0 },
      attemptsCount: 1420,
      sections: [
        {
          name: selectedSection,
          durationMinutes: customTimeMinutes,
          totalQuestions: drillQuestions.length,
          maxMarks: drillQuestions.length
        }
      ],
      questions: drillQuestions
    };

    onClose();
    onLaunchDrill(drillPaper);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold">Custom Drill Generator</h3>
              <p className="text-xs text-slate-400">Build focused speed tests for your weakest areas</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Form */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          {/* Section Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-900">Select Subject / Section:</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Quantitative Aptitude', 'Reasoning Ability', 'English Language', 'General & Banking Awareness'] as SectionType[]).map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setSelectedSection(sec)}
                  className={`p-2.5 rounded-lg border text-left font-semibold transition-colors ${
                    selectedSection === sec
                      ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600/30'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Preview */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800">Target Topics Included:</div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {topicsBySection[selectedSection]?.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Question Count & Time Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-900">Question Count:</label>
              <div className="flex items-center gap-1.5">
                {[5, 10, 15].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`flex-1 py-2 text-center rounded-lg border font-bold ${
                      questionCount === cnt
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900">Timer Limit:</label>
              <div className="flex items-center gap-1.5">
                {[5, 10, 15].map((tm) => (
                  <button
                    key={tm}
                    type="button"
                    onClick={() => setCustomTimeMinutes(tm)}
                    className={`flex-1 py-2 text-center rounded-lg border font-bold ${
                      customTimeMinutes === tm
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {tm} Mins
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Real TCS iON scoring with -0.25 negative marks
          </span>
          <button
            onClick={handleStartDrill}
            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Custom Drill</span>
          </button>
        </div>
      </div>
    </div>
  );
};
