import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorHandler } from '../utils/errorHandler';
import { ApiResponse } from '../interfaces/Error';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    timeout: 10000, 
});

api.interceptors.request.use(
    (config) => {
        console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        
        if (response.data && typeof response.data === 'object' && 'data' in response.data) {
            return response.data.data;
        }
        
        return response.data;
    },
    (error: AxiosError) => {
        console.error('❌ Response Error:', error);
        
        const appError = ErrorHandler.handleApiError(error);
        ErrorHandler.logError(appError);
        
        return Promise.reject(appError);
    }
);

export default api;