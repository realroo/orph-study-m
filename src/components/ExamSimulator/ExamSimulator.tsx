import React, { useState, useEffect } from 'react';
import { ExamPaper, Question, CandidateResponse, QuestionStatus, TestResult, SectionType } from '../../types/exam';
import { ExamHeader } from './ExamHeader';
import { QuestionPane } from './QuestionPane';
import { QuestionPalette } from './QuestionPalette';
import { ExamCalculator } from './ExamCalculator';
import { QuestionPaperModal } from './QuestionPaperModal';
import { InstructionsModal } from './InstructionsModal';
import { SubmitModal } from './SubmitModal';

interface ExamSimulatorProps {
  paper: ExamPaper;
  onFinishTest: (result: TestResult) => void;
  onExitTest: () => void;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  paper,
  onFinishTest,
  onExitTest
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');
  const [remainingSeconds, setRemainingSeconds] = useState(paper.durationMinutes * 60);

  // Modals state
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isQuestionPaperOpen, setIsQuestionPaperOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // User responses dictionary keyed by question id
  const [responses, setResponses] = useState<Record<string, CandidateResponse>>({});

  const currentQuestion: Question = paper.questions[currentQuestionIndex] || paper.questions[0];
  const currentSectionName: SectionType = currentQuestion.section;

  // Track time spent per question
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalEvaluation();
          return 0;
        }
        return prev - 1;
      });

      // Track individual question time
      setResponses((prev) => {
        const qId = currentQuestion.id;
        const currentRes = prev[qId] || {
          selectedOptionIndex: null,
          status: 'not_visited',
          timeSpentSeconds: 0
        };

        // Mark as visited / not_answered if just opened
        let status = currentRes.status;
        if (status === 'not_visited') {
          status = 'not_answered';
        }

        return {
          ...prev,
          [qId]: {
            ...currentRes,
            status,
            timeSpentSeconds: currentRes.timeSpentSeconds + 1
          }
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion.id]);

  // Handle option selection
  const handleSelectOption = (optIdx: number) => {
    setResponses((prev) => {
      const qId = currentQuestion.id;
      const currentRes = prev[qId] || {
        selectedOptionIndex: null,
        status: 'not_answered',
        timeSpentSeconds: 0
      };

      return {
        ...prev,
        [qId]: {
          ...currentRes,
          selectedOptionIndex: optIdx
        }
      };
    });
  };

  // Save & Next
  const handleSaveAndNext = () => {
    const qId = currentQuestion.id;
    const currentRes = responses[qId];
    const isAnswered = currentRes && currentRes.selectedOptionIndex !== null;

    setResponses((prev) => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || { selectedOptionIndex: null, timeSpentSeconds: 0 }),
        status: isAnswered ? 'answered' : 'not_answered'
      }
    }));

    if (currentQuestionIndex < paper.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    const qId = currentQuestion.id;
    const currentRes = responses[qId];
    const isAnswered = currentRes && currentRes.selectedOptionIndex !== null;

    setResponses((prev) => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || { selectedOptionIndex: null, timeSpentSeconds: 0 }),
        status: isAnswered ? 'answered_and_marked' : 'marked_for_review'
      }
    }));

    if (currentQuestionIndex < paper.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Clear Response
  const handleClearResponse = () => {
    const qId = currentQuestion.id;
    setResponses((prev) => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || { timeSpentSeconds: 0 }),
        selectedOptionIndex: null,
        status: 'not_answered'
      }
    }));
  };

  // Previous
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Switch to Section
  const handleSelectSection = (secName: SectionType) => {
    const targetIdx = paper.questions.findIndex((q) => q.section === secName);
    if (targetIdx !== -1) {
      setCurrentQuestionIndex(targetIdx);
    }
  };

  // Evaluate & Calculate Comprehensive Report
  const handleFinalEvaluation = () => {
    let totalScore = 0;
    let positiveScore = 0;
    let negativeScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const sectionStats: Record<string, {
      section: SectionType;
      score: number;
      maxScore: number;
      attempted: number;
      correct: number;
      incorrect: number;
      timeSpentSeconds: number;
      sectionalCutoff: number;
    }> = {};

    // Initialize sections
    paper.sections.forEach((sec) => {
      sectionStats[sec.name] = {
        section: sec.name,
        score: 0,
        maxScore: sec.maxMarks,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        timeSpentSeconds: 0,
        sectionalCutoff: Math.round(sec.maxMarks * 0.45 * 10) / 10
      };
    });

    paper.questions.forEach((q) => {
      const res = responses[q.id];
      const isAttempted = res && res.selectedOptionIndex !== null && 
        (res.status === 'answered' || res.status === 'answered_and_marked');

      const secStat = sectionStats[q.section];
      if (secStat && res) {
        secStat.timeSpentSeconds += res.timeSpentSeconds || 0;
      }

      if (isAttempted && res) {
        if (secStat) secStat.attempted++;

        if (res.selectedOptionIndex === q.correctOptionIndex) {
          correctCount++;
          positiveScore += q.marksPositive;
          totalScore += q.marksPositive;
          if (secStat) {
            secStat.correct++;
            secStat.score += q.marksPositive;
          }
        } else {
          incorrectCount++;
          negativeScore += q.marksNegative;
          totalScore -= q.marksNegative;
          if (secStat) {
            secStat.incorrect++;
            secStat.score -= q.marksNegative;
          }
        }
      } else {
        unattemptedCount++;
      }
    });

    totalScore = Math.max(0, Math.round(totalScore * 100) / 100);
    const attemptedCount = correctCount + incorrectCount;
    const accuracyPercentage = attemptedCount > 0 
      ? Math.round((correctCount / attemptedCount) * 1000) / 10 
      : 0;

    // Simulated competitive All India Rank & Percentile
    const totalCandidates = paper.attemptsCount || 18450;
    const maxScore = paper.totalMarks;
    const ratio = maxScore > 0 ? totalScore / maxScore : 0;
    
    // Percentile curve
    let percentile = Math.min(99.9, Math.max(12.0, Math.round((1 / (1 + Math.exp(-6 * (ratio - 0.45)))) * 1000) / 10));
    if (totalScore === 0) percentile = 8.5;
    if (totalScore >= maxScore * 0.9) percentile = 99.4;

    const rank = Math.max(1, Math.round((1 - percentile / 100) * totalCandidates));
    const cutoffCleared = totalScore >= paper.cutoffScore.UR;

    const sectionBreakdown = Object.values(sectionStats).map((st) => ({
      ...st,
      score: Math.round(st.score * 100) / 100,
      accuracy: st.attempted > 0 ? Math.round((st.correct / st.attempted) * 1000) / 10 : 0,
      clearedCutoff: st.score >= st.sectionalCutoff
    }));

    const result: TestResult = {
      paperId: paper.id,
      paperTitle: paper.paperTitle,
      examTitle: paper.examTitle,
      totalScore,
      maxScore,
      positiveScore: Math.round(positiveScore * 100) / 100,
      negativeScore: Math.round(negativeScore * 100) / 100,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracyPercentage,
      percentile,
      allIndiaRank: rank,
      totalCandidates,
      totalTimeSeconds: paper.durationMinutes * 60 - remainingSeconds,
      cutoffCleared,
      sectionBreakdown,
      responses,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onFinishTest(result);
  };

  const currentOption = responses[currentQuestion.id]?.selectedOptionIndex ?? null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col h-screen select-none font-sans overflow-hidden">
      {/* Real TCS iON Exam Header */}
      <ExamHeader
        paperTitle={paper.paperTitle}
        sections={paper.sections}
        currentSection={currentSectionName}
        onSelectSection={handleSelectSection}
        remainingSeconds={remainingSeconds}
        selectedLanguage={selectedLanguage}
        onToggleLanguage={setSelectedLanguage}
        onOpenQuestionPaper={() => setIsQuestionPaperOpen(true)}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        onToggleCalculator={() => setIsCalculatorOpen((prev) => !prev)}
      />

      {/* Main Workspace: Left Question Area + Right Question Palette */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Question Pane */}
        <QuestionPane
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          totalQuestionsInSection={
            paper.questions.filter((q) => q.section === currentSectionName).length
          }
          selectedOption={currentOption}
          onSelectOption={handleSelectOption}
          onSaveAndNext={handleSaveAndNext}
          onMarkForReviewAndNext={handleMarkForReviewAndNext}
          onClearResponse={handleClearResponse}
          onPrevious={handlePrevious}
          hasPrevious={currentQuestionIndex > 0}
          selectedLanguage={selectedLanguage}
        />

        {/* Right: Question Palette */}
        <QuestionPalette
          questions={paper.questions}
          currentQuestionIndex={currentQuestionIndex}
          onSelectQuestion={setCurrentQuestionIndex}
          responses={responses}
          onSubmitTest={() => setIsSubmitModalOpen(true)}
        />
      </div>

      {/* Tool Modals */}
      <ExamCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <QuestionPaperModal
        isOpen={isQuestionPaperOpen}
        onClose={() => setIsQuestionPaperOpen(false)}
        questions={paper.questions}
        paperTitle={paper.paperTitle}
      />

      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        negativeMarkingRatio={paper.negativeMarkingRatio}
      />

      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirmSubmit={() => {
          setIsSubmitModalOpen(false);
          handleFinalEvaluation();
        }}
        sections={paper.sections}
        questions={paper.questions}
        responses={responses}
        remainingSeconds={remainingSeconds}
      />
    </div>
  );
};
