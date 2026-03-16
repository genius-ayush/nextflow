'use client'
import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { NodeData } from '@/lib/stores/workflowsStore';
import { TextNode } from './TextNode';
import { ImageNode } from './ImageNode';
import { VideoNode } from './VideoNode';
import { LLMNode } from './LLMNode';
import { CropNode } from './CropNode';
import { FrameNode } from './FrameNode';

type CustomNodeProps = NodeProps & { data: NodeData };

export const CustomNode = memo((props: CustomNodeProps) => {
  switch (props.data.type) {
    case 'text':
      return <TextNode {...props} />;
    case 'image':
      return <ImageNode {...props} />;
    case 'video':
      return <VideoNode {...props} />;
    case 'llm':
      return <LLMNode {...props} />;
    case 'crop':
      return <CropNode {...props} />;
    case 'frame':
      return <FrameNode {...props} />;
    default:
      return <TextNode {...props} />;
  }
});

CustomNode.displayName = 'CustomNode';
