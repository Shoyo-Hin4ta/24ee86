import React, { Component } from 'react';
import type { ErrorInfo } from 'react';
import { 
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  ErrorStack,
  ResetButton
} from '../../styles/common/ErrorBoundary.styles';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component that catches JavaScript errors in its child component tree.
 * It logs error information and displays a fallback UI instead of crashing the entire app.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset the error state if props change and resetOnPropsChange is true
    if (
      this.state.hasError && 
      this.props.resetOnPropsChange && 
      prevProps.children !== this.props.children
    ) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({ 
      hasError: false,
      error: null
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // If a custom fallback was provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Otherwise, use our default error UI
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message || 'An unexpected error occurred'}
          </ErrorMessage>
          {this.state.error && (
            <ErrorStack>
              {this.state.error.stack}
            </ErrorStack>
          )}
          <ResetButton onClick={this.resetErrorBoundary}>
            Try Again
          </ResetButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;