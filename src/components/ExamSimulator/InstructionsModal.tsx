import React from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  negativeMarkingRatio: number;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  negativeMarkingRatio
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold">General Instructions &amp; TCS iON Exam Rules</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-amber-900">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Marking Scheme:</strong> For each correct response, full positive marks will be awarded. For each incorrect response, <strong>{negativeMarkingRatio}</strong> marks will be deducted. No marks are deducted for unattempted questions.
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 pt-2">Navigating to a Question:</h4>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
            <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly.</li>
            <li>Click on <strong>Save &amp; Next</strong> to save your answer for the current question and then go to the next question.</li>
            <li>Click on <strong>Mark for Review &amp; Next</strong> to save your answer for the current question, mark it for review, and then go to the next question.</li>
          </ol>

          <h4 className="text-sm font-bold text-slate-900 pt-2">Answering a Question:</h4>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>To select your answer, click on the button of one of the options.</li>
            <li>To deselect your chosen answer, click on the button of the chosen option again or click on the <strong>Clear Response</strong> button.</li>
            <li>To change your chosen answer, click on the button of another option.</li>
            <li>To save your answer, you MUST click on the <strong>Save &amp; Next</strong> button.</li>
          </ul>

          <h4 className="text-sm font-bold text-slate-900 pt-2">TCS iON Evaluation Rule:</h4>
          <p className="text-slate-600">
            Questions that are <strong>Answered &amp; Marked for Review</strong> (purple button with green dot) <strong>WILL</strong> be evaluated and scored even if you do not review them before time expires!
          </p>
        </div>

        <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
