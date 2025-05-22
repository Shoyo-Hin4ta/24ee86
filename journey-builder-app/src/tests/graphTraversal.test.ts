import { describe, it, expect } from 'vitest';
import { 
  getDirectParents, 
  getAllAncestors,
  getDirectDependencies,
  hasPath,
  getAvailablePrefillForms
} from '../../src/utils/graph/graphTraversal';
import type { Node, Edge } from '../../src/types/api';

// Test data
const testNodes: Node[] = [
  {
    id: 'form-A',
    type: 'form',
    position: { x: 0, y: 0 },
    data: {
      id: 'bp_c_A',
      component_key: 'form-A',
      component_type: 'form',
      component_id: 'f_A',
      name: 'Form A',
      prerequisites: [],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: []
    }
  },
  {
    id: 'form-B',
    type: 'form',
    position: { x: 100, y: 0 },
    data: {
      id: 'bp_c_B',
      component_key: 'form-B',
      component_type: 'form',
      component_id: 'f_B',
      name: 'Form B',
      prerequisites: ['form-A'],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: []
    }
  },
  {
    id: 'form-C',
    type: 'form',
    position: { x: 100, y: 100 },
    data: {
      id: 'bp_c_C',
      component_key: 'form-C',
      component_type: 'form',
      component_id: 'f_C',
      name: 'Form C',
      prerequisites: ['form-A'],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: []
    }
  },
  {
    id: 'form-D',
    type: 'form',
    position: { x: 200, y: 0 },
    data: {
      id: 'bp_c_D',
      component_key: 'form-D',
      component_type: 'form',
      component_id: 'f_D',
      name: 'Form D',
      prerequisites: ['form-B'],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: []
    }
  },
  {
    id: 'form-E',
    type: 'form',
    position: { x: 200, y: 100 },
    data: {
      id: 'bp_c_E',
      component_key: 'form-E',
      component_type: 'form',
      component_id: 'f_E',
      name: 'Form E',
      prerequisites: ['form-C'],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: []
    }
  },
  {
    id: 'form-F',
    type: 'form',
    position: { x: 300, y: 50 },
    data: {
      id: 'bp_c_F',
      component_key: 'form-F',
      component_type: 'form',
      component_id: 'f_F',
      name: 'Form F',
      prerequisites: ['form-D', 'form-E'],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: { number: 0, unit: 'minutes' },
      approval_required: false,
      approval_roles: []
    }
  }
];

const testEdges: Edge[] = [
  { source: 'form-A', target: 'form-B' },
  { source: 'form-A', target: 'form-C' },
  { source: 'form-B', target: 'form-D' },
  { source: 'form-C', target: 'form-E' },
  { source: 'form-D', target: 'form-F' },
  { source: 'form-E', target: 'form-F' }
];

describe('Graph Traversal Utilities', () => {
  describe('getDirectParents', () => {
    it('should find direct parents of a node', () => {
      const parents = getDirectParents('form-B', testNodes, testEdges);
      expect(parents).toEqual(['form-A']);
    });
    
    it('should find multiple direct parents', () => {
      const parents = getDirectParents('form-F', testNodes, testEdges);
      expect(parents).toHaveLength(2);
      expect(parents).toContain('form-D');
      expect(parents).toContain('form-E');
    });
    
    it('should return empty array for a root node', () => {
      const parents = getDirectParents('form-A', testNodes, testEdges);
      expect(parents).toEqual([]);
    });
  });
  
  describe('getAllAncestors', () => {
    it('should find all ancestors of a node', () => {
      const ancestors = getAllAncestors('form-F', testNodes, testEdges);
      expect(ancestors).toHaveLength(5);
      expect(ancestors).toContain('form-A');
      expect(ancestors).toContain('form-B');
      expect(ancestors).toContain('form-C');
      expect(ancestors).toContain('form-D');
      expect(ancestors).toContain('form-E');
    });
    
    it('should return only direct parents for a node with only direct parents', () => {
      const ancestors = getAllAncestors('form-B', testNodes, testEdges);
      expect(ancestors).toEqual(['form-A']);
    });
    
    it('should return empty array for a root node', () => {
      const ancestors = getAllAncestors('form-A', testNodes, testEdges);
      expect(ancestors).toEqual([]);
    });
  });
  
  describe('getDirectDependencies', () => {
    it('should find direct dependencies of a node', () => {
      const dependencies = getDirectDependencies('form-A', testNodes, testEdges);
      expect(dependencies).toHaveLength(2);
      expect(dependencies).toContain('form-B');
      expect(dependencies).toContain('form-C');
    });
    
    it('should return empty array for a leaf node', () => {
      const dependencies = getDirectDependencies('form-F', testNodes, testEdges);
      expect(dependencies).toEqual([]);
    });
  });
  
  describe('hasPath', () => {
    it('should return true if there is a direct path', () => {
      expect(hasPath('form-A', 'form-B', testNodes, testEdges)).toBe(true);
    });
    
    it('should return true if there is an indirect path', () => {
      expect(hasPath('form-A', 'form-F', testNodes, testEdges)).toBe(true);
    });
    
    it('should return false if there is no path', () => {
      expect(hasPath('form-F', 'form-A', testNodes, testEdges)).toBe(false);
    });
    
    it('should return true for the same node', () => {
      expect(hasPath('form-A', 'form-A', testNodes, testEdges)).toBe(true);
    });
  });
  
  describe('getAvailablePrefillForms', () => {
    it('should categorize direct and transitive parent forms correctly', () => {
      const result = getAvailablePrefillForms('form-F', testNodes, testEdges);
      
      expect(result.direct).toHaveLength(2);
      expect(result.direct).toContain('form-D');
      expect(result.direct).toContain('form-E');
      
      expect(result.transitive).toHaveLength(3);
      expect(result.transitive).toContain('form-A');
      expect(result.transitive).toContain('form-B');
      expect(result.transitive).toContain('form-C');
    });
    
    it('should return only direct parents when there are no transitive parents', () => {
      const result = getAvailablePrefillForms('form-B', testNodes, testEdges);
      
      expect(result.direct).toEqual(['form-A']);
      expect(result.transitive).toEqual([]);
    });
    
    it('should return empty arrays for a root node', () => {
      const result = getAvailablePrefillForms('form-A', testNodes, testEdges);
      
      expect(result.direct).toEqual([]);
      expect(result.transitive).toEqual([]);
    });
  });
});