import { Module } from '@nestjs/common';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizz } from './entity/Quizz';
import { Question } from './entity/Question';
import { Answer } from './entity/Answer';

@Module({
  imports: [TypeOrmModule.forFeature([Quizz, Question, Answer])],
  controllers: [QuizzController],
  providers: [QuizzService],
})
export class QuizzModule {}