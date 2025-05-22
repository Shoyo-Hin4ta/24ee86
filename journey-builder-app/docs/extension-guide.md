# Extension Guide: Adding New Data Sources

This guide provides step-by-step instructions for extending the Journey Builder application with new data source providers without modifying existing code.

## Overview

The Journey Builder application uses a provider-based architecture that allows for easy addition of new data source types. The core principle is **extensibility without code changes** - you can add new providers by implementing interfaces and registering them, without touching existing provider implementations.

## Architecture Components

### 1. Provider Interface (`src/types/providers.ts`)

All data sources implement the `DataSourceProvider` interface:

```typescript
export interface DataSourceProvider {
  id: DataSourceType;                    // Unique identifier
  name: string;                         // Display name
  getAvailableFields(formId: string): FieldOption[];
  getFieldValue(config: DataSourceConfig): string | number | boolean | object | null;
  canHandleForm(formId: string): boolean;
}
```

### 2. Registry System (`src/types/providers.ts`)

The `DataSourceRegistry` class manages all providers:

```typescript
export class DataSourceRegistry {
  register(provider: DataSourceProvider): void;
  getProvider(type: DataSourceType): DataSourceProvider | undefined;
  getAllProviders(): DataSourceProvider[];
  getProvidersForForm(formId: string): DataSourceProvider[];
}
```

### 3. Context Integration (`src/contexts/ProviderRegistryContext.tsx`)

Providers are registered automatically through React Context system.

## Step-by-Step Extension Process

### Step 1: Define Your Provider Type

Add your new provider type to `src/types/prefill.ts`:

```typescript
// Update the DataSourceType union
export type DataSourceType = 'direct' | 'transitive' | 'global' | 'custom' | 'api';

// Add your specific provider interface in src/types/providers.ts
export interface CustomDataProvider extends DataSourceProvider {
  id: 'custom';
}

export interface ApiDataProvider extends DataSourceProvider {
  id: 'api';
}
```

### Step 2: Create Provider Implementation

Create your provider class in `src/providers/providerImplementations.ts`:

```typescript
import type { CustomDataProvider as CustomDataProviderType } from '../types/providers';
import type { FieldOption, DataSourceConfig } from '../types/prefill';

export class CustomDataProvider implements CustomDataProviderType {
  id = 'custom' as const;
  name = 'Custom Data Source';
  
  // Optional: Inject dependencies via constructor
  constructor(private dependencies?: any) {}
  
  getAvailableFields(formId: string): FieldOption[] {
    // Implementation: Return available fields from your data source
    return [
      {
        id: 'custom_field_1',
        label: 'Custom Field 1',
        formId: 'custom_source',
        formName: 'Custom Source',
        fieldType: 'string',
        path: 'Custom Source.Custom Field 1'
      },
      {
        id: 'custom_field_2', 
        label: 'Custom Field 2',
        formId: 'custom_source',
        formName: 'Custom Source',
        fieldType: 'number',
        path: 'Custom Source.Custom Field 2'
      }
    ];
  }
  
  getFieldValue(config: DataSourceConfig): string | number | boolean | object | null {
    // Implementation: Return actual field value
    // In real applications, this might involve API calls or database queries
    return `Custom value from ${config.id}.${config.fieldId}`;
  }
  
  canHandleForm(formId: string): boolean {
    // Implementation: Determine if this provider applies to the given form
    // Example: Only handle forms that start with 'custom_'
    return formId.startsWith('custom_') || true; // or your specific logic
  }
}
```

### Step 3: Create Provider Context

Add your provider context to `src/contexts/ProviderContexts.tsx`:

```typescript
import { createContext } from 'react';
import type { CustomDataProvider } from '../types/providers';

// Add your context export
export const CustomDataContext = createContext<CustomDataProvider | undefined>(undefined);
```

### Step 4: Create Provider Factory Component

Add your provider factory to `src/providers/ProviderFactory.tsx`:

```typescript
import { CustomDataProvider } from './providerImplementations';
import { CustomDataContext } from '../contexts/ProviderContexts';

// Add your provider component
export const CustomDataProviderProvider: React.FC<ProviderProps> = ({ children }) => {
  // Get any dependencies from other contexts if needed
  const graph = useGraph(); // Example: if you need graph data
  
  // Create provider instance
  const provider = new CustomDataProvider(graph);
  
  return (
    <CustomDataContext.Provider value={provider}>
      {children}
    </CustomDataContext.Provider>
  );
};

// Update the AllProvidersProvider to include your new provider
export const AllProvidersProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <DirectDependencyProviderProvider>
      <TransitiveDependencyProviderProvider>
        <GlobalDataProviderProvider>
          <CustomDataProviderProvider>
            {children}
          </CustomDataProviderProvider>
        </GlobalDataProviderProvider>
      </TransitiveDependencyProviderProvider>
    </DirectDependencyProviderProvider>
  );
};
```

### Step 5: Create Custom Hook

Add a custom hook in `src/hooks/useContext.ts`:

```typescript
import { useContext } from 'react';
import { CustomDataContext } from '../contexts/ProviderContexts';
import type { CustomDataProvider } from '../types/providers';

// Add your custom hook export
export const useCustomDataProvider = (): CustomDataProvider => {
  const context = useContext(CustomDataContext);
  if (context === undefined) {
    throw new Error('useCustomDataProvider must be used within a CustomDataProviderProvider');
  }
  return context;
};
```

### Step 6: Register with Registry

Update `src/contexts/ProviderRegistryContext.tsx` to include your provider:

```typescript
import { CustomDataContext } from './ProviderContexts';

export const ProviderRegistryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get all provider instances
  const directDependencyProvider = useReactContext(DirectDependencyContext);
  const transitiveDependencyProvider = useReactContext(TransitiveDependencyContext);
  const globalDataProvider = useReactContext(GlobalDataContext);
  const customDataProvider = useReactContext(CustomDataContext); // Add this line
  
  // Register providers
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
    
    // Register your new provider
    if (customDataProvider) {
      dataSourceRegistry.register(customDataProvider);
    }
  }, [directDependencyProvider, transitiveDependencyProvider, globalDataProvider, customDataProvider]);
  
  return (
    <ProviderRegistryContext.Provider value={dataSourceRegistry}>
      {children}
    </ProviderRegistryContext.Provider>
  );
};
```

### Step 7: Update UI Components (Optional)

The existing `DataSourceModal.tsx` will automatically pick up your new provider through the registry system. However, you can customize the display:

```typescript
// In DataSourceModal.tsx, the provider is automatically included through:
const directProvider = registry.getProvider('direct');
const transitiveProvider = registry.getProvider('transitive'); 
const globalProvider = registry.getProvider('global');
const customProvider = registry.getProvider('custom'); // Automatically available!
```

### Step 8: Add Tests

Create tests for your new provider in `src/tests/`:

```typescript
// src/tests/customProvider.test.ts
import { describe, it, expect } from 'vitest';
import { CustomDataProvider } from '../providers/providerImplementations';

describe('CustomDataProvider', () => {
  let provider: CustomDataProvider;
  
  beforeEach(() => {
    provider = new CustomDataProvider();
  });
  
  it('should return available fields', () => {
    const fields = provider.getAvailableFields('test-form');
    expect(fields).toHaveLength(2); 
    expect(fields[0].id).toBe('custom_field_1');
  });
  
  it('should return field values', () => {
    const config = { id: 'test', fieldId: 'custom_field_1' };
    const value = provider.getFieldValue(config);
    expect(value).toBe('Custom value from test.custom_field_1');
  });
  
  it('should determine form compatibility', () => {
    expect(provider.canHandleForm('custom_form')).toBe(true);
    expect(provider.canHandleForm('other_form')).toBe(true); // Based on your logic
  });
});
```

## Advanced Extension Examples

### API-Based Provider

```typescript
export class ApiDataProvider implements DataSourceProvider {
  id = 'api' as const;
  name = 'External API Data';
  
  constructor(private apiClient: AxiosInstance) {}
  
  async getAvailableFields(formId: string): Promise<FieldOption[]> {
    try {
      const response = await this.apiClient.get(`/api/fields/${formId}`);
      return response.data.map(field => ({
        id: field.id,
        label: field.displayName,
        formId: 'api',
        formName: 'External API',
        fieldType: field.type,
        path: `API.${field.displayName}`
      }));
    } catch (error) {
      console.error('Failed to fetch API fields:', error);
      return [];
    }
  }
  
  async getFieldValue(config: DataSourceConfig): Promise<string | null> {
    try {
      const response = await this.apiClient.get(`/api/values/${config.id}/${config.fieldId}`);
      return response.data.value;
    } catch (error) {
      console.error('Failed to fetch field value:', error);
      return null;
    }
  }
  
  canHandleForm(formId: string): boolean {
    // Only handle forms that have API integration enabled
    return formId.includes('api_enabled');
  }
}
```

### Database Provider with Caching

```typescript
export class DatabaseProvider implements DataSourceProvider {
  id = 'database' as const;
  name = 'Database Records';
  
  private cache = new Map<string, FieldOption[]>();
  
  constructor(private dbConnection: DatabaseConnection) {}
  
  getAvailableFields(formId: string): FieldOption[] {
    // Check cache first
    if (this.cache.has(formId)) {
      return this.cache.get(formId)!;
    }
    
    // Query database
    const fields = this.dbConnection.query(`
      SELECT field_id, field_name, field_type 
      FROM form_fields 
      WHERE form_id = ?
    `, [formId]);
    
    const fieldOptions = fields.map(field => ({
      id: field.field_id,
      label: field.field_name,
      formId: formId,
      formName: `Database Form ${formId}`,
      fieldType: field.field_type,
      path: `Database.${field.field_name}`
    }));
    
    // Cache results
    this.cache.set(formId, fieldOptions);
    
    return fieldOptions;
  }
  
  getFieldValue(config: DataSourceConfig): string | number | boolean | null {
    const result = this.dbConnection.queryOne(`
      SELECT field_value 
      FROM form_data 
      WHERE form_id = ? AND field_id = ?
    `, [config.id, config.fieldId]);
    
    return result?.field_value || null;
  }
  
  canHandleForm(formId: string): boolean {
    // Check if form exists in database
    const exists = this.dbConnection.queryOne(`
      SELECT 1 FROM forms WHERE form_id = ?
    `, [formId]);
    
    return Boolean(exists);
  }
}
```

## Key Benefits of This Architecture

1. **Zero Code Changes**: Adding providers doesn't require modifying existing provider implementations
2. **Automatic Integration**: New providers are automatically available in the modal through the registry
3. **Type Safety**: TypeScript ensures interface compliance
4. **Testability**: Each provider can be tested in isolation
5. **Dependency Injection**: Providers can receive dependencies through constructors
6. **Lazy Loading**: Providers are only instantiated when needed
7. **Hot Reloading**: Changes to providers work with Vite's hot module replacement

## Troubleshooting

### Provider Not Appearing in Modal

1. Verify your provider is registered in `ProviderRegistryContext.tsx`
2. Check that your provider's `canHandleForm()` returns `true` for the selected form
3. Ensure the provider is included in the `AllProvidersProvider` wrapper

### Type Errors

1. Make sure you've added your provider type to the `DataSourceType` union
2. Verify your provider class implements all required interface methods
3. Check that your provider's `id` matches the type literal exactly

### Runtime Errors

1. Ensure your provider's constructor parameters are available from contexts
2. Check that async operations in providers are properly handled
3. Verify error handling in `getAvailableFields()` and `getFieldValue()` methods

## Testing New Providers

Always test your providers with:

1. **Unit tests** for each provider method
2. **Integration tests** with the modal component
3. **End-to-end tests** for the complete user workflow
4. **Error scenario tests** for network failures, invalid data, etc.

This architecture ensures your Journey Builder application remains maintainable and extensible as new data source requirements emerge.