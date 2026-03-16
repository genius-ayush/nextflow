'use client'
import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { Type } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { NodeData , useWorkflowStore } from '@/lib/stores/workflowsStore';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type TextNodeProps = NodeProps & { data: NodeData };

export const TextNode = memo(({ id, data }: TextNodeProps) => {
  const { updateNodeData } = useWorkflowStore();

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<Type className="w-4 h-4 text-white" />}
      color="#3b82f6"
      outputs={[{ id: 'text', label: 'Text' }]}
    >
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Text Content</Label>
        <Textarea
          value={data.text || ''}
          onChange={(e) => updateNodeData(id, { text: e.target.value })}
          placeholder="Enter your text here..."
          className="min-h-[80px] text-sm bg-secondary/50 border-node-border resize-none"
        />
      </div>
    </BaseNode>
  );
});

TextNode.displayName = 'TextNode';
