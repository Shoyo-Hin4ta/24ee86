import type { FieldOption, DataSourceType, DataSourceConfig } from './prefill';

/**
 * Interface for data source providers 
 * Providers supply available fields and values for prefill mappings
 */
export interface DataSourceProvider {
  /**
   * Unique identifier for this provider
   */
  id: DataSourceType;
  
  /**
   * Display name for the provider
   */
  name: string;
  
  /**
   * Get available fields from this data source for a specific form
   * @param formId The form ID to get available fields for
   * @returns Array of field options
   */
  getAvailableFields(formId: string): FieldOption[];
  
  /**
   * Get a field value from this data source
   * @param config The data source configuration
   * @returns The field value
   */
  getFieldValue(config: DataSourceConfig): string | number | boolean | object | null;
  
  /**
   * Check if this provider can handle a specific form
   * @param formId The form ID to check
   * @returns Whether this provider can handle the form
   */
  canHandleForm(formId: string): boolean;
}

/**
 * Interface for direct dependency provider
 * Provides data from forms that directly feed into the current form
 */
export interface DirectDependencyProvider extends DataSourceProvider {
  id: 'direct';
}

/**
 * Interface for transitive dependency provider
 * Provides data from forms that indirectly feed into the current form through other forms
 */
export interface TransitiveDependencyProvider extends DataSourceProvider {
  id: 'transitive';
}

/**
 * Interface for global data provider
 * Provides data from global sources like Action Properties and Client Organisation Properties
 */
export interface GlobalDataProvider extends DataSourceProvider {
  id: 'global';
}

/**
 * Registry for data source providers
 * Allows for extensibility by registering new provider types
 */
export class DataSourceRegistry {
  private providers: Map<DataSourceType, DataSourceProvider> = new Map();
  
  /**
   * Register a provider with the registry
   * @param provider The provider to register
   */
  register(provider: DataSourceProvider): void {
    this.providers.set(provider.id, provider);
  }
  
  /**
   * Get a provider by its type
   * @param type The provider type to get
   * @returns The provider or undefined if not found
   */
  getProvider(type: DataSourceType): DataSourceProvider | undefined {
    return this.providers.get(type);
  }
  
  /**
   * Get all registered providers
   * @returns Array of providers
   */
  getAllProviders(): DataSourceProvider[] {
    return Array.from(this.providers.values());
  }
  
  /**
   * Get all providers that can handle a specific form
   * @param formId The form ID to check
   * @returns Array of providers that can handle the form
   */
  getProvidersForForm(formId: string): DataSourceProvider[] {
    return this.getAllProviders().filter(provider => 
      provider.canHandleForm(formId)
    );
  }
}