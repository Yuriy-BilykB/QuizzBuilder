'use client';

import { useState, useCallback } from 'react';
import { AppError } from '@/common/interfaces/Error';

export const useErrorHandler = () => {
  const [error, setError] = useState<AppError | null>(null);

  const handleError = useCallback((error: any) => {
    if (error && typeof error === 'object' && 'type' in error) {
      setError(error as AppError);
    } else {
      setError({
        type: 'UNKNOWN' as any,
        message: error?.message || 'Unknown error',
        originalError: error,
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFunction: () => Promise<T>
  ): Promise<T | null> => {
    try {
      clearError();
      return await asyncFunction();
    } catch (err) {
      handleError(err);
      return null;
    }
  }, [handleError, clearError]);

  return {
    error,
    setError,
    handleError,
    clearError,
    handleAsyncError,
  };
};
