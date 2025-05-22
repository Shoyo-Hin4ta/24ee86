import { useContext as useReactContext } from 'react';
import type { GraphContextType } from '../types/graph';
import type { PrefillContextType } from '../types/prefill';
import type { DataSourceRegistry, DirectDependencyProvider, TransitiveDependencyProvider, GlobalDataProvider } from '../types/providers';

import GraphContext from '../contexts/GraphContext';
import PrefillContext from '../contexts/PrefillContext';
import ProviderRegistryContext from '../contexts/ProviderRegistryContext';
import { 
  DirectDependencyContext, 
  TransitiveDependencyContext, 
  GlobalDataContext 
} from '../contexts/ProviderContexts';

// Graph context hook
export const useGraph = (): GraphContextType => {
  const context = useReactContext(GraphContext);
  if (context === undefined) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
};

// Prefill context hook
export const usePrefill = (): PrefillContextType => {
  const context = useReactContext(PrefillContext);
  if (context === undefined) {
    throw new Error('usePrefill must be used within a PrefillProvider');
  }
  return context;
};

// Provider registry hook
export const useProviderRegistry = (): DataSourceRegistry => {
  const context = useReactContext(ProviderRegistryContext);
  if (context === undefined) {
    throw new Error('useProviderRegistry must be used within a ProviderRegistryProvider');
  }
  return context;
};

// Dependency provider hooks
export const useDirectDependencyProvider = (): DirectDependencyProvider => {
  const context = useReactContext(DirectDependencyContext);
  if (context === undefined) {
    throw new Error('useDirectDependencyProvider must be used within a DirectDependencyProviderProvider');
  }
  return context;
};

export const useTransitiveDependencyProvider = (): TransitiveDependencyProvider => {
  const context = useReactContext(TransitiveDependencyContext);
  if (context === undefined) {
    throw new Error('useTransitiveDependencyProvider must be used within a TransitiveDependencyProviderProvider');
  }
  return context;
};

// Global data provider hook
export const useGlobalDataProvider = (): GlobalDataProvider => {
  const context = useReactContext(GlobalDataContext);
  if (context === undefined) {
    throw new Error('useGlobalDataProvider must be used within a GlobalDataProviderProvider');
  }
  return context;
};