'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GetQuizAndQuestions } from '@/common/interfaces';
import { getQuizzes, deleteQuizz } from '@/services/quizzesServices';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

export default function QuizeesComponent() {
  const [quizzes, setQuizzes] = useState<GetQuizAndQuestions[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { error, handleError, clearError, handleAsyncError } = useErrorHandler();

  const fetchData = async () => {
    const data = await handleAsyncError(async () => {
      const result = await getQuizzes();
      return result;
    });
    
    if (data) {
      setQuizzes(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    clearError();
    
    const result = await handleAsyncError(async () => {
      await deleteQuizz(id);
      setQuizzes(quizzes.filter((q) => q.id !== id));
    });
    
    setDeletingId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading quizzes..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            All Quizzes
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover and take amazing quizzes created by our community
          </p>
        </div>

        <ErrorDisplay error={error} onClose={clearError} />

        {quizzes.length === 0 ? (
          <div className="text-center py-20 slide-up">
            <div className="w-24 h-24 gradient-bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-4">No Quizzes Yet</h2>
            <p className="text-gray-300 mb-8">Be the first to create an amazing quiz!</p>
            <Link href="/create" className="btn btn-secondary">
              Create Your First Quiz
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz, index) => (
              <div 
                key={quiz.id} 
                className="quiz-card card hover-lift slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold gradient-text mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {quiz.questionCount} questions
                    </p>
                  </div>
                  <div className="w-12 h-12 gradient-bg-accent rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Q</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link 
                    href={`/quizzes/${quiz.id}`}
                    className="btn btn-primary w-full text-center"
                  >
                    Take Quiz
                  </Link>
                  
                  <button 
                    onClick={() => handleDelete(quiz.id)}
                    disabled={deletingId === quiz.id}
                    className="btn btn-outline w-full text-center text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === quiz.id ? (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner size="sm" text="" />
                        <span className="ml-2">Deleting...</span>
                      </div>
                    ) : (
                                              'Delete Quiz'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16 slide-up">
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Want to Create Your Own Quiz?
            </h2>
            <p className="text-gray-300 mb-6">
              Join our community and share your knowledge with others
            </p>
            <Link href="/create" className="btn btn-secondary">
              Create New Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
