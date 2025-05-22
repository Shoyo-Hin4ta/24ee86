import React, { createContext, useEffect } from 'react';
import type { DataSourceRegistry } from '../types/providers';
import { DataSourceRegistry as DataSourceRegistryClass } from '../types/providers';
import { 
  DirectDependencyContext, 
  TransitiveDependencyContext, 
  GlobalDataContext 
} from './ProviderContexts';
import { useContext as useReactContext } from 'react';

// Create a singleton instance of the registry
const dataSourceRegistry = new DataSourceRegistryClass();

// Context for the provider registry
const ProviderRegistryContext = createContext<DataSourceRegistry | undefined>(undefined);

export const ProviderRegistryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get provider instances directly from contexts
  const directDependencyProvider = useReactContext(DirectDependencyContext);
  const transitiveDependencyProvider = useReactContext(TransitiveDependencyContext);
  const globalDataProvider = useReactContext(GlobalDataContext);
  
  // Register providers with the registry
  useEffect(() => {
    if (directDependencyProvider) {
      dataSourceRegistry.register(directDependencyProvider);
    }
    
    if (transitiveDependencyProvider) {
      dataSourceRegistry.register(transitiveDependencyProvider);
    }
    
    if (globalDataProvider) {
      dataSourceRegistry.register(globalDataProvider);
    }
  }, [directDependencyProvider, transitiveDependencyProvider, globalDataProvider]);
  
  return (
    <ProviderRegistryContext.Provider value={dataSourceRegistry}>
      {children}
    </ProviderRegistryContext.Provider>
  );
};

export default ProviderRegistryContext;