'use client'
import { Play, PlayCircle, Zap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkflowStore } from '@/lib/stores/workflowsStore';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Toolbar = () => {
  const { executeWorkflow, selectedNodes, nodes, currentRun } = useWorkflowStore();
  const isRunning = currentRun !== null;

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Workflow Builder</h1>
            <p className="text-xs text-muted-foreground">
              {nodes.length} node{nodes.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              className="gap-2" 
              disabled={isRunning || nodes.length === 0}
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Workflow
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              onClick={() => executeWorkflow('full')}
              disabled={nodes.length === 0}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Run All Nodes
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => executeWorkflow('selected')}
              disabled={selectedNodes.length === 0}
            >
              <Play className="w-4 h-4 mr-2" />
              Run Selected ({selectedNodes.length})
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
