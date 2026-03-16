'use client'
import { memo, ReactNode } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { NodeData } from '@/lib/stores/workflowsStore';
import { Trash2, Play } from 'lucide-react';
import { useWorkflowStore } from '@/lib/stores/workflowsStore';

interface BaseNodeProps {
  id: string;
  data: NodeData;
  children: ReactNode;
  icon: ReactNode;
  color: string;
  inputs?: { id: string; label: string }[];
  outputs?: { id: string; label: string }[];
}

export const BaseNode = memo(({ id, data, children, icon, color, inputs = [], outputs = [] }: BaseNodeProps) => {
  const { deleteNode, executeWorkflow } = useWorkflowStore();
  
  return (
    <div
      className={cn(
        'min-w-[280px] rounded-xl border border-node-border bg-card shadow-lg transition-all duration-200',
        data.isRunning && 'node-running border-primary',
        data.isComplete && 'border-success',
        data.error && 'border-destructive'
      )}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between gap-2 px-4 py-3 border-b border-node-border rounded-t-xl"
        style={{ backgroundColor: `${color}15` }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <span className="font-medium text-sm text-foreground">{data.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => executeWorkflow('single', id)}
            className="p-1.5 rounded-md hover:bg-secondary transition-colors"
            title="Run this node"
          >
            <Play className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
          </button>
          <button
            onClick={() => deleteNode(id)}
            className="p-1.5 rounded-md hover:bg-destructive/20 transition-colors"
            title="Delete node"
          >
            <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ top: 60 + index * 24 }}
          className="!bg-primary !border-2 !border-background !w-3 !h-3"
        />
      ))}

      {/* Content */}
      <div className="p-4 space-y-3">
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ top: 60 + index * 24 }}
          className="!bg-primary !border-2 !border-background !w-3 !h-3"
        />
      ))}

      {/* Status indicator */}
      {(data.isRunning || data.isComplete || data.error) && (
        <div className={cn(
          'px-4 py-2 text-xs border-t border-node-border rounded-b-xl',
          data.isRunning && 'text-primary bg-primary/5',
          data.isComplete && 'text-success bg-success/5',
          data.error && 'text-destructive bg-destructive/5'
        )}>
          {data.isRunning && 'Running...'}
          {data.isComplete && 'Completed'}
          {data.error && data.error}
        </div>
      )}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';
