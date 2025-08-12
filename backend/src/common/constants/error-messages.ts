export const ERROR_MESSAGES = {
  QUIZ: {
    NOT_FOUND: 'Quiz not found',
    CREATION_FAILED: 'Failed to create quiz',
    DELETION_FAILED: 'Failed to delete quiz',
    FETCH_FAILED: 'Failed to fetch quiz',
    INVALID_DATA: 'Invalid quiz data provided',
    TITLE_REQUIRED: 'Quiz title is required',
    QUESTIONS_REQUIRED: 'Quiz must have at least one question',
    QUESTION_TEXT_REQUIRED: 'Question text is required',
    ANSWERS_REQUIRED: 'Question must have at least one answer',
    ANSWER_TEXT_REQUIRED: 'Answer text is required',
    INVALID_ID_FORMAT: 'Invalid quiz ID format',
  },
  VALIDATION: {
    FAILED: 'Validation failed',
    INVALID_INPUT: 'Invalid input data',
  },
  DATABASE: {
    CONNECTION_FAILED: 'Database connection failed',
    QUERY_FAILED: 'Database query failed',
  },
  GENERAL: {
    INTERNAL_ERROR: 'Internal server error',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
  },
} as const;
