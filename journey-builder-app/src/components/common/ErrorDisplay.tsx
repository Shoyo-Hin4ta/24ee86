import React from 'react';
import { 
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  RetryButton
} from '../../styles/common/ErrorDisplay.styles';

interface ErrorDisplayProps {
  error: Error | null;
  message?: string;
  onRetry?: () => void;
}

/**
 * A component for displaying error messages to the user with an optional retry button
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  error, 
  message = 'An error occurred. Please try again.',
  onRetry
}) => {
  return (
    <ErrorContainer>
      <ErrorTitle>Oops! Something went wrong</ErrorTitle>
      <ErrorMessage>
        {message}
      </ErrorMessage>
      {error && (
        <ErrorMessage>
          <strong>Error details:</strong> {error.message}
        </ErrorMessage>
      )}
      {onRetry && (
        <RetryButton onClick={onRetry}>
          Try Again
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorDisplay;