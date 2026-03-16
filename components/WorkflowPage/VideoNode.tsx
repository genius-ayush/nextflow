'use client'
import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { Video, Upload } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { NodeData , useWorkflowStore } from '@/lib/stores/workflowsStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type VideoNodeProps = NodeProps & { data: NodeData };

export const VideoNode = memo(({ id, data }: VideoNodeProps) => {
  const { updateNodeData } = useWorkflowStore();

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<Video className="w-4 h-4 text-white" />}
      color="#f59e0b"
      inputs={[{ id: 'url-in', label: 'URL Input' }]}
      outputs={[{ id: 'video', label: 'Video' }]}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Video URL</Label>
          <Input
            value={data.url || ''}
            onChange={(e) => updateNodeData(id, { url: e.target.value })}
            placeholder="https://example.com/video.mp4"
            className="text-sm bg-secondary/50 border-node-border"
          />
        </div>
        
        <Button variant="outline" size="sm" className="w-full border-dashed border-node-border">
          <Upload className="w-4 h-4 mr-2" />
          Upload Video
        </Button>

        {data.url && (
          <div className="rounded-lg overflow-hidden bg-secondary/30 border border-node-border">
            <video 
              src={data.url}
              controls
              className="w-full h-32 object-cover"
            />
          </div>
        )}
      </div>
    </BaseNode>
  );
});

VideoNode.displayName = 'VideoNode';
