'use client';

import React from 'react';
import { AppError, ErrorType } from '@/common/interfaces/Error';

interface ErrorDisplayProps {
  error: AppError | null;
  onClose?: () => void;
  className?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onClose, className = '' }) => {
  if (!error) return null;

  const getErrorIcon = () => {
    switch (error.type) {
      case ErrorType.VALIDATION:
        return '⚠️';
      case ErrorType.NETWORK_ERROR:
        return '🌐';
      case ErrorType.SERVER_ERROR:
        return '🔧';
      case ErrorType.NOT_FOUND:
        return '🔍';
      case ErrorType.UNAUTHORIZED:
        return '🔒';
      case ErrorType.FORBIDDEN:
        return '🚫';
      default:
        return '❌';
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case ErrorType.VALIDATION:
        return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case ErrorType.NETWORK_ERROR:
        return 'border-orange-500 bg-orange-50 text-orange-800';
      case ErrorType.SERVER_ERROR:
        return 'border-red-500 bg-red-50 text-red-800';
      case ErrorType.NOT_FOUND:
        return 'border-blue-500 bg-blue-50 text-blue-800';
      case ErrorType.UNAUTHORIZED:
        return 'border-purple-500 bg-purple-50 text-purple-800';
      case ErrorType.FORBIDDEN:
        return 'border-red-600 bg-red-50 text-red-900';
      default:
        return 'border-gray-500 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className={`border-l-4 p-4 mb-4 rounded-r-lg ${getErrorColor()} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <span className="text-xl">{getErrorIcon()}</span>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">
              {error.type === ErrorType.VALIDATION ? 'Validation Error' :
               error.type === ErrorType.NETWORK_ERROR ? 'Connection Error' :
               error.type === ErrorType.SERVER_ERROR ? 'Server Error' :
               error.type === ErrorType.NOT_FOUND ? 'Not Found' :
               error.type === ErrorType.UNAUTHORIZED ? 'Authentication Required' :
               error.type === ErrorType.FORBIDDEN ? 'Access Denied' :
               'Error'}
            </h3>
            <p className="text-sm mb-2">{error.message}</p>
            
            {error.details && error.details.length > 0 && (
              <div className="mt-2">
                <ul className="list-disc list-inside text-sm space-y-1">
                  {error.details.map((detail, index) => (
                    <li key={index} className="text-xs">{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {error.statusCode && (
              <p className="text-xs mt-2 opacity-75">
                Error Code: {error.statusCode}
              </p>
            )}
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close error message"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
