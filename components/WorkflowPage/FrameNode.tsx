'use client'
import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { Frame } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { NodeData , useWorkflowStore } from '@/lib/stores/workflowsStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type FrameNodeProps = NodeProps & { data: NodeData };

export const FrameNode = memo(({ id, data }: FrameNodeProps) => {
  const { updateNodeData } = useWorkflowStore();

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<Frame className="w-4 h-4 text-white" />}
      color="#06b6d4"
      inputs={[{ id: 'video-in', label: 'Video' }]}
      outputs={[{ id: 'image-out', label: 'Frame' }]}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Timestamp (seconds)</Label>
          <Input
            type="number"
            step="0.1"
            value={data.timestamp || 0}
            onChange={(e) => updateNodeData(id, { timestamp: parseFloat(e.target.value) || 0 })}
            className="text-sm bg-secondary/50 border-node-border"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Quick Select</Label>
          <Slider
            value={[data.timestamp || 0]}
            onValueChange={([value]) => updateNodeData(id, { timestamp: value })}
            max={120}
            step={0.5}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0:00</span>
            <span>2:00</span>
          </div>
        </div>
      </div>
    </BaseNode>
  );
});

FrameNode.displayName = 'FrameNode';
