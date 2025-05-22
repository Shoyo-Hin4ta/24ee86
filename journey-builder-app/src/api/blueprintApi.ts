import axios from 'axios';
import type { BlueprintGraph } from '../types/api';
import type { PrefillMapping } from '../types/prefill';

// API base URL
const API_BASE_URL = 'http://localhost:3000';

// API client for action-blueprint-graph endpoints
export const blueprintApi = {
  /**
   * Fetch the blueprint graph with forms, nodes, edges
   * @param tenantId Tenant ID (mock server ignores this)
   * @param blueprintId Blueprint ID (mock server ignores this)
   * @returns Promise with the blueprint graph data
   */
  getBlueprintGraph: async (
    tenantId: string = '123',
    blueprintId: string = 'bp_456'
  ): Promise<BlueprintGraph> => {
    try {
      console.log("Fetching data..");
      const response = await axios.get<BlueprintGraph>(
        `${API_BASE_URL}/api/v1/${tenantId}/actions/blueprints/${blueprintId}/graph`
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  /**
   * Mock function to update prefill mappings 
   * In a real application, this would call an API endpoint
   * @param formId Form ID to update mappings for
   * @param mappings The new mappings to save
   * @returns Promise with success status
   */
  updatePrefillMappings: async (
    formId: string,
    mappings: Record<string, PrefillMapping>
  ): Promise<{ success: boolean }> => {
    // In a real application, this would be an API call
    // For this challenge, we'll just simulate a successful response
    console.log('Updating prefill mappings:', { formId, mappings });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  }
};

export default blueprintApi;