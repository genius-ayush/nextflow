import { SidebarLeft } from './SidebarLeft';
import { SidebarRight } from './SidebarRight';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';

const Index = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background dark">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <SidebarLeft />
        <Canvas />
        <SidebarRight />
      </div>
    </div>
  );
};

export default Index;
