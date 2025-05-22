import React from 'react';
import { useGraph, usePrefill } from '../../hooks/useContext';
import {
  PrefillContainer,
  Header,
  NoFormSelected,
  FieldsList,
  FieldItem,
  FieldIcon,
  FieldName,
  RemoveButton,
  Button,
  PrefillValue
} from '../../styles/prefill/PrefillConfig.styles';

interface PrefillConfigProps {
  onOpenModal: (fieldId: string) => void;
}

export const PrefillConfig: React.FC<PrefillConfigProps> = ({ onOpenModal }) => {
  const { getFormById } = useGraph();
  const { selectedFormId, getMappingsForForm, removeMapping } = usePrefill();

  if (!selectedFormId) {
    return (
      <PrefillContainer>
        <NoFormSelected>
          <span style={{ fontWeight: '500', marginBottom: '16px' }}>
            Select a form to configure prefill mappings
          </span>
          <Button 
            onClick={() => {}}
            style={{
              marginTop: '16px',
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#4c63e3',
              color: 'white',
              boxShadow: '0 2px 8px rgba(76, 99, 227, 0.25)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 10H2V12H14V10ZM14 6H2V8H14V6ZM2 16H10V14H2V16ZM21.5 11.5L23 13L16 20L11.5 15.5L13 14L16 17L21.5 11.5Z" fill="currentColor"/>
            </svg>
            Select a form from the sidebar
          </Button>
        </NoFormSelected>
      </PrefillContainer>
    );
  }

  const selectedForm = getFormById(selectedFormId);
  if (!selectedForm) {
    return (
      <PrefillContainer>
        <NoFormSelected>
          <span style={{ fontWeight: '500', marginBottom: '16px', color: '#f44336' }}>
            Selected form not found
          </span>
          <Button 
            onClick={() => {}}
            style={{
              marginTop: '16px',
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#f44336',
              color: 'white',
              boxShadow: '0 2px 8px rgba(244, 67, 54, 0.25)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="currentColor"/>
            </svg>
            Return to form list
          </Button>
        </NoFormSelected>
      </PrefillContainer>
    );
  }

  const mappings = getMappingsForForm(selectedFormId);

  // Get all fields from the form
  const fields = Object.entries(selectedForm.field_schema.properties);

  // Helper function to get form name for display
  const getFormDisplayName = (formId: string) => {
    const form = getFormById(formId);
    return form ? form.name : formId;
  };

  return (
    <PrefillContainer>
      <Header>Prefill</Header>
      
      <FieldsList>
          {fields.map(([fieldId, field]) => {
          const mapping = mappings[fieldId];
          
          // Choose icon based on field type
          const fieldIcon = (() => {
            switch(field.avantos_type) {
              case 'checkbox-group':
                return (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"></path>
                    <path d="M9 9h6v6H9z"></path>
                  </svg>
                );
              case 'object-enum':
                return (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                );
              case 'short-text':
                return (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                );
              default:
                return (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="9" x2="15" y2="9"></line>
                    <line x1="9" y1="12" x2="15" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                );
            }
          })();
          
          return (
            <FieldItem 
              key={fieldId}
              style={mapping ? 
                { borderColor: '#4c63e3', borderStyle: 'solid' } : 
                { backgroundColor: '#f5f5f5' }
              }
            >
              <FieldIcon>
                {fieldIcon}
              </FieldIcon>
              <FieldName>{field.title || fieldId}</FieldName>
              
              {mapping ? (
                <PrefillValue>
                  {mapping.sourceType === 'direct' || mapping.sourceType === 'transitive' ? (
                    // Show format like "email: Form A.email"
                    `${fieldId}: Form ${getFormDisplayName(mapping.sourceId)}.${mapping.sourceField}`
                  ) : (
                    // For global, keep simpler format
                    `Global: ${mapping.sourceField}`
                  )}
                  <RemoveButton onClick={() => removeMapping(selectedFormId, fieldId)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </RemoveButton>
                </PrefillValue>
              ) : (
                <Button onClick={() => onOpenModal(fieldId)}>
                  Add Prefill
                </Button>
              )}
            </FieldItem>
          );
        })}
      </FieldsList>
      
    </PrefillContainer>
  );
};

export default PrefillConfig;