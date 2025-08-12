import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Quizz } from '../modules/quizz/entity/Quizz';
import { Question } from '../modules/quizz/entity/Question';
import { Answer } from '../modules/quizz/entity/Answer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quizz, Question, Answer]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
