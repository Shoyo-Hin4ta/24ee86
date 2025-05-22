/**
 * Type definitions for the API response from action-blueprint-graph-get endpoint
 */

// Base Blueprint graph response
export interface BlueprintGraph {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
  forms: Form[];
  branches: Branch[];
  triggers: Trigger[];
}

// Node representing a form in the graph
export interface Node {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    id: string;
    component_key: string;
    component_type: string;
    component_id: string;
    name: string;
    prerequisites: string[];
    permitted_roles: string[];
    input_mapping: Record<string, SourceMapping>;
    sla_duration: {
      number: number;
      unit: string;
    };
    approval_required: boolean;
    approval_roles: string[];
  };
}

// Edge connecting two nodes
export interface Edge {
  source: string;
  target: string;
}

// Form definition
export interface Form {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: FieldSchema;
  ui_schema: UiSchema;
  dynamic_field_config?: Record<string, DynamicFieldConfig>;
}

// Field schema for a form
export interface FieldSchema {
  type: string;
  properties: Record<string, FieldDefinition>;
  required: string[];
}

// Individual field definition
export interface FieldDefinition {
  avantos_type: string;
  title?: string;
  type: string;
  format?: string;
  items?: {
    enum?: string[];
    type: string;
  };
  enum?: (string | number | boolean | object)[] | null;
  uniqueItems?: boolean;
}

// UI schema for form rendering
export interface UiSchema {
  type: string;
  elements: UiElement[];
}

// UI element for a field
export interface UiElement {
  type: string;
  scope: string;
  label: string;
  options?: Record<string, unknown>;
}

// Dynamic field configuration
export interface DynamicFieldConfig {
  selector_field: string;
  payload_fields: Record<string, {
    type: string;
    value: string;
  }>;
  endpoint_id: string;
}

// Branch definition
export interface Branch {
  $schema: string;
  condition: Record<string, unknown>;
  created_at: string;
  created_by: string;
  description: string;
  id: string;
  name: string;
  tenant_id: string;
  updated_at: string;
}

// Trigger definition
export interface Trigger {
  $schema: string;
  created_at: string;
  id: string;
  max_retries: number;
  name: string;
  output_mapping: Record<string, string>;
  path_template: string;
  path_template_variables: string[];
  payload_template: Record<string, string>;
  payload_template_variables: string[];
  query_parameter_template: Record<string, string>;
  query_parameter_template_variables: string[];
  request_method: string;
  timeout_seconds: number;
  trigger_service_id: string;
  updated_at: string;
}

// Source mapping for input fields
export interface SourceMapping {
  component_key: string;
  is_metadata: boolean;
  output_key: string;
  type: string;
}