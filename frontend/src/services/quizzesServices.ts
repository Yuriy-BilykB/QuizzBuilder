import api from "@/common/axios/axios";
import { Quizz, CreateQuizzDto, GetQuizAndQuestions, AppError } from "@/common/interfaces";

export const getQuizzes = async (): Promise<GetQuizAndQuestions[]> => {
    try {
        return await api.get('/quizzes');
    } catch (error) {
        throw error as AppError;
    }
}

export const createQuizz = async (quizz: CreateQuizzDto): Promise<Quizz> => {
    try {
        return await api.post('/quizzes', quizz);
    } catch (error) {
        throw error as AppError;
    }
}

export const deleteQuizz = async (id: number): Promise<{ message: string }> => {
    try {
        return await api.delete(`/quizzes/${id}`);
    } catch (error) {
        throw error as AppError;
    }
}

export const getQuizzById = async (id: number): Promise<Quizz> => {
    try {
        return await api.get(`/quizzes/${id}`);
    } catch (error) {
        throw error as AppError;
    }
}
