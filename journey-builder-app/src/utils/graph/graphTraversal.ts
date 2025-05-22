import type { Node, Edge } from '../../types/api';

/**
 * Finds direct parent nodes for a given node
 * @param nodeId The ID of the node to find parents for
 * @param nodes All nodes in the graph
 * @param edges All edges in the graph
 * @returns Array of parent node IDs
 */
export const getDirectParents = (
  nodeId: string,
  _nodes: Node[],
  edges: Edge[]
): string[] => {
  // Find all edges where this node is the target
  const parentEdges = edges.filter(edge => edge.target === nodeId);
  
  // Return the source nodes
  return parentEdges.map(edge => edge.source);
};

/**
 * Finds all ancestor nodes (direct and transitive parents)
 * @param nodeId The ID of the node to find ancestors for
 * @param nodes All nodes in the graph
 * @param edges All edges in the graph
 * @returns Array of ancestor node IDs
 */
export const getAllAncestors = (
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
): string[] => {
  const ancestors: Set<string> = new Set();
  const queue: string[] = [nodeId];
  const visited: Set<string> = new Set();

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;
    
    if (visited.has(currentNodeId)) {
      continue;
    }
    
    visited.add(currentNodeId);
    
    // Skip adding the original node to ancestors
    if (currentNodeId !== nodeId) {
      ancestors.add(currentNodeId);
    }
    
    // Get direct parents and add to queue
    const parents = getDirectParents(currentNodeId, nodes, edges);
    queue.push(...parents);
  }

  return Array.from(ancestors);
};

/**
 * Finds direct dependencies (forms that directly depend on this form)
 * @param nodeId The ID of the node to find dependencies for
 * @param nodes All nodes in the graph
 * @param edges All edges in the graph
 * @returns Array of dependent node IDs
 */
export const getDirectDependencies = (
  nodeId: string,
  _nodes: Node[],
  edges: Edge[]
): string[] => {
  // Find all edges where this node is the source
  const dependencyEdges = edges.filter(edge => edge.source === nodeId);
  
  // Return the target nodes
  return dependencyEdges.map(edge => edge.target);
};

/**
 * Checks if there is a path between two nodes
 * @param sourceNodeId The ID of the source node
 * @param targetNodeId The ID of the target node
 * @param nodes All nodes in the graph
 * @param edges All edges in the graph
 * @returns Boolean indicating if a path exists
 */
export const hasPath = (
  sourceNodeId: string,
  targetNodeId: string,
  nodes: Node[],
  edges: Edge[]
): boolean => {
  const queue: string[] = [sourceNodeId];
  const visited: Set<string> = new Set();

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;
    
    if (currentNodeId === targetNodeId) {
      return true;
    }
    
    if (visited.has(currentNodeId)) {
      continue;
    }
    
    visited.add(currentNodeId);
    
    // Get dependencies and add to queue
    const dependencies = getDirectDependencies(currentNodeId, nodes, edges);
    queue.push(...dependencies);
  }

  return false;
};

/**
 * Gets all available forms for prefill for a given form
 * These are forms that are ancestors of the current form
 * @param nodeId The ID of the node to find available forms for
 * @param nodes All nodes in the graph
 * @param edges All edges in the graph
 * @returns Object with direct and transitive parent forms
 */
export const getAvailablePrefillForms = (
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
): { direct: string[]; transitive: string[] } => {
  const directParentIds = getDirectParents(nodeId, nodes, edges);
  
  // Get all ancestors except direct parents
  const allAncestors = getAllAncestors(nodeId, nodes, edges);
  const transitiveParentIds = allAncestors.filter(
    id => !directParentIds.includes(id)
  );
  
  return {
    direct: directParentIds,
    transitive: transitiveParentIds
  };
};