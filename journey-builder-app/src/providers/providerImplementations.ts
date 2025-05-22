import type { 
  DirectDependencyProvider as DirectDependencyProviderType,
  TransitiveDependencyProvider as TransitiveDependencyProviderType,
  GlobalDataProvider as GlobalDataProviderType
} from '../types/providers';
import type { FieldOption, DataSourceConfig } from '../types/prefill';
import type { GraphContextType } from '../types/graph';
import { getAllAncestors, getDirectParents } from '../utils/graph/graphTraversal';

/**
 * Provider for fields from direct parent forms
 * These are forms that directly feed into the current form
 */
export class DirectDependencyProvider implements DirectDependencyProviderType {
  id = 'direct' as const;
  name = 'Direct Dependencies';
  
  private graph: GraphContextType;
  
  constructor(graph: GraphContextType) {
    this.graph = graph;
  }
  
  getAvailableFields(formId: string): FieldOption[] {
    const { graph } = this.graph;
    if (!graph) return [];
    
    // Find the node for this form
    const targetNode = graph.nodes.find(node => node.data.component_id === formId);
    if (!targetNode) return [];
    
    // Get direct parent nodes
    const parentNodeIds = getDirectParents(targetNode.id, graph.nodes, graph.edges);
    
    // Convert node IDs to form IDs and get their fields
    const fields: FieldOption[] = [];
    // Set to track unique field paths to avoid duplicates
    const processedFields = new Set<string>();
    
    parentNodeIds.forEach(nodeId => {
      const node = graph.nodes.find(n => n.id === nodeId);
      if (!node) return;
      
      const formId = node.data.component_id;
      const form = this.graph.getFormById(formId);
      if (!form) return;
      
      // Add each field as an option
      Object.entries(form.field_schema.properties).forEach(([fieldId, field]) => {
        // Create a unique identifier for this field
        const fieldKey = `${form.id}-${fieldId}`;
        
        // Only add if we haven't processed this field yet
        if (!processedFields.has(fieldKey)) {
          processedFields.add(fieldKey);
          fields.push({
            id: fieldId,
            label: field.title || fieldId,
            formId: form.id,
            formName: form.name,
            fieldType: field.avantos_type,
            path: `${form.name}.${fieldId}`
          });
        }
      });
    });
    
    return fields;
  }
  
  getFieldValue(config: DataSourceConfig): string | null {
    // In a real application, this would fetch the actual value
    // For this demo, we'll return a placeholder
    return `Value from ${config.id}.${config.fieldId}`;
  }
  
  canHandleForm(formId: string): boolean {
    const { graph } = this.graph;
    if (!graph) return false;
    
    // Find the node for this form
    const targetNode = graph.nodes.find(node => node.data.component_id === formId);
    if (!targetNode) return false;
    
    // Check if there are any direct parents
    const parentNodeIds = getDirectParents(targetNode.id, graph.nodes, graph.edges);
    return parentNodeIds.length > 0;
  }
}

/**
 * Provider for fields from transitive parent forms (ancestors)
 * These are forms that indirectly feed into the current form
 */
export class TransitiveDependencyProvider implements TransitiveDependencyProviderType {
  id = 'transitive' as const;
  name = 'Transitive Dependencies';
  
  private graph: GraphContextType;
  
  constructor(graph: GraphContextType) {
    this.graph = graph;
  }
  
  getAvailableFields(formId: string): FieldOption[] {
    const { graph } = this.graph;
    if (!graph) return [];
    
    // Find the node for this form
    const targetNode = graph.nodes.find(node => node.data.component_id === formId);
    if (!targetNode) return [];
    
    // Get all ancestor nodes
    const allAncestorIds = getAllAncestors(targetNode.id, graph.nodes, graph.edges);
    
    // Get direct parent nodes to exclude them
    const directParentIds = getDirectParents(targetNode.id, graph.nodes, graph.edges);
    
    // Filter out direct dependencies to get only transitive ones
    const transitiveNodeIds = allAncestorIds.filter(id => !directParentIds.includes(id));
    
    // Convert node IDs to form IDs and get their fields
    const fields: FieldOption[] = [];
    // Set to track unique field paths to avoid duplicates
    const processedFields = new Set<string>();
    
    transitiveNodeIds.forEach(nodeId => {
      const node = graph.nodes.find(n => n.id === nodeId);
      if (!node) return;
      
      const formId = node.data.component_id;
      const form = this.graph.getFormById(formId);
      if (!form) return;
      
      // Add each field as an option
      Object.entries(form.field_schema.properties).forEach(([fieldId, field]) => {
        // Create a unique identifier for this field
        const fieldKey = `${form.id}-${fieldId}`;
        
        // Only add if we haven't processed this field yet
        if (!processedFields.has(fieldKey)) {
          processedFields.add(fieldKey);
          fields.push({
            id: fieldId,
            label: field.title || fieldId,
            formId: form.id,
            formName: form.name,
            fieldType: field.avantos_type,
            path: `${form.name}.${fieldId}`
          });
        }
      });
    });
    
    return fields;
  }
  
  getFieldValue(config: DataSourceConfig): string | null {
    // In a real application, this would fetch the actual value
    // For this demo, we'll return a placeholder
    return `Value from ${config.id}.${config.fieldId}`;
  }
  
  canHandleForm(formId: string): boolean {
    const { graph } = this.graph;
    if (!graph) return false;
    
    // Find the node for this form
    const targetNode = graph.nodes.find(node => node.data.component_id === formId);
    if (!targetNode) return false;
    
    // Get all ancestor nodes
    const allAncestorIds = getAllAncestors(targetNode.id, graph.nodes, graph.edges);
    
    // Get direct parent nodes to exclude them
    const directParentIds = getDirectParents(targetNode.id, graph.nodes, graph.edges);
    
    // Filter out direct dependencies to get only transitive ones
    const transitiveNodeIds = allAncestorIds.filter(id => !directParentIds.includes(id));
    
    return transitiveNodeIds.length > 0;
  }
}

/**
 * Provider for global data sources like Action Properties and Client Organisation Properties
 */
export class GlobalDataProvider implements GlobalDataProviderType {
  id = 'global' as const;
  name = 'Global Properties';
  
  // Mock global data
  private globalData = {
    'action': {
      name: 'Action Properties',
      fields: [
        { id: 'name', label: 'Name', type: 'string' },
        { id: 'description', label: 'Description', type: 'string' },
        { id: 'status', label: 'Status', type: 'string' },
        { id: 'created_at', label: 'Created At', type: 'datetime' },
      ]
    },
    'client': {
      name: 'Client Organisation Properties',
      fields: [
        { id: 'org_name', label: 'Organisation Name', type: 'string' },
        { id: 'industry', label: 'Industry', type: 'string' },
        { id: 'contact_email', label: 'Contact Email', type: 'string' },
        { id: 'region', label: 'Region', type: 'string' },
      ]
    }
  };
  
  getAvailableFields(): FieldOption[] {
    // Convert global data to field options
    const fields: FieldOption[] = [];
    // Set to track unique field paths to avoid duplicates
    const processedFields = new Set<string>();
    
    Object.entries(this.globalData).forEach(([sourceId, source]) => {
      source.fields.forEach(field => {
        // Create a unique identifier for this field
        const fieldKey = `global_${sourceId}-${field.id}`;
        
        // Only add if we haven't processed this field yet
        if (!processedFields.has(fieldKey)) {
          processedFields.add(fieldKey);
          fields.push({
            id: field.id,
            label: field.label,
            formId: `global_${sourceId}`, // Make formId unique for global data
            formName: source.name,
            fieldType: field.type,
            path: `${source.name}.${field.label}`
          });
        }
      });
    });
    
    return fields;
  }
  
  getFieldValue(config: DataSourceConfig): string | null {
    // In a real application, this would fetch the actual value
    // Extract the actual sourceId from our prefixed formId
    const actualSourceId = config.id.replace('global_', '');
    
    // For this demo, we'll return a placeholder
    return `Global value from ${actualSourceId}.${config.fieldId}`;
  }
  
  canHandleForm(): boolean {
    // Global data is available for all forms
    return true;
  }
}