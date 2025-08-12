import { Question } from "./Question";

export interface Quizz {
    id: number;
    title: string;
    questions: Question[];
}