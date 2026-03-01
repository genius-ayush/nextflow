import { Sidebar } from "@/components/ui/sidebar";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      <Sidebar/>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}