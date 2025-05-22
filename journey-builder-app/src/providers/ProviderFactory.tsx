import React from 'react';
import { useGraph } from '../hooks/useContext';
import { DirectDependencyProvider, TransitiveDependencyProvider, GlobalDataProvider } from './providerImplementations';
import { 
  DirectDependencyContext, 
  TransitiveDependencyContext, 
  GlobalDataContext 
} from '../contexts/ProviderContexts';

// Common provider props interface
interface ProviderProps {
  children: React.ReactNode;
}

// Provider for Direct Dependencies
export const DirectDependencyProviderProvider: React.FC<ProviderProps> = ({ children }) => {
  const graph = useGraph();
  const provider = new DirectDependencyProvider(graph);
  
  return (
    <DirectDependencyContext.Provider value={provider}>
      {children}
    </DirectDependencyContext.Provider>
  );
};

// Provider for Transitive Dependencies
export const TransitiveDependencyProviderProvider: React.FC<ProviderProps> = ({ children }) => {
  const graph = useGraph();
  const provider = new TransitiveDependencyProvider(graph);
  
  return (
    <TransitiveDependencyContext.Provider value={provider}>
      {children}
    </TransitiveDependencyContext.Provider>
  );
};

// Provider for Global Data
export const GlobalDataProviderProvider: React.FC<ProviderProps> = ({ children }) => {
  const provider = new GlobalDataProvider();
  
  return (
    <GlobalDataContext.Provider value={provider}>
      {children}
    </GlobalDataContext.Provider>
  );
};

// Combined provider component
export const AllProvidersProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <DirectDependencyProviderProvider>
      <TransitiveDependencyProviderProvider>
        <GlobalDataProviderProvider>
          {children}
        </GlobalDataProviderProvider>
      </TransitiveDependencyProviderProvider>
    </DirectDependencyProviderProvider>
  );
};