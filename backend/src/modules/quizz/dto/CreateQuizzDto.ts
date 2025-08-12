import { IsString, IsNotEmpty, IsArray, ValidateNested, IsEnum, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../entity/Question';

export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    answer: string;
    
    @IsBoolean()
    isCorrect: boolean;
}

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    question: string;
    
    @IsEnum(QuestionType)
    type: QuestionType;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    answers: CreateAnswerDto[];
}

export class CreateQuizzDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[];
}
