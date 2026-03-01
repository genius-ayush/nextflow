import React from 'react';
import { 
  Home, 
  Layers, 
  Layout, 
  Folder, 
  Image as ImageIcon, 
  Video, 
  Zap, 
  Sparkles, 
  Search, 
  ChevronDown, 
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function NodesPage(){

    return(
        <div className="flex h-screen bg-[#0a0a0a] text-zinc-400 font-sans">
      

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* HERO BANNER */}
        <section className="relative w-full h-[320px] overflow-hidden mb-12 bg-[#151515] border border-zinc-800 flex items-center">
          <div className="absolute inset-0 opacity-40 bg-[url('https://s.krea.ai/nodesHeaderBannerBlurGradient.webp')] bg-cover bg-center pointer-events-none" />
          
          <div className="relative z-10 px-12 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-blue-600 rounded-lg">
                 <Layout className="text-white" size={24} />
               </div>
               <h1 className="text-4xl font-bold text-white tracking-tight">Node Editor</h1>
            </div>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Nodes is the most powerful way to operate Krea. Connect every tool and model into complex automated pipelines.
            </p>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-6 text-base font-semibold transition-all group">
              New Workflow <Plus className="ml-2 group-hover:rotate-90 transition-transform" size={20}/>
            </Button>
          </div>
        </section>

        {/* CONTROLS & FILTER */}
        <div className="flex items-center justify-between mb-8">
          <Tabs defaultValue="projects" className="w-fit">
            <TabsList className="bg-transparent gap-4 p-0">
              <TabsTrigger value="projects" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white rounded-lg px-4 py-2">Projects</TabsTrigger>
              <TabsTrigger value="apps" className="text-zinc-500 hover:text-zinc-300">Apps</TabsTrigger>
              <TabsTrigger value="examples" className="text-zinc-500 hover:text-zinc-300">Examples</TabsTrigger>
              <TabsTrigger value="templates" className="text-zinc-500 hover:text-zinc-300">Templates</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <Input 
                placeholder="Search projects..." 
                className="bg-[#151515] border-zinc-800 w-64 pl-10 focus:ring-zinc-700"
              />
            </div>
            <Button variant="outline" className="bg-[#151515] border-zinc-800 text-zinc-300 gap-2">
              Last viewed <ChevronDown size={14} />
            </Button>
          </div>
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* New Workflow Card */}
          <div className="group cursor-pointer aspect-video bg-[#151515] border border-zinc-800 border-dashed rounded-xl flex items-center justify-center hover:bg-zinc-900 transition-colors">
            <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="text-zinc-400" />
            </div>
          </div>

          {/* Sample Workflow Cards */}
          <ProjectCard title="Untitled" edited="2 days ago" />
          <ProjectCard title="Sports Brand" edited="5 days ago" hasNodes />
          <ProjectCard title="Sports Brand" edited="5 days ago" />
        </div>
      </main>
    </div>
    )
}

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-900'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const ProjectCard = ({ title, edited, hasNodes = false }: { title: string, edited: string, hasNodes?: boolean }) => (
  <div className="space-y-3 group cursor-pointer">
    <div className="aspect-video bg-[#151515] border border-zinc-800 rounded-xl overflow-hidden relative p-4 flex items-center justify-center">
      {hasNodes ? (
        <div className="w-full h-full flex items-center justify-center opacity-50">
           {/* Mock node lines/visuals */}
           <div className="flex gap-2">
              <div className="w-8 h-12 bg-zinc-700 rounded-sm" />
              <div className="w-12 h-16 bg-zinc-600 rounded-sm mt-4" />
              <div className="w-8 h-12 bg-zinc-700 rounded-sm" />
           </div>
        </div>
      ) : (
        <div className="w-full h-full bg-zinc-800/20" />
      )}
    </div>
    <div className="px-1">
      <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-xs text-zinc-500 mt-1">Edited {edited}</p>
    </div>
  </div>
);