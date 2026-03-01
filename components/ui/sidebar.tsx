"use client";
import Image from "next/image"
import React, { useState } from 'react';
import { 
  Home, Layers, Layout, Folder, Video, 
  Zap, Sparkles, MoreHorizontal, ChevronLeft, ChevronRight, 
  PanelLeft
} from 'lucide-react';
import { cn } from "@/lib/utils"; // Standard Shadcn utility
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside 
      className={cn(
        "relative flex flex-col h-screen border-r border-zinc-800 bg-[#0a0a0a] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-64"
      )}
    >
      {/* Collapse Toggle Button */}
      
      <div className="flex flex-col flex-1 p-4 space-y-8 overflow-hidden">
        {/* Logo Section */}
        <Button
        onClick={toggleSidebar}
        
        size="icon"
        className="h-10 w-10  bg-[#0a0a0a] text-zinc-400 hover:none"
      >
        <PanelLeft size={14} />
      </Button>

        
        <nav className="space-y-2">
  <NavItem iconSrc="/homeicon.webp" label="Home" isCollapsed={isCollapsed} />
  <NavItem iconSrc="/trainlora.webp" label="Train Lora" isCollapsed={isCollapsed} />
  <NavItem iconSrc="/nodes.webp" label="Node Editor" isCollapsed={isCollapsed} active />
  <NavItem iconSrc="/assets.webp" label="Assets" isCollapsed={isCollapsed} />
</nav>

        
      </div>

      {/* User Profile Section */}
      <div className="p-4 mt-auto border-t border-zinc-900">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900 cursor-pointer transition-colors overflow-hidden",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="w-8 h-8 bg-zinc-700 rounded-full flex-shrink-0" />
          {!isCollapsed && (
            <div className="text-xs truncate animate-in slide-in-from-left-2">
              <p className="text-white font-medium">suitable-susta...</p>
              <p className="text-zinc-500">Free</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

interface NavItemProps {
  iconSrc: string;
  label: string;
  active?: boolean;
  isCollapsed: boolean;
}

function NavItem({ iconSrc, label, active, isCollapsed }: NavItemProps) {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 group",
        active
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100",
        isCollapsed ? "justify-center" : ""
      )}
    >
      <div className="flex-shrink-0">
        <Image
          src={iconSrc}
          alt={label}
          width={20}
          height={20}
          className={cn(
            "transition-opacity duration-200",
            active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
          )}
        />
      </div>

      {!isCollapsed && (
        <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
          {label}
        </span>
      )}
    </div>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-zinc-800 border-zinc-700 text-white"
          >
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}