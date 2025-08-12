import { CreateQuestionDto } from "./CreateQuestionDto";

export interface CreateQuizzDto {
    title: string;
    questions: CreateQuestionDto[];
}
