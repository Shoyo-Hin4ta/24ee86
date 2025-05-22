import React from 'react';
import { useGraph, usePrefill } from '../../hooks/useContext';
import ErrorDisplay from '../common/ErrorDisplay';
import {
  FormListContainer,
  FormItem,
  FormName,
  FormId,
  Header,
  Loading,
  LoadingIndicator,
  EmptyState
} from '../../styles/forms/FormList.styles';

interface FormListProps {
  onFormSelect?: (formId: string) => void;
}

export const FormList: React.FC<FormListProps> = ({ onFormSelect }) => {
  const { loading, error, getForms, refreshGraph } = useGraph();
  const { selectedFormId, selectForm } = usePrefill();
  
  // Handle form selection
  const handleFormSelect = (formId: string) => {
    selectForm(formId);
    if (onFormSelect) {
      onFormSelect(formId);
    }
  };
  
  if (loading) {
    return (
      <Loading>
        <LoadingIndicator />
        Loading forms...
      </Loading>
    );
  }
  
  if (error) {
    return (
      <ErrorDisplay 
        error={error} 
        message="Failed to load forms. Please try again." 
        onRetry={refreshGraph}
      />
    );
  }
  
  const forms = getForms();
  
  if (forms.length === 0) {
    return (
      <EmptyState>
        <div>No forms available</div>
      </EmptyState>
    );
  }
  
  return (
    <FormListContainer>
      <Header>Forms</Header>
      {forms.map(form => (
        <FormItem 
          key={form.id} 
          $isSelected={selectedFormId === form.id}
          onClick={() => handleFormSelect(form.id)}
        >
          <FormName>{form.name}</FormName>
          <FormId color={selectedFormId === form.id ? '#e0e0e0' : undefined}>
            {form.id}
          </FormId>
        </FormItem>
      ))}
    </FormListContainer>
  );
};

export default FormList;