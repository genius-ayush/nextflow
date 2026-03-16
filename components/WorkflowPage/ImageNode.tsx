'use client'
import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { Image, Upload } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { NodeData , useWorkflowStore } from '@/lib/stores/workflowsStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type ImageNodeProps = NodeProps & { data: NodeData };

export const ImageNode = memo(({ id, data }: ImageNodeProps) => {
  const { updateNodeData } = useWorkflowStore();

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<Image className="w-4 h-4 text-white" />}
      color="#10b981"
      inputs={[{ id: 'url-in', label: 'URL Input' }]}
      outputs={[{ id: 'image', label: 'Image' }]}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Image URL</Label>
          <Input
            value={data.url || ''}
            onChange={(e) => updateNodeData(id, { url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="text-sm bg-secondary/50 border-node-border"
          />
        </div>
        
        <Button variant="outline" size="sm" className="w-full border-dashed border-node-border">
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>

        {data.url && (
          <div className="rounded-lg overflow-hidden bg-secondary/30 border border-node-border">
            <img 
              src={data.url} 
              alt="Preview" 
              className="w-full h-32 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
        )}
      </div>
    </BaseNode>
  );
});

ImageNode.displayName = 'ImageNode';
