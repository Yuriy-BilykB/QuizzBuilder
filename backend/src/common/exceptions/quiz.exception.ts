import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/error-messages';

export class QuizNotFoundException extends HttpException {
  constructor(quizId: string) {
    super(`${ERROR_MESSAGES.QUIZ.NOT_FOUND} with id ${quizId}`, HttpStatus.NOT_FOUND);
  }
}

export class QuizCreationException extends HttpException {
  constructor(message: string = ERROR_MESSAGES.QUIZ.CREATION_FAILED) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class QuizDeletionException extends HttpException {
  constructor(message: string = ERROR_MESSAGES.QUIZ.DELETION_FAILED) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class QuizFetchException extends HttpException {
  constructor(message: string = ERROR_MESSAGES.QUIZ.FETCH_FAILED) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class InvalidQuizDataException extends HttpException {
  constructor(message: string = ERROR_MESSAGES.QUIZ.INVALID_DATA) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
