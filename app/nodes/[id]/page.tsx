
import Dock from "@/components/WorkflowPage/dock";
import { Workflow } from "@/components/WorkflowPage/workflow";

export default function page(){

  return(
    <div className="text-white">
      <Workflow/>
      <Dock/>
    </div>
  )
}