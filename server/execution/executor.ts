export async function executeWorkflow(workflow, runId) {

 const layers = buildExecutionLayers(workflow.nodes, workflow.edges);

 for (const layer of layers) {

   await Promise.all(
     layer.map(nodeId =>
       executeNode(nodeId, workflow, runId)
     )
   );

 }

}

async function executeNode(nodeId, workflow, runId) {

 const node = workflow.nodes.find(n => n.id === nodeId);

 switch(node.type){

   case "llm":
     return runLLMNode(node);

   case "crop-image":
     return runCropNode(node);

   case "extract-frame":
     return runFrameNode(node);

 }

}