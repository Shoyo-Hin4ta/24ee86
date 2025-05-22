import React, { useState } from 'react';
import { usePrefill, useProviderRegistry } from '../../hooks/useContext';
import type { FieldOption, PrefillMapping, DataSourceType } from '../../types/prefill';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
  SourceListSection,
  FieldListSection,
  SectionTitle,
  AccordionItem,
  AccordionHeader,
  SourceType,
  DetailSourceType,
  DetailSection,
  DetailHeader,
  DetailTitle,
  DetailValue,
  DetailValueTitle,
  DetailContent,
  DetailPath,
  PathSegment,
  DetailFooter,
  NoSelection,
  AccordionTitle,
  AccordionArrow,
  AccordionContent,
  SearchInput,
  List,
  FieldItem,
  FieldItemSelected,
  CancelButton,
  SelectButton
} from '../../styles/prefill/DataSourceModal.styles';

interface DataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldId: string;
}

export const DataSourceModal: React.FC<DataSourceModalProps> = ({ 
  isOpen, 
  onClose, 
  fieldId 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [selectedSource, setSelectedSource] = useState<{id: string, type: string} | null>(null);
  const [selectedField, setSelectedField] = useState<FieldOption | null>(null);
  
  const { selectedFormId, setMapping } = usePrefill();
  const registry = useProviderRegistry();
  
  // Transform providers and their fields into accordion data sources
  const transformProvidersToDataSources = (): DataSource[] => {
    const sources: DataSource[] = [];
    
    // Add direct dependencies
    const directProvider = registry.getProvider('direct');
    if (directProvider && selectedFormId) {
      const directFields = directProvider.getAvailableFields(selectedFormId);
      // Group fields by form
      const formGroups: Record<string, DataSource> = {};
      directFields.forEach(field => {
        if (!formGroups[field.formId]) {
          formGroups[field.formId] = {
            id: field.formId,
            title: field.formName,
            type: 'direct',
            fields: []
          };
        }
        formGroups[field.formId].fields.push(field);
      });
      
      // Add each form group to sources
      Object.values(formGroups).forEach(group => {
        sources.push(group);
      });
    }
    
    // Add transitive dependencies
    const transitiveProvider = registry.getProvider('transitive');
    if (transitiveProvider && selectedFormId) {
      const transitiveFields = transitiveProvider.getAvailableFields(selectedFormId);
      // Group fields by form
      const formGroups: Record<string, DataSource> = {};
      transitiveFields.forEach(field => {
        if (!formGroups[field.formId]) {
          formGroups[field.formId] = {
            id: field.formId,
            title: field.formName,
            type: 'transitive',
            fields: []
          };
        }
        formGroups[field.formId].fields.push(field);
      });
      
      // Add each form group to sources
      Object.values(formGroups).forEach(group => {
        sources.push(group);
      });
    }
    
    // Add global properties
    const globalProvider = registry.getProvider('global');
    if (globalProvider && selectedFormId) {
      const globalFields = globalProvider.getAvailableFields(selectedFormId);
      sources.push({
        id: 'global',
        title: 'Global Properties',
        type: 'global',
        fields: globalFields
      });
    }
    
    return sources;
  };
  
  // Get data sources
  const dataSources = transformProvidersToDataSources();
  
  // Toggle section open/closed
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  
  interface DataSource {
    id: string;
    title: string;
    type: string;
    fields: FieldOption[];
  }

  // Handle field selection
  const handleFieldSelect = (source: DataSource, field: FieldOption) => {
    console.log('Selected source:', source);
    console.log('Selected field:', field);
    
    setSelectedSource({
      id: source.id,
      type: source.type
    });
    setSelectedField(field);
  };
  
  // Handle save
  const handleSave = async () => {
    if (!selectedFormId || !selectedField || !selectedSource) return;
    
    const mapping: PrefillMapping = {
      fieldId,
      sourceType: selectedSource.type as DataSourceType,
      sourceId: selectedSource.id,
      sourceField: selectedField.id
    };
    
    await setMapping(selectedFormId, fieldId, mapping);
    onClose();
  };
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Select Data Element to Map</ModalTitle>
          <CloseButton onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <SourceListSection>
            <SectionTitle>Available data</SectionTitle>
            <SearchInput 
              placeholder="Search" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <List>
              {dataSources.filter(source => 
                source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                source.fields.some(field => 
                  field.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  field.path?.toLowerCase().includes(searchQuery.toLowerCase())
                )
              ).map(source => (
                <AccordionItem key={`${source.type}-${source.id}`}>
                  <AccordionHeader 
                    $isActive={Boolean(openSections[source.id])}
                    $type={source.type}
                    onClick={() => toggleSection(source.id)}
                  >
                    <AccordionTitle>
                      <SourceType $type={source.type}>
                        {source.type === 'direct' ? 'Direct' : 
                         source.type === 'transitive' ? 'Transitive' : 'Global'}
                      </SourceType>
                      <div style={{ flex: 1 }}>
                        {source.title}
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#666', 
                          marginTop: '4px',
                          wordBreak: 'break-all'
                        }}>
                          Form ID: {source.id}
                        </div>
                      </div>
                    </AccordionTitle>
                    <AccordionArrow $isOpen={Boolean(openSections[source.id])}>▼</AccordionArrow>
                  </AccordionHeader>
                  <AccordionContent $isOpen={Boolean(openSections[source.id])}>
                    {source.fields.filter(field => 
                      field.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      field.path?.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map(field => {
                      const isSelected = selectedSource?.id === source.id && selectedField?.id === field.id;
                      return isSelected ? (
                        <FieldItemSelected 
                          key={`${source.id}-${field.id}`}
                          $type={source.type}
                          onClick={() => handleFieldSelect(source, field)}
                        >
                          {field.label}
                        </FieldItemSelected>
                      ) : (
                        <FieldItem 
                          key={`${source.id}-${field.id}`}
                          $type={source.type}
                          onClick={() => handleFieldSelect(source, field)}
                        >
                          {field.label}
                        </FieldItem>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </List>
          </SourceListSection>
          
          <FieldListSection>
            {selectedField ? (
              <>
                <SectionTitle>Field details</SectionTitle>
                <DetailSection>
                  <DetailHeader>
                    <DetailTitle>{selectedField.label}</DetailTitle>
                    <DetailSourceType $type={selectedSource?.type}>
                      {selectedSource?.type === 'direct' ? 'Direct' : 
                       selectedSource?.type === 'transitive' ? 'Transitive' : 'Global'}
                    </DetailSourceType>
                  </DetailHeader>
                  
                  <DetailValue>
                    <DetailValueTitle>Field ID</DetailValueTitle>
                    <DetailContent>{selectedField.id}</DetailContent>
                  </DetailValue>
                  
                  <DetailValue>
                    <DetailValueTitle>Field Path</DetailValueTitle>
                    <DetailContent>{selectedField.path}</DetailContent>
                  </DetailValue>
                  
                  <DetailValue>
                    <DetailValueTitle>Field Type</DetailValueTitle>
                    <DetailContent>{selectedField.fieldType}</DetailContent>
                  </DetailValue>
                  
                  {selectedSource?.type === 'transitive' && (
                    <DetailValue>
                      <DetailValueTitle>Dependency Path</DetailValueTitle>
                      <DetailPath>
                        <PathSegment $type="direct">Current Form</PathSegment>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <PathSegment $type="direct">Direct Form</PathSegment>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <PathSegment $type="transitive">{selectedField.formName}</PathSegment>
                      </DetailPath>
                    </DetailValue>
                  )}
                  
                  {selectedSource?.type === 'direct' && (
                    <DetailValue>
                      <DetailValueTitle>Dependency Path</DetailValueTitle>
                      <DetailPath>
                        <PathSegment $type="direct">Current Form</PathSegment>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <PathSegment $type="direct">{selectedField.formName}</PathSegment>
                      </DetailPath>
                    </DetailValue>
                  )}
                  
                  {selectedSource?.type === 'global' && (
                    <DetailValue>
                      <DetailValueTitle>Global Source</DetailValueTitle>
                      <DetailPath>
                        <PathSegment $type="global">{selectedField.formName || 'Global Properties'}</PathSegment>
                      </DetailPath>
                    </DetailValue>
                  )}
                  
                  <DetailFooter>
                    Source: {selectedField.formName} (Form ID: {selectedField.formId})
                  </DetailFooter>
                </DetailSection>
                
              </>
            ) : (
              <NoSelection>
                <h4>No field selected</h4>
                <p>Select a field from the left panel to see its details</p>
              </NoSelection>
            )}
          </FieldListSection>
        </ModalBody>
        
        <ModalFooter>
          <CancelButton onClick={onClose}>CANCEL</CancelButton>
          <SelectButton 
            $disabled={!selectedField} 
            disabled={!selectedField}
            onClick={handleSave}
          >
            SELECT
          </SelectButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DataSourceModal;