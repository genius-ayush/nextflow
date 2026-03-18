'use client'
import { Type, Image, Video, Brain, Crop, Frame, GripVertical } from 'lucide-react';
import { NodeType , useWorkflowStore } from '@/lib/stores/workflowsStore';
import { cn } from '@/lib/utils';

interface NodeTypeItem {
  type: NodeType;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const nodeTypes: NodeTypeItem[] = [
  {
    type: 'text',
    label: 'Text Input',
    icon: <Type className="w-4 h-4" />,
    color: '#3b82f6',
    description: 'Text content input',
  },
  {
    type: 'image',
    label: 'Image',
    icon: <Image className="w-4 h-4" />,
    color: '#10b981',
    description: 'Image upload/URL',
  },
  {
    type: 'video',
    label: 'Video',
    icon: <Video className="w-4 h-4" />,
    color: '#f59e0b',
    description: 'Video upload/URL',
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: <Brain className="w-4 h-4" />,
    color: '#a855f7',
    description: 'AI model processing',
  },
  {
    type: 'crop',
    label: 'Crop',
    icon: <Crop className="w-4 h-4" />,
    color: '#ef4444',
    description: 'Video cropping',
  },
  {
    type: 'frame',
    label: 'Frame',
    icon: <Frame className="w-4 h-4" />,
    color: '#06b6d4',
    description: 'Extract frame',
  },
];

export const SidebarLeft = () => {
  const { addNode } = useWorkflowStore();

  const handleDragStart = (e: React.DragEvent, nodeType: NodeType) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = (nodeType: NodeType) => {
    // Add node at a random position in the viewport
    const x = 200 + Math.random() * 400;
    const y = 100 + Math.random() * 300;
    addNode(nodeType, { x, y });
  };

  return (
    <aside className="w-64 h-full bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-sm text-foreground">Quick Access</h2>
        <p className="text-xs text-muted-foreground mt-1">Drag nodes to canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            draggable
            onDragStart={(e) => handleDragStart(e, node.type)}
            onClick={() => handleClick(node.type)}
            className={cn(
              'group flex items-center gap-3 p-3 rounded-lg border border-border',
              'bg-secondary/30 hover:bg-secondary/60 cursor-grab active:cursor-grabbing',
              'transition-all duration-150 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
            )}
          >
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: node.color }}
              >
                {node.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{node.label}</p>
                <p className="text-xs text-muted-foreground truncate">{node.description}</p>
              </div>
            </div>
            <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Drag or click to add nodes
        </div>
      </div>
    </aside>
  );
};
