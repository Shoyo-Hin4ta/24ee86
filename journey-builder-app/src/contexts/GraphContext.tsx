import React, { createContext, useState, useEffect } from 'react';
import type { BlueprintGraph, Form, Node, FieldDefinition } from '../types/api';
import blueprintApi from '../api/blueprintApi';
import type { GraphContextType } from '../types/graph';

// Create the context with a default undefined value
const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [graph, setGraph] = useState<BlueprintGraph | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGraphData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blueprintApi.getBlueprintGraph();
      setGraph(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchGraphData();
  }, []);

  // Helper function to get all forms
  const getForms = (): Form[] => {
    return graph?.forms || [];
  };

  // Helper function to get a form by ID
  const getFormById = (formId: string): Form | undefined => {
    return graph?.forms.find(form => form.id === formId);
  };

  // Helper function to get a node by ID
  const getNodeById = (nodeId: string): Node | undefined => {
    return graph?.nodes.find(node => node.id === nodeId);
  };

  // Helper function to get a node by component ID
  const getNodeByComponentId = (componentId: string): Node | undefined => {
    return graph?.nodes.find(node => node.data.component_id === componentId);
  };

  // Helper function to get fields for a form
  const getFormFields = (formId: string): Record<string, FieldDefinition> => {
    const form = getFormById(formId);
    return form?.field_schema.properties || {};
  };

  // Function to refresh the graph data
  const refreshGraph = async () => {
    await fetchGraphData();
  };

  const value = {
    graph,
    loading,
    error,
    getForms,
    getFormById,
    getNodeById,
    getNodeByComponentId,
    getFormFields,
    refreshGraph
  };

  return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>;
};


export default GraphContext;