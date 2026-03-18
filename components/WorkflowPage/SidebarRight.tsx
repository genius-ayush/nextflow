'use client'
import { useState } from 'react';
import { Clock, CheckCircle, XCircle, ChevronRight, Loader2 } from 'lucide-react';
import { useWorkflowStore , ExecutionRun } from '@/lib/stores/workflowsStore';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

const formatDuration = (ms: number) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
};

const RunItem = ({ run, isSelected, onClick }: { run: ExecutionRun; isSelected: boolean; onClick: () => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn(
      'rounded-lg border transition-all',
      isSelected ? 'border-primary bg-primary/5' : 'border-border bg-secondary/20 hover:border-border/80'
    )}>
      <button
        onClick={() => {
          onClick();
          setExpanded(!expanded);
        }}
        className="w-full p-3 flex items-center gap-3"
      >
        {run.status === 'running' ? (
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
        ) : run.status === 'success' ? (
          <CheckCircle className="w-4 h-4 text-success" />
        ) : (
          <XCircle className="w-4 h-4 text-destructive" />
        )}

        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {run.status === 'running' ? 'Running...' : run.status === 'success' ? 'Completed' : 'Failed'}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(run.timestamp, { addSuffix: true })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {run.duration && (
            <span className="text-xs text-muted-foreground">
              {formatDuration(run.duration)}
            </span>
          )}
          <ChevronRight className={cn(
            'w-4 h-4 text-muted-foreground transition-transform',
            expanded && 'rotate-90'
          )} />
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          <div className="text-xs text-muted-foreground border-t border-border pt-2">
            Node Results:
          </div>
          {Object.entries(run.nodeResults).map(([nodeId, result]) => (
            <div
              key={nodeId}
              className="flex items-center gap-2 p-2 rounded bg-secondary/30 text-xs"
            >
              {result.status === 'success' ? (
                <CheckCircle className="w-3 h-3 text-success shrink-0" />
              ) : (
                <XCircle className="w-3 h-3 text-destructive shrink-0" />
              )}
              <span className="text-muted-foreground truncate flex-1">
                {nodeId.slice(0, 20)}...
              </span>
              <span className="text-muted-foreground shrink-0">
                {formatDuration(result.duration)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SidebarRight = () => {
  const { executionHistory, currentRun, selectRun, selectedNodes } = useWorkflowStore();
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const allRuns = currentRun ? [currentRun, ...executionHistory] : executionHistory;

  return (
    <aside className="w-72 h-full bg-card border-l border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-semibold text-sm text-foreground">Execution History</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {allRuns.length} run{allRuns.length !== 1 ? 's' : ''} recorded
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {allRuns.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">No executions yet</p>
              <p className="text-xs text-muted-foreground mt-1">Run a workflow to see history</p>
            </div>
          ) : (
            allRuns.map((run) => (
              <RunItem
                key={run.id}
                run={run}
                isSelected={selectedRunId === run.id}
                onClick={() => {
                  setSelectedRunId(run.id === selectedRunId ? null : run.id);
                  if (run.id !== selectedRunId) {
                    selectRun(run.id);
                  }
                }}
              />
            ))
          )}
        </div>
      </ScrollArea>

      {selectedNodes.length > 0 && (
        <div className="p-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {selectedNodes.length} node{selectedNodes.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </aside>
  );
};
