import { QuestionType } from "./Question";
import { CreateAnswerDto } from "./CreateAnswerDto";

export interface CreateQuestionDto {
    question: string;
    type: QuestionType;
    answers: CreateAnswerDto[];
}
