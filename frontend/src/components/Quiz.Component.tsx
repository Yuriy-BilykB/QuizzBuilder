'use client';

import { useEffect, useState } from "react";
import { Quizz, Answer } from "@/common/interfaces";
import { getQuizzById } from "@/services/quizzesServices";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import ErrorDisplay from "./ErrorDisplay";

const QuizComponent = () => {
  const params = useParams();
  const id = Number(params.id);
  const [quiz, setQuiz] = useState<Quizz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number[] }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { error, handleError, clearError, handleAsyncError } = useErrorHandler();

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await handleAsyncError(async () => {
        setLoading(true);
        const result = await getQuizzById(id);
        setQuiz(result);
        return result;
      });
      
      setLoading(false);
    };
    fetchQuiz();
  }, [id, handleAsyncError]);

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: prev[questionId]?.includes(answerId) 
        ? prev[questionId].filter(id => id !== answerId)
        : [...(prev[questionId] || []), answerId]
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!quiz) return;
    
    let correctAnswers = 0;
    let totalQuestions = quiz.questions.length;

    quiz.questions.forEach(question => {
      const selected = selectedAnswers[question.id] || [];
      const correct = question.answers.filter(answer => answer.isCorrect).map(answer => answer.id);
      
      if (selected.length === correct.length && 
          selected.every(id => correct.includes(id))) {
        correctAnswers++;
      }
    });

    setScore(Math.round((correctAnswers / totalQuestions) * 100));
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-300">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen py-8 px-6">
        <div className="container mx-auto max-w-2xl">
          <ErrorDisplay error={error} onClose={clearError} />
          
          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text mb-4">Quiz Not Found</h1>
            <p className="text-gray-300 mb-8">The quiz you're looking for doesn't exist.</p>
            <Link href="/quizzes" className="btn btn-primary">
              Back to Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen py-8 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="card text-center slide-up">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl font-bold">
              {score >= 80 ? (
                <div className="gradient-bg-success rounded-full w-full h-full flex items-center justify-center">
                  🎉
                </div>
              ) : score >= 60 ? (
                <div className="gradient-bg-warning rounded-full w-full h-full flex items-center justify-center">
                  👍
                </div>
              ) : (
                <div className="gradient-bg-secondary rounded-full w-full h-full flex items-center justify-center">
                  📚
                </div>
              )}
            </div>
            
            <h1 className="text-4xl font-bold gradient-text mb-4">Quiz Complete!</h1>
            <p className="text-2xl font-bold mb-6">
              Your Score: <span className="gradient-text">{score}%</span>
            </p>
            
            <div className="mb-8">
              {score >= 80 && (
                <p className="text-green-400 text-lg">Excellent! You're a quiz master! 🏆</p>
              )}
              {score >= 60 && score < 80 && (
                <p className="text-yellow-400 text-lg">Good job! Keep learning! 📖</p>
              )}
              {score < 60 && (
                <p className="text-red-400 text-lg">Keep practicing! You'll get better! 💪</p>
              )}
            </div>

            <div className="space-y-4">
              <button onClick={resetQuiz} className="btn btn-primary w-full">
                Try Again
              </button>
              <Link href="/quizzes" className="btn btn-outline w-full">
                Back to Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="card mb-8 fade-in">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold gradient-text">{quiz.title}</h1>
            <div className="text-right">
              <p className="text-gray-300">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="gradient-bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="question-card slide-up">
          <h2 className="text-2xl font-bold gradient-text mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.answers.map((answer) => (
              <div
                key={answer.id}
                className={`answer-option cursor-pointer ${
                  selectedAnswers[currentQuestion.id]?.includes(answer.id) ? 'selected' : ''
                }`}
                onClick={() => handleAnswerSelect(currentQuestion.id, answer.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion.id]?.includes(answer.id)
                      ? 'gradient-bg-primary border-transparent'
                      : 'border-gray-400'
                  }`}>
                    {selectedAnswers[currentQuestion.id]?.includes(answer.id) && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-lg">{answer.answer}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswers[currentQuestion.id] || selectedAnswers[currentQuestion.id].length === 0}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
