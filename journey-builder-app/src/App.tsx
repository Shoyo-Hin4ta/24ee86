import { useState } from 'react';
import type { ErrorInfo } from 'react';
import { GraphProvider } from './contexts/GraphContext';
import { PrefillProvider } from './contexts/PrefillContext';
import { AllProvidersProvider } from './providers/ProviderFactory';
import { ProviderRegistryProvider } from './contexts/ProviderRegistryContext';
import FormList from './components/forms/FormList';
import PrefillConfig from './components/prefill/PrefillConfig';
import DataSourceModal from './components/prefill/DataSourceModal';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AppContainer, ErrorFallback } from './styles/App.styles';

// Function to log errors to a monitoring service
const logError = (error: Error, errorInfo: ErrorInfo) => {
  // In a real app, you would send this to your error tracking service
  // e.g., Sentry, LogRocket, etc.
  console.error('Captured error:', error, errorInfo);
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState('');
  
  const handleOpenModal = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  return (
    <ErrorBoundary 
      onError={logError}
      fallback={<ErrorFallback>An error occurred. Please refresh the page.</ErrorFallback>}
    >
      <GraphProvider>
        <AllProvidersProvider>
          <ProviderRegistryProvider>
            <PrefillProvider>
              <AppContainer>
                <FormList />
                <PrefillConfig onOpenModal={handleOpenModal} />
                <DataSourceModal 
                  isOpen={modalOpen} 
                  onClose={handleCloseModal}
                  fieldId={selectedFieldId}
                />
              </AppContainer>
            </PrefillProvider>
          </ProviderRegistryProvider>
        </AllProvidersProvider>
      </GraphProvider>
    </ErrorBoundary>
  );
}

export default App;