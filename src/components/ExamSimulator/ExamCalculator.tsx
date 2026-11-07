import React, { useState } from 'react';
import { X, Delete } from 'lucide-react';

interface ExamCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamCalculator: React.FC<ExamCalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  if (!isOpen) return null;

  const handleDigit = (d: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? d : prev + d));
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleSqrt = () => {
    try {
      const val = parseFloat(display);
      if (val < 0) {
        setDisplay('Error');
      } else {
        setDisplay(Math.sqrt(val).toString());
      }
    } catch {
      setDisplay('Error');
    }
  };

  const handleEquals = () => {
    try {
      const full = equation + display;
      // evaluate sanitized math expression safely
      const sanitized = full.replace(/×/g, '*').replace(/÷/g, '/');
      if (!/^[\d\s+\-*/.]+$/.test(sanitized)) {
        setDisplay('Error');
        return;
      }
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      setDisplay(String(Math.round(result * 100000) / 100000));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="fixed bottom-12 right-6 z-50 w-72 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 overflow-hidden select-none animate-in fade-in slide-in-from-bottom-4">
      {/* Top Header */}
      <div className="p-3 bg-slate-800 flex items-center justify-between border-b border-slate-700">
        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Exam Virtual Calculator
        </span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screen */}
      <div className="p-3 bg-slate-950 text-right">
        <div className="text-[11px] text-slate-400 font-mono h-4 truncate">{equation}</div>
        <div className="text-xl font-bold font-mono tracking-wider text-emerald-400 truncate">
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="p-3 grid grid-cols-4 gap-1.5 text-xs font-semibold">
        <button onClick={handleClear} className="p-2.5 rounded bg-red-900/60 hover:bg-red-800 text-red-200">
          C
        </button>
        <button onClick={handleBackspace} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center">
          <Delete className="w-4 h-4" />
        </button>
        <button onClick={handleSqrt} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">
          √
        </button>
        <button onClick={() => handleOp('÷')} className="p-2.5 rounded bg-blue-700 hover:bg-blue-600 text-white">
          ÷
        </button>

        {['7', '8', '9'].map((d) => (
          <button key={d} onClick={() => handleDigit(d)} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">
            {d}
          </button>
        ))}
        <button onClick={() => handleOp('×')} className="p-2.5 rounded bg-blue-700 hover:bg-blue-600 text-white">
          ×
        </button>

        {['4', '5', '6'].map((d) => (
          <button key={d} onClick={() => handleDigit(d)} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">
            {d}
          </button>
        ))}
        <button onClick={() => handleOp('-')} className="p-2.5 rounded bg-blue-700 hover:bg-blue-600 text-white">
          -
        </button>

        {['1', '2', '3'].map((d) => (
          <button key={d} onClick={() => handleDigit(d)} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">
            {d}
          </button>
        ))}
        <button onClick={() => handleOp('+')} className="p-2.5 rounded bg-blue-700 hover:bg-blue-600 text-white">
          +
        </button>

        <button onClick={() => handleDigit('0')} className="p-2.5 col-span-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">
          0
        </button>
        <button onClick={() => handleDigit('.')} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">
          .
        </button>
        <button onClick={handleEquals} className="p-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
          =
        </button>
      </div>
    </div>
  );
};
