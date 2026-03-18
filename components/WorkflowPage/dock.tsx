"use client"

import { useState } from "react"
import {
  Workflow,
  Hand,
  Scissors,
  Sparkles,
  Copy,
  Plus,
  MousePointer2
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"

const tools = [
  { id: "add", icon: Plus, label: "New Node" },
  { id: "select", icon: MousePointer2, label: "Draw Selection" },
  { id: "pan", icon: Hand, label: "Pan" },
  { id: "cut", icon: Scissors, label: "Cut Connections" },
  { id: "magic", icon: Sparkles, label: "Prompt to Workflow" },
  { id: "duplicate", icon: Workflow, label: "Presets" },
]

export default function Dock() {
  const [active, setActive] = useState("pan")

  return (
    <TooltipProvider delayDuration={200}>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl px-2 py-1 shadow-2xl">
          
          {tools.map((tool) => {
            const Icon = tool.icon
            const isActive = active === tool.id

            return (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActive(tool.id)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition",
                      "text-muted-foreground hover:text-white",
                      "hover:bg-white/10",
                      isActive &&
                        "bg-white/15 text-white shadow-inner"
                    )}
                  >
                    <Icon size={18} />
                  </button>
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  className="text-xs"
                >
                  {tool.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}