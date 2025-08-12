import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizz } from '../modules/quizz/entity/Quizz';
import { Question } from '../modules/quizz/entity/Question';
import { Answer } from '../modules/quizz/entity/Answer';
import { QuestionType } from '../modules/quizz/entity/Question';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Quizz)
    private quizzRepository: Repository<Quizz>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async seed() {
    try {
      this.logger.log('Starting database seeding...');

      const existingQuizzes = await this.quizzRepository.count();
      if (existingQuizzes > 0) {
        this.logger.log('Database already contains data. Skipping seeding.');
        return;
      }

      await this.createJavaScriptQuiz();
      await this.createMathQuiz();
      await this.createHistoryQuiz();
      await this.createScienceQuiz();

      this.logger.log('Database seeding completed successfully!');
    } catch (error) {
      this.logger.error('Error during seeding:', error);
      throw error;
    }
  }

  private async createJavaScriptQuiz() {
    const quiz = await this.quizzRepository.save({
      title: 'JavaScript Fundamentals',
    });

    const question1 = await this.questionRepository.save({
      question: 'Is JavaScript a compiled language?',
      type: QuestionType.BOOLEAN,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'True', isCorrect: false, questionId: question1.id },
      { answer: 'False', isCorrect: true, questionId: question1.id },
    ]);

    const question2 = await this.questionRepository.save({
      question: 'What does DOM stand for in web development?',
      type: QuestionType.INPUT,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'Document Object Model', isCorrect: true, questionId: question2.id },
    ]);

    const question3 = await this.questionRepository.save({
      question: 'Which of the following are JavaScript data types?',
      type: QuestionType.CHECKBOX,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'String', isCorrect: true, questionId: question3.id },
      { answer: 'Number', isCorrect: true, questionId: question3.id },
      { answer: 'Boolean', isCorrect: true, questionId: question3.id },
      { answer: 'Array', isCorrect: true, questionId: question3.id },
      { answer: 'Object', isCorrect: true, questionId: question3.id },
      { answer: 'Function', isCorrect: false, questionId: question3.id },
    ]);

    this.logger.log(`Created JavaScript quiz with ID: ${quiz.id}`);
  }

  private async createMathQuiz() {
    const quiz = await this.quizzRepository.save({
      title: 'Basic Mathematics',
    });

    const question1 = await this.questionRepository.save({
      question: 'Is the square root of 16 equal to 4?',
      type: QuestionType.BOOLEAN,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'True', isCorrect: true, questionId: question1.id },
      { answer: 'False', isCorrect: false, questionId: question1.id },
    ]);

    const question2 = await this.questionRepository.save({
      question: 'What is 7 x 8?',
      type: QuestionType.INPUT,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: '56', isCorrect: true, questionId: question2.id },
    ]);

    const question3 = await this.questionRepository.save({
      question: 'Which of the following are prime numbers?',
      type: QuestionType.CHECKBOX,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: '2', isCorrect: true, questionId: question3.id },
      { answer: '3', isCorrect: true, questionId: question3.id },
      { answer: '5', isCorrect: true, questionId: question3.id },
      { answer: '7', isCorrect: true, questionId: question3.id },
      { answer: '4', isCorrect: false, questionId: question3.id },
      { answer: '6', isCorrect: false, questionId: question3.id },
    ]);

    this.logger.log(`Created Math quiz with ID: ${quiz.id}`);
  }

  private async createHistoryQuiz() {
    const quiz = await this.quizzRepository.save({
      title: 'World History',
    });

    const question1 = await this.questionRepository.save({
      question: 'Did World War II end in 1945?',
      type: QuestionType.BOOLEAN,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'True', isCorrect: true, questionId: question1.id },
      { answer: 'False', isCorrect: false, questionId: question1.id },
    ]);

    const question2 = await this.questionRepository.save({
      question: 'In which year did Christopher Columbus discover America?',
      type: QuestionType.INPUT,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: '1492', isCorrect: true, questionId: question2.id },
    ]);

    const question3 = await this.questionRepository.save({
      question: 'Which of the following were ancient civilizations?',
      type: QuestionType.CHECKBOX,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'Egyptian', isCorrect: true, questionId: question3.id },
      { answer: 'Roman', isCorrect: true, questionId: question3.id },
      { answer: 'Greek', isCorrect: true, questionId: question3.id },
      { answer: 'Mayan', isCorrect: true, questionId: question3.id },
      { answer: 'American', isCorrect: false, questionId: question3.id },
      { answer: 'Canadian', isCorrect: false, questionId: question3.id },
    ]);

    this.logger.log(`Created History quiz with ID: ${quiz.id}`);
  }

  private async createScienceQuiz() {
    const quiz = await this.quizzRepository.save({
      title: 'General Science',
    });

    const question1 = await this.questionRepository.save({
      question: 'Is water composed of hydrogen and oxygen?',
      type: QuestionType.BOOLEAN,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'True', isCorrect: true, questionId: question1.id },
      { answer: 'False', isCorrect: false, questionId: question1.id },
    ]);

    const question2 = await this.questionRepository.save({
      question: 'What is the chemical symbol for gold?',
      type: QuestionType.INPUT,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'Au', isCorrect: true, questionId: question2.id },
    ]);

    const question3 = await this.questionRepository.save({
      question: 'Which of the following are planets in our solar system?',
      type: QuestionType.CHECKBOX,
      quizzId: quiz.id,
    });

    await this.answerRepository.save([
      { answer: 'Earth', isCorrect: true, questionId: question3.id },
      { answer: 'Mars', isCorrect: true, questionId: question3.id },
      { answer: 'Jupiter', isCorrect: true, questionId: question3.id },
      { answer: 'Venus', isCorrect: true, questionId: question3.id },
      { answer: 'Moon', isCorrect: false, questionId: question3.id },
      { answer: 'Sun', isCorrect: false, questionId: question3.id },
    ]);

    this.logger.log(`Created Science quiz with ID: ${quiz.id}`);
  }
}
