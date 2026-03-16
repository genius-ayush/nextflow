'use client'
import { useCallback, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useWorkflowStore ,  NodeType, WorkflowNode } from '@/lib/stores/workflowsStore';
import { CustomNode } from './CutsomeNode';

const nodeTypes = {
  custom: CustomNode,
};

const CanvasInner = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    addNode 
  } = useWorkflowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [screenToFlowPosition, addNode]
  );

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full">
      <ReactFlow
        nodes={nodes as WorkflowNode[]}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        fitView
        snapToGrid
        snapGrid={[16, 16]}
        defaultEdgeOptions={{
          animated: true,
          style: { strokeWidth: 2 },
        }}
        className="bg-background"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="hsl(var(--canvas-dot))"
          className="!bg-background"
        />
        <Controls 
          className="!bg-card !border-border !shadow-lg"
          showInteractive={false}
        />
        <MiniMap 
          className="!bg-card !border-border"
          nodeColor={(node) => {
            const data = (node as WorkflowNode).data;
            switch (data?.type) {
              case 'text': return '#3b82f6';
              case 'image': return '#10b981';
              case 'video': return '#f59e0b';
              case 'llm': return '#a855f7';
              case 'crop': return '#ef4444';
              case 'frame': return '#06b6d4';
              default: return '#6b7280';
            }
          }}
          maskColor="hsl(var(--background) / 0.8)"
        />
      </ReactFlow>
    </div>
  );
};

export const Workflow = () => {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
};
