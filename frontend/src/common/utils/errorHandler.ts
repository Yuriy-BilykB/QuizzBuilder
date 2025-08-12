import { ApiError, AppError, ErrorType, ValidationError } from '../interfaces/Error';

export class ErrorHandler {
  static handleApiError(error: any): AppError {
    if (!error.response) {
      return {
        type: ErrorType.NETWORK_ERROR,
        message: 'Connection error with server. Check your internet connection.',
        originalError: error,
      };
    }

    const { response } = error;
    const statusCode = response.status;
    const data = response.data;

    switch (statusCode) {
      case 400:
        return this.handleBadRequest(data);
      case 401:
        return {
          type: ErrorType.UNAUTHORIZED,
          message: 'Authentication required',
          statusCode,
          originalError: error,
        };
      case 403:
        return {
          type: ErrorType.FORBIDDEN,
          message: 'Access denied',
          statusCode,
          originalError: error,
        };
      case 404:
        return {
          type: ErrorType.NOT_FOUND,
          message: 'Resource not found',
          statusCode,
          originalError: error,
        };
      case 422:
        return this.handleValidationError(data);
      case 500:
        return {
          type: ErrorType.SERVER_ERROR,
          message: 'Internal server error',
          statusCode,
          originalError: error,
        };
      default:
        return {
          type: ErrorType.UNKNOWN,
          message: data?.message || 'Unknown error',
          statusCode,
          originalError: error,
        };
    }
  }

  private static handleBadRequest(data: any): AppError {
    if (data?.errors && Array.isArray(data.errors)) {
      return {
        type: ErrorType.VALIDATION,
        message: data.message || 'Validation error',
        details: data.errors,
        statusCode: 400,
      };
    }

    if (data?.message === 'Validation failed' && data?.errors) {
      return {
        type: ErrorType.VALIDATION,
        message: 'Data validation error',
        details: Array.isArray(data.errors) ? data.errors : [data.errors],
        statusCode: 400,
      };
    }

    return {
      type: ErrorType.VALIDATION,
              message: data?.message || 'Invalid data',
      statusCode: 400,
    };
  }

  private static handleValidationError(data: ValidationError): AppError {
    return {
      type: ErrorType.VALIDATION,
      message: data.message,
      details: data.errors,
      statusCode: 422,
    };
  }

  static getErrorMessage(error: AppError): string {
    switch (error.type) {
      case ErrorType.VALIDATION:
        if (error.details && error.details.length > 0) {
          return error.details.join(', ');
        }
        return error.message;
      case ErrorType.NETWORK_ERROR:
        return 'Connection error with server';
      case ErrorType.SERVER_ERROR:
        return 'Internal server error';
      case ErrorType.NOT_FOUND:
        return 'Resource not found';
      case ErrorType.UNAUTHORIZED:
        return 'Authentication required';
      case ErrorType.FORBIDDEN:
        return 'Access denied';
      default:
        return error.message || 'Unknown error';
    }
  }

  static logError(error: AppError): void {
    console.error('Application Error:', {
      type: error.type,
      message: error.message,
      details: error.details,
      statusCode: error.statusCode,
      originalError: error.originalError,
    });
  }
}
