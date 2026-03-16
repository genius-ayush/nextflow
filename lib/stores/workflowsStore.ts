import { create } from 'zustand';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react';

export type NodeType = 'text' | 'image' | 'video' | 'llm' | 'crop' | 'frame';

export interface NodeData extends Record<string, unknown> {
  label: string;
  type: NodeType;
  isRunning?: boolean;
  isComplete?: boolean;
  error?: string;
  // Text node
  text?: string;
  // Image/Video node
  url?: string;
  // LLM node
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
  images?: string[];
  result?: string;
  // Crop node
  cropX?: number;
  cropY?: number;
  cropWidth?: number;
  cropHeight?: number;
  // Frame node
  timestamp?: number;
}

export type WorkflowNode = Node<NodeData, 'custom'>;

export interface ExecutionRun {
  id: string;
  timestamp: Date;
  status: 'running' | 'success' | 'failed';
  duration?: number;
  nodeResults: Record<string, {
    inputs: Record<string, unknown>;
    outputs: Record<string, unknown>;
    duration: number;
    status: 'success' | 'failed';
    error?: string;
  }>;
}

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodes: string[];
  executionHistory: ExecutionRun[];
  currentRun: ExecutionRun | null;
  
  // Node operations
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
  deleteNode: (nodeId: string) => void;
  
  // Selection
  setSelectedNodes: (nodeIds: string[]) => void;
  
  // Execution
  executeWorkflow: (mode: 'single' | 'selected' | 'full', nodeId?: string) => Promise<void>;
  
  // History
  selectRun: (runId: string) => void;
}

const createNodeId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const nodeTypeConfig: Record<NodeType, { label: string; color: string }> = {
  text: { label: 'Text Input', color: '#3b82f6' },
  image: { label: 'Image', color: '#10b981' },
  video: { label: 'Video', color: '#f59e0b' },
  llm: { label: 'LLM', color: '#a855f7' },
  crop: { label: 'Crop', color: '#ef4444' },
  frame: { label: 'Frame Extract', color: '#06b6d4' },
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodes: [],
  executionHistory: [],
  currentRun: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[],
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, animated: true }, get().edges),
    });
  },

  addNode: (type, position) => {
    const id = createNodeId();
    const config = nodeTypeConfig[type];
    
    const newNode: WorkflowNode = {
      id,
      type: 'custom',
      position,
      data: {
        label: config.label,
        type,
      },
    };

    set({
      nodes: [...get().nodes, newNode],
    });
  },

  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },

  setSelectedNodes: (nodeIds) => {
    set({ selectedNodes: nodeIds });
  },

  executeWorkflow: async (mode, nodeId) => {
    const { nodes, updateNodeData } = get();
    const runId = `run_${Date.now()}`;
    const startTime = Date.now();

    const run: ExecutionRun = {
      id: runId,
      timestamp: new Date(),
      status: 'running',
      nodeResults: {},
    };

    set({ currentRun: run });

    let nodesToExecute: string[] = [];

    if (mode === 'single' && nodeId) {
      nodesToExecute = [nodeId];
    } else if (mode === 'selected') {
      nodesToExecute = get().selectedNodes;
    } else {
      nodesToExecute = nodes.map((n) => n.id);
    }

    // Simple DAG execution simulation
    for (const nId of nodesToExecute) {
      updateNodeData(nId, { isRunning: true, isComplete: false, error: undefined });
    }

    // Simulate execution with delays
    await new Promise((resolve) => setTimeout(resolve, 1500));

    for (const nId of nodesToExecute) {
      const nodeStartTime = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));
      
      const success = Math.random() > 0.1;
      
      run.nodeResults[nId] = {
        inputs: {},
        outputs: success ? { result: 'Generated output' } : {},
        duration: Date.now() - nodeStartTime,
        status: success ? 'success' : 'failed',
        error: success ? undefined : 'Execution failed',
      };

      updateNodeData(nId, {
        isRunning: false,
        isComplete: success,
        error: success ? undefined : 'Execution failed',
        result: success ? 'Generated result from AI model...' : undefined,
      });
    }

    run.status = Object.values(run.nodeResults).every((r) => r.status === 'success')
      ? 'success'
      : 'failed';
    run.duration = Date.now() - startTime;

    set({
      currentRun: null,
      executionHistory: [run, ...get().executionHistory].slice(0, 50),
    });
  },

  selectRun: (runId) => {
    const run = get().executionHistory.find((r) => r.id === runId);
    if (run) {
      // Highlight nodes from this run
      set({ selectedNodes: Object.keys(run.nodeResults) });
    }
  },
}));
