import { createContext } from 'react';
import type { DirectDependencyProvider, TransitiveDependencyProvider, GlobalDataProvider } from '../types/providers';

// Create contexts for each provider type
export const DirectDependencyContext = createContext<DirectDependencyProvider | undefined>(undefined);
export const TransitiveDependencyContext = createContext<TransitiveDependencyProvider | undefined>(undefined);
export const GlobalDataContext = createContext<GlobalDataProvider | undefined>(undefined);