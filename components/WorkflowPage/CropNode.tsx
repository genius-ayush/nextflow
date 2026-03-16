'use client'
import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { Crop } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { NodeData , useWorkflowStore } from '@/lib/stores/workflowsStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type CropNodeProps = NodeProps & { data: NodeData };

export const CropNode = memo(({ id, data }: CropNodeProps) => {
  const { updateNodeData } = useWorkflowStore();

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<Crop className="w-4 h-4 text-white" />}
      color="#ef4444"
      inputs={[{ id: 'video-in', label: 'Video' }]}
      outputs={[{ id: 'video-out', label: 'Cropped Video' }]}
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">X</Label>
            <Input
              type="number"
              value={data.cropX || 0}
              onChange={(e) => updateNodeData(id, { cropX: parseInt(e.target.value) || 0 })}
              className="text-sm bg-secondary/50 border-node-border"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Y</Label>
            <Input
              type="number"
              value={data.cropY || 0}
              onChange={(e) => updateNodeData(id, { cropY: parseInt(e.target.value) || 0 })}
              className="text-sm bg-secondary/50 border-node-border"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Width</Label>
            <Input
              type="number"
              value={data.cropWidth || 1920}
              onChange={(e) => updateNodeData(id, { cropWidth: parseInt(e.target.value) || 1920 })}
              className="text-sm bg-secondary/50 border-node-border"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Height</Label>
            <Input
              type="number"
              value={data.cropHeight || 1080}
              onChange={(e) => updateNodeData(id, { cropHeight: parseInt(e.target.value) || 1080 })}
              className="text-sm bg-secondary/50 border-node-border"
            />
          </div>
        </div>
      </div>
    </BaseNode>
  );
});

CropNode.displayName = 'CropNode';
