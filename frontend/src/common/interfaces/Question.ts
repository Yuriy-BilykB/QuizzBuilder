import { Answer } from "./Answer";

export enum QuestionType {
    BOOLEAN = 'boolean',
    INPUT = 'input',
    CHECKBOX = 'checkbox'
}

export interface Question {
    id: number;
    question: string;
    type: QuestionType;
    quizzId: number;
    answers: Answer[];
}