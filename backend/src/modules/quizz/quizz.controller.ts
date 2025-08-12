import { Controller, Param, Post, Get, Delete, Body, HttpStatus, HttpCode, UsePipes } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { CreateQuizzDto } from './dto/CreateQuizzDto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('quizzes')
@UsePipes(ValidationPipe)
export class QuizzController {
    constructor(private readonly quizzService: QuizzService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createQuizz(@Body() createQuizzDto: CreateQuizzDto) {
        return await this.quizzService.createQuizz(createQuizzDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getQuizzes() {
        const quizzes = await this.quizzService.getQuizzes();
        return quizzes.map(quiz => ({
            id: quiz.id,
            title: quiz.title,
            questionCount: quiz.questions?.length || 0
        }));
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getQuizzById(@Param('id') id: string) {
        return await this.quizzService.getQuizzById(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteQuizz(@Param('id') id: string) {
        return await this.quizzService.deleteQuizz(id);
    }
}    