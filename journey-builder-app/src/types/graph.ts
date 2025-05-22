import type { BlueprintGraph, Form, Node, FieldDefinition } from './api';

// Graph context type definitions
export interface GraphContextType {
  graph: BlueprintGraph | null;
  loading: boolean;
  error: Error | null;
  getForms: () => Form[];
  getFormById: (formId: string) => Form | undefined;
  getNodeById: (nodeId: string) => Node | undefined;
  getNodeByComponentId: (componentId: string) => Node | undefined;
  getFormFields: (formId: string) => Record<string, FieldDefinition>;
  refreshGraph: () => Promise<void>;
}