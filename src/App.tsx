import React, { useState } from 'react';
import { ExamPaper, ExamSeries, Question, TestResult } from './types/exam';
import { mockExamSeries, mockCurrentAffairs } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ExamCatalog } from './components/ExamCatalog';
import { PaperExplorerModal } from './components/PaperExplorerModal';
import { ExamSimulator } from './components/ExamSimulator/ExamSimulator';
import { ResultAnalytics } from './components/Analytics/ResultAnalytics';
import { PYQSection } from './components/PYQSection';
import { CurrentAffairsSection } from './components/CurrentAffairsSection';
import { CustomDrillModal } from './components/CustomDrillModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'pyq' | 'current_affairs' | 'analytics' | 'bookmarks'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active Test Simulator state
  const [activePaperForTest, setActivePaperForTest] = useState<ExamPaper | null>(null);
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);

  // Modals
  const [selectedSeriesForExplorer, setSelectedSeriesForExplorer] = useState<ExamSeries | null>(null);
  const [isCustomDrillOpen, setIsCustomDrillOpen] = useState(false);

  // Bookmarked questions
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);
  const bookmarkedQuestionIds = new Set(bookmarkedQuestions.map((q) => q.id));

  // Extract all questions for custom drills
  const allQuestions: Question[] = [];
  mockExamSeries.forEach((s) => {
    s.papers.forEach((p) => {
      p.questions.forEach((q) => {
        if (!allQuestions.some((existing) => existing.id === q.id)) {
          allQuestions.push(q);
        }
      });
    });
  });

  const handleToggleBookmark = (question: Question) => {
    setBookmarkedQuestions((prev) => {
      if (prev.some((q) => q.id === question.id)) {
        return prev.filter((q) => q.id !== question.id);
      } else {
        return [...prev, question];
      }
    });
  };

  const handleRemoveBookmark = (questionId: string) => {
    setBookmarkedQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const handleStartPaper = (paper: ExamPaper) => {
    setActivePaperForTest(paper);
  };

  const handleFinishTest = (result: TestResult) => {
    setLatestResult(result);
    setActivePaperForTest(null);
    setActiveTab('analytics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick Start Free SBI PO Mock
  const handleStartQuickMock = () => {
    const sbi = mockExamSeries.find((s) => s.id === 'sbi-po');
    const freeMock = sbi?.papers.find((p) => p.isFree) || sbi?.papers[0];
    if (freeMock) {
      setActivePaperForTest(freeMock);
    }
  };

  // Launch test from Bookmarks
  const handleStartBookmarkDrill = (questions: Question[]) => {
    const bookmarkPaper: ExamPaper = {
      id: `bookmark-drill-${Date.now()}`,
      examId: 'bookmark-drill',
      examTitle: 'Personal Revision Quiz',
      category: 'banking',
      paperTitle: `Saved Questions Rapid Drill (${questions.length} Qs)`,
      paperType: 'mini_mock',
      isFree: true,
      totalQuestions: questions.length,
      totalMarks: questions.length,
      durationMinutes: Math.max(5, questions.length * 2),
      negativeMarkingRatio: 0.25,
      cutoffScore: { UR: Math.round(questions.length * 0.7), OBC: 0, EWS: 0, SC: 0, ST: 0 },
      attemptsCount: 1,
      sections: [
        {
          name: questions[0]?.section || 'Quantitative Aptitude',
          durationMinutes: Math.max(5, questions.length * 2),
          totalQuestions: questions.length,
          maxMarks: questions.length
        }
      ],
      questions: questions.map((q, idx) => ({ ...q, questionNumber: idx + 1 }))
    };

    setActivePaperForTest(bookmarkPaper);
  };

  // If Test Simulator is running, render full-screen TCS iON environment!
  if (activePaperForTest) {
    return (
      <ExamSimulator
        paper={activePaperForTest}
        onFinishTest={handleFinishTest}
        onExitTest={() => setActivePaperForTest(null)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCustomDrill={() => setIsCustomDrillOpen(true)}
        onStartQuickMock={handleStartQuickMock}
        hasRecentResult={latestResult !== null}
        bookmarkCount={bookmarkedQuestions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <>
            <HeroBanner
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectExamCode={(code) => {
                setSearchQuery(code);
                const el = document.getElementById('catalog-view');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onStartFreeTest={handleStartQuickMock}
            />

            <div id="catalog-view">
              <ExamCatalog
                seriesList={mockExamSeries}
                searchQuery={searchQuery}
                onSelectPaper={handleStartPaper}
                onExploreSeries={(series) => setSelectedSeriesForExplorer(series)}
              />
            </div>
          </>
        )}

        {activeTab === 'pyq' && (
          <PYQSection
            seriesList={mockExamSeries}
            onStartPaper={handleStartPaper}
          />
        )}

        {activeTab === 'current_affairs' && (
          <CurrentAffairsSection
            items={mockCurrentAffairs}
          />
        )}

        {activeTab === 'analytics' && latestResult && (
          <ResultAnalytics
            result={latestResult}
            paper={
              mockExamSeries
                .flatMap((s) => s.papers)
                .find((p) => p.id === latestResult.paperId) ||
              mockExamSeries[0].papers[0]
            }
            onRetakeTest={() => {
              const p = mockExamSeries
                .flatMap((s) => s.papers)
                .find((p) => p.id === latestResult.paperId);
              if (p) setActivePaperForTest(p);
            }}
            onBackToCatalog={() => setActiveTab('catalog')}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedQuestionIds={bookmarkedQuestionIds}
          />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksDrawer
            bookmarkedQuestions={bookmarkedQuestions}
            onRemoveBookmark={handleRemoveBookmark}
            onClearAll={() => setBookmarkedQuestions([])}
            onStartRevisionQuiz={handleStartBookmarkDrill}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <PaperExplorerModal
        series={selectedSeriesForExplorer}
        onClose={() => setSelectedSeriesForExplorer(null)}
        onStartPaper={handleStartPaper}
        onDownloadPdf={(paper) => {
          setActiveTab('pyq');
          setSelectedSeriesForExplorer(null);
        }}
      />

      <CustomDrillModal
        isOpen={isCustomDrillOpen}
        onClose={() => setIsCustomDrillOpen(false)}
        onLaunchDrill={handleStartPaper}
        allAvailableQuestions={allQuestions}
      />
    </div>
  );
}
