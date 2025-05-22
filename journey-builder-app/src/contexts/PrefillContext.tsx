import React, { createContext, useState } from 'react';
import type { PrefillMapping, FormPrefillConfig } from '../types/prefill';
import blueprintApi from '../api/blueprintApi';
import type { PrefillContextType } from '../types/prefill';

const PrefillContext = createContext<PrefillContextType | undefined>(undefined);

export const PrefillProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prefillConfigs, setPrefillConfigs] = useState<Record<string, FormPrefillConfig>>({});
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  
  // Select a form
  const selectForm = (formId: string) => {
    setSelectedFormId(formId);
    
    // Initialize mappings for the form if they don't exist
    if (!prefillConfigs[formId]) {
      setPrefillConfigs(prev => ({
        ...prev,
        [formId]: {
          formId,
          mappings: {}
        }
      }));
    }
  };
  
  // Add or update a mapping
  const setMapping = async (formId: string, fieldId: string, mapping: PrefillMapping) => {
    // Create a new config object with the updated mapping
    const updatedConfigs = {
      ...prefillConfigs,
      [formId]: {
        formId,
        mappings: {
          ...(prefillConfigs[formId]?.mappings || {}),
          [fieldId]: mapping
        }
      }
    };
    
    // Update state
    setPrefillConfigs(updatedConfigs);
    
    // In a real app, this would call the API to persist the mapping
    await blueprintApi.updatePrefillMappings(formId, updatedConfigs[formId].mappings);
  };
  
  // Remove a mapping
  const removeMapping = async (formId: string, fieldId: string) => {
    // Skip if no mappings exist for this form
    if (!prefillConfigs[formId]) {
      return;
    }
    
    // Create a new mappings object without the removed field
    const updatedMappings = { ...prefillConfigs[formId].mappings };
    delete updatedMappings[fieldId];
    
    // Update state
    setPrefillConfigs(prev => ({
      ...prev,
      [formId]: {
        formId,
        mappings: updatedMappings
      }
    }));
    
    // In a real app, this would call the API to persist the changes
    await blueprintApi.updatePrefillMappings(formId, updatedMappings);
  };
  
  // Get mappings for a form
  const getMappingsForForm = (formId: string): Record<string, PrefillMapping> => {
    return prefillConfigs[formId]?.mappings || {};
  };
  
  // Check if a field has a mapping
  const hasMapping = (formId: string, fieldId: string): boolean => {
    return !!prefillConfigs[formId]?.mappings[fieldId];
  };
  
  const value = {
    prefillConfigs,
    selectedFormId,
    selectForm,
    setMapping,
    removeMapping,
    getMappingsForForm,
    hasMapping
  };
  
  return <PrefillContext.Provider value={value}>{children}</PrefillContext.Provider>;
};

export default PrefillContext;