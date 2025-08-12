'use client';

import { useForm, useFieldArray } from "react-hook-form";
import { createQuizz } from "@/services/quizzesServices";
import { QuestionType, CreateQuestionDto, CreateQuizzDto } from "@/common/interfaces";
import { useRouter } from "next/navigation";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import ErrorDisplay from "./ErrorDisplay";

interface FormData {
  title: string;
  questions: CreateQuestionDto[];
}

export default function FormQuizComponent() {
  const router = useRouter();
  const { error, handleError, clearError, handleAsyncError } = useErrorHandler();
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      questions: []
    }
  });

  const { fields: questions, append: addQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: "questions"
  });

  const addNewQuestion = () => {
    addQuestion({
      question: "",
      type: QuestionType.INPUT,
      answers: []
    });
  };

  const updateQuestionType = (questionIndex: number, newType: QuestionType) => {
    setValue(`questions.${questionIndex}.type`, newType);
    
    if (newType === QuestionType.BOOLEAN) {
      setValue(`questions.${questionIndex}.answers`, [
        { answer: "True", isCorrect: false },
        { answer: "False", isCorrect: false }
      ]);
    } else {
      setValue(`questions.${questionIndex}.answers`, []);
    }
  };

  const addAnswer = (questionIndex: number) => {
    const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
    setValue(`questions.${questionIndex}.answers`, [
      ...currentAnswers,
      { answer: "", isCorrect: false }
    ]);
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const currentAnswers = watch(`questions.${questionIndex}.answers`) || [];
    const updatedAnswers = currentAnswers.filter((_, index) => index !== answerIndex);
    setValue(`questions.${questionIndex}.answers`, updatedAnswers);
  };

  const handleTrueFalseSelection = (questionIndex: number, selectedAnswer: "True" | "False") => {
    setValue(`questions.${questionIndex}.answers`, [
      { answer: "True", isCorrect: selectedAnswer === "True" },
      { answer: "False", isCorrect: selectedAnswer === "False" }
    ]);
  };

  const onSubmit = async (data: FormData) => {
    const result = await handleAsyncError(async () => {
      const quiz: CreateQuizzDto = { 
        title: data.title, 
        questions: data.questions 
      };
      await createQuizz(quiz);
      router.push("/quizzes");
    });
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Create Quiz
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Build an amazing quiz with multiple question types and answers
          </p>
        </div>

        <ErrorDisplay error={error} onClose={clearError} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="card slide-up">
            <h2 className="text-2xl font-bold gradient-text mb-6">Quiz Information</h2>
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Quiz Title</label>
              <input 
                type="text"
                {...register("title", { required: "Quiz title is required" })}
                className="input"
                placeholder="Enter your quiz title..."
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold gradient-text">Questions</h2>
              <button 
                type="button" 
                onClick={addNewQuestion}
                className="btn btn-accent"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Question
              </button>
            </div>

            {questions.map((question, questionIndex) => {
              const questionType = watch(`questions.${questionIndex}.type`);
              const answers = watch(`questions.${questionIndex}.answers`) || [];
              
              return (
                <div key={question.id} className="question-card slide-up" style={{ animationDelay: `${questionIndex * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold gradient-text">Question {questionIndex + 1}</h3>
                    <button 
                      type="button" 
                      onClick={() => removeQuestion(questionIndex)}
                      className="btn btn-outline text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Question Text</label>
                      <input
                        type="text"
                        placeholder="Enter your question..."
                        {...register(`questions.${questionIndex}.question`, { 
                          required: "Question text is required" 
                        })}
                        className="input"
                      />
                      {errors.questions?.[questionIndex]?.question && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.questions[questionIndex]?.question?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Question Type</label>
                      <select
                        {...register(`questions.${questionIndex}.type`)}
                        onChange={(e) => updateQuestionType(questionIndex, e.target.value as QuestionType)}
                        className="input"
                      >
                        <option value={QuestionType.INPUT}>Text Input</option>
                        <option value={QuestionType.BOOLEAN}>True/False</option>
                        <option value={QuestionType.CHECKBOX}>Multiple Choice</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-gray-300 font-medium">Answers</label>
                        {questionType !== QuestionType.BOOLEAN && (
                          <div className="py-2">
                            <button 
                              type="button" 
                              onClick={() => addAnswer(questionIndex)}
                              className="btn btn-secondary text-sm"
                            >
                              Add Answer
                            </button>
                          </div>
                        )}
                      </div>

                      {questionType === QuestionType.BOOLEAN ? (
                        <div className="space-y-4">
                          <div className="answer-option">
                            <label className="flex items-center space-x-4 cursor-pointer w-full">
                              <input
                                type="radio"
                                name={`question-${questionIndex}`}
                                checked={answers.find(a => a.answer === "True")?.isCorrect || false}
                                onChange={() => handleTrueFalseSelection(questionIndex, "True")}
                                className="w-5 h-5 text-blue-600 bg-transparent border-2 border-gray-300 rounded-full focus:ring-blue-500"
                              />
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 gradient-bg-primary rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">T</span>
                                </div>
                                <span className="text-lg text-gray-300 font-medium">True</span>
                              </div>
                            </label>
                          </div>
                          <div className="answer-option">
                            <label className="flex items-center space-x-4 cursor-pointer w-full">
                              <input
                                type="radio"
                                name={`question-${questionIndex}`}
                                checked={answers.find(a => a.answer === "False")?.isCorrect || false}
                                onChange={() => handleTrueFalseSelection(questionIndex, "False")}
                                className="w-5 h-5 text-blue-600 bg-transparent border-2 border-gray-300 rounded-full focus:ring-blue-500"
                              />
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 gradient-bg-secondary rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">F</span>
                                </div>
                                <span className="text-lg text-gray-300 font-medium">False</span>
                              </div>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {answers.map((answer, answerIndex) => (
                            <div key={answerIndex} className="answer-option">
                              <div className="flex items-center gap-4 w-full">
                                <input
                                  type="text"
                                  placeholder="Enter answer option..."
                                  {...register(`questions.${questionIndex}.answers.${answerIndex}.answer`, {
                                    required: "Answer text is required"
                                  })}
                                  className="input flex-1"
                                />
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      {...register(`questions.${questionIndex}.answers.${answerIndex}.isCorrect`)}
                                      className="w-4 h-4 text-blue-600 bg-transparent border-2 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-300 text-sm whitespace-nowrap">Correct</span>
                                  </label>
                                  <button 
                                    type="button" 
                                    onClick={() => removeAnswer(questionIndex, answerIndex)}
                                    className="btn btn-outline text-red-400 hover:text-red-300 text-sm px-3 py-2"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                              {errors.questions?.[questionIndex]?.answers?.[answerIndex]?.answer && (
                                <p className="text-red-400 text-sm mt-1">
                                  {errors.questions[questionIndex]?.answers?.[answerIndex]?.answer?.message}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-8">
            <button 
              type="submit" 
              disabled={isSubmitting || questions.length === 0}
              className="btn btn-success text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="spinner w-5 h-5 mr-3"></div>
                  Creating Quiz...
                </div>
              ) : (
                'Create Quiz'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}