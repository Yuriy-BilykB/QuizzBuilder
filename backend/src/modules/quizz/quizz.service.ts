import { Injectable, Logger } from '@nestjs/common';
import { CreateQuizzDto } from './dto/CreateQuizzDto';
import { Quizz } from './entity/Quizz';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entity/Question';
import { Answer } from './entity/Answer';
import {
  QuizNotFoundException,
  QuizCreationException,
  QuizDeletionException,
  QuizFetchException,
  InvalidQuizDataException,
} from '../../common/exceptions/quiz.exception';
import { ERROR_MESSAGES } from '../../common/constants/error-messages';

@Injectable()
export class QuizzService {
    private readonly logger = new Logger(QuizzService.name);

    constructor(
        @InjectRepository(Quizz)
        private quizzRepository: Repository<Quizz>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>,
    ) {}

    async createQuizz(createQuizzDto: CreateQuizzDto): Promise<Quizz> {
        try {
            if (!createQuizzDto.title || createQuizzDto.title.trim().length === 0) {
                throw new InvalidQuizDataException(ERROR_MESSAGES.QUIZ.TITLE_REQUIRED);
            }

            if (!createQuizzDto.questions || createQuizzDto.questions.length === 0) {
                throw new InvalidQuizDataException(ERROR_MESSAGES.QUIZ.QUESTIONS_REQUIRED);
            }

            const quizz = this.quizzRepository.create({
                title: createQuizzDto.title.trim()
            });
            
            const savedQuizz = await this.quizzRepository.save(quizz);
            this.logger.log(`Created quiz with id: ${savedQuizz.id}`);

            for (const questionDto of createQuizzDto.questions) {
                if (!questionDto.question || questionDto.question.trim().length === 0) {
                    throw new InvalidQuizDataException(ERROR_MESSAGES.QUIZ.QUESTION_TEXT_REQUIRED);
                }

                if (!questionDto.answers || questionDto.answers.length === 0) {
                    throw new InvalidQuizDataException(ERROR_MESSAGES.QUIZ.ANSWERS_REQUIRED);
                }

                const question = this.questionRepository.create({
                    question: questionDto.question.trim(),
                    type: questionDto.type,
                    quizzId: savedQuizz.id
                });
                
                const savedQuestion = await this.questionRepository.save(question);

                for (const answerDto of questionDto.answers) {
                    if (!answerDto.answer || answerDto.answer.trim().length === 0) {
                        throw new InvalidQuizDataException(ERROR_MESSAGES.QUIZ.ANSWER_TEXT_REQUIRED);
                    }

                    const answer = this.answerRepository.create({
                        answer: answerDto.answer.trim(),
                        isCorrect: answerDto.isCorrect,
                        questionId: savedQuestion.id
                    });
                    
                    await this.answerRepository.save(answer);
                }
            }

            return this.getQuizzById(savedQuizz.id.toString());
        } catch (error) {
            this.logger.error(`Failed to create quiz: ${error.message}`, error.stack);
            
            if (error instanceof InvalidQuizDataException) {
                throw error;
            }
            
            throw new QuizCreationException(`Failed to create quiz: ${error.message}`);
        }
    }

    async getQuizzes(): Promise<Quizz[]> {
        try {
            const quizzes = await this.quizzRepository.find({
                relations: ['questions'],
                select: {
                    id: true,
                    title: true,
                    questions: {
                        id: true
                    }
                }
            });
            
            this.logger.log(`Retrieved ${quizzes.length} quizzes`);
            return quizzes;
        } catch (error) {
            this.logger.error(`Failed to fetch quizzes: ${error.message}`, error.stack);
            throw new QuizFetchException(`Failed to fetch quizzes: ${error.message}`);
        }
    }

    async getQuizzById(id: string): Promise<Quizz> {
        try {
            const quizId = parseInt(id);
            
            if (isNaN(quizId)) {
                throw new InvalidQuizDataException(ERROR_MESSAGES.QUIZ.INVALID_ID_FORMAT);
            }

            const quiz = await this.quizzRepository.findOne({ 
                where: { id: quizId },
                relations: ['questions', 'questions.answers']
            });

            if (!quiz) {
                throw new QuizNotFoundException(id);
            }

            this.logger.log(`Retrieved quiz with id: ${id}`);
            return quiz;
        } catch (error) {
            this.logger.error(`Failed to fetch quiz ${id}: ${error.message}`, error.stack);
            
            if (error instanceof QuizNotFoundException || error instanceof InvalidQuizDataException) {
                throw error;
            }
            
            throw new QuizFetchException(`Failed to fetch quiz: ${error.message}`);
        }
    }

    async deleteQuizz(id: string): Promise<{ message: string }> {
        try {
            const quizId = parseInt(id);
            
            if (isNaN(quizId)) {
                throw new InvalidQuizDataException(ERROR_MESSAGES.QUIZ.INVALID_ID_FORMAT);
            }

            const existingQuiz = await this.quizzRepository.findOne({
                where: { id: quizId }
            });

            if (!existingQuiz) {
                throw new QuizNotFoundException(id);
            }

            const questions = await this.questionRepository.find({
                where: { quizzId: quizId }
            });
            
            for (const question of questions) {
                await this.answerRepository.delete({ questionId: question.id });
            }
            
            await this.questionRepository.delete({ quizzId: quizId });
            
            const result = await this.quizzRepository.delete(quizId);
            
            if (result.affected === 0) {
                throw new QuizNotFoundException(id);
            }

            this.logger.log(`Deleted quiz with id: ${id}`);
            return { message: 'Quiz deleted successfully' };
        } catch (error) {
            this.logger.error(`Failed to delete quiz ${id}: ${error.message}`, error.stack);
            
            if (error instanceof QuizNotFoundException || error instanceof InvalidQuizDataException) {
                throw error;
            }
            
            throw new QuizDeletionException(`Failed to delete quiz: ${error.message}`);
        }
    }
}    