'use client'
import { memo, useState } from 'react';
import { NodeProps } from '@xyflow/react';
import { Brain, ChevronDown } from 'lucide-react';
import { BaseNode } from './BaseNode';
import { NodeData , useWorkflowStore } from '@/lib/stores/workflowsStore';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const models = [
  { id: 'gemini-pro', name: 'Gemini Pro' },
  { id: 'gemini-pro-vision', name: 'Gemini Pro Vision' },
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-4-vision', name: 'GPT-4 Vision' },
  { id: 'claude-3', name: 'Claude 3' },
];

type LLMNodeProps = NodeProps & { data: NodeData };

export const LLMNode = memo(({ id, data }: LLMNodeProps) => {
  const { updateNodeData } = useWorkflowStore();
  const [showResult, setShowResult] = useState(false);

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<Brain className="w-4 h-4 text-white" />}
      color="#a855f7"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'user', label: 'User' },
        { id: 'images', label: 'Images' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Model</Label>
          <Select
            value={data.model || 'gemini-pro'}
            onValueChange={(value) => updateNodeData(id, { model: value })}
          >
            <SelectTrigger className="bg-secondary/50 border-node-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">System Prompt</Label>
          <Textarea
            value={data.systemPrompt || ''}
            onChange={(e) => updateNodeData(id, { systemPrompt: e.target.value })}
            placeholder="You are a helpful assistant..."
            className="min-h-[60px] text-sm bg-secondary/50 border-node-border resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">User Prompt</Label>
          <Textarea
            value={data.userPrompt || ''}
            onChange={(e) => updateNodeData(id, { userPrompt: e.target.value })}
            placeholder="Analyze this image..."
            className="min-h-[60px] text-sm bg-secondary/50 border-node-border resize-none"
          />
        </div>

        {data.result && (
          <Collapsible open={showResult} onOpenChange={setShowResult}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
              <span>Results</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showResult ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="p-3 rounded-lg bg-secondary/30 border border-node-border text-sm text-muted-foreground">
                {data.result}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </BaseNode>
  );
});

LLMNode.displayName = 'LLMNode';
