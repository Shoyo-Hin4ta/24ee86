/**
 * Type definitions for prefill mapping functionality
 */

// Types of data sources for prefill
export type DataSourceType = 'direct' | 'transitive' | 'global';

// Prefill mapping configuration
export interface PrefillMapping {
  fieldId: string;
  sourceType: DataSourceType;
  sourceId: string;
  sourceField: string;
}

// Field option for selection in the modal
export interface FieldOption {
  id: string;
  label: string;
  formId: string;
  formName: string;
  fieldType: string;
  path: string; // Path for nested fields
}

// Data source configuration for providers
export interface DataSourceConfig {
  type: DataSourceType;
  id: string; // Form ID or global source ID
  fieldId: string;
}

// Form context for prefill
export interface FormContext {
  formId: string; // Current form ID
  availableForms: string[]; // IDs of forms that can be used for prefill
}

// Prefill configuration for a form
export interface FormPrefillConfig {
  formId: string;
  mappings: Record<string, PrefillMapping>; // Key is target field ID
}

// Prefill context type definitions
export interface PrefillContextType {
  // All prefill configurations by form ID
  prefillConfigs: Record<string, FormPrefillConfig>;
  
  // Currently selected form ID
  selectedFormId: string | null;
  
  // Set the selected form
  selectForm: (formId: string) => void;
  
  // Add or update a mapping
  setMapping: (formId: string, fieldId: string, mapping: PrefillMapping) => Promise<void>;
  
  // Remove a mapping
  removeMapping: (formId: string, fieldId: string) => Promise<void>;
  
  // Get mappings for a form
  getMappingsForForm: (formId: string) => Record<string, PrefillMapping>;
  
  // Check if a field has a mapping
  hasMapping: (formId: string, fieldId: string) => boolean;
}