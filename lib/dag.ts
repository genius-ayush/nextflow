export function buildExecutionLayers(nodes, edges) {
  const inDegree = {};
  const graph = {};

  nodes.forEach(n => {
    inDegree[n.id] = 0;
    graph[n.id] = [];
  });

  edges.forEach(e => {
    graph[e.source].push(e.target);
    inDegree[e.target]++;
  });

  const queue = [];

  Object.keys(inDegree).forEach(id => {
    if (inDegree[id] === 0) queue.push(id);
  });

  const layers = [];

  while (queue.length) {
    const layer = [...queue];
    layers.push(layer);
    queue.length = 0;

    layer.forEach(node => {
      graph[node].forEach(nei => {
        inDegree[nei]--;
        if (inDegree[nei] === 0) queue.push(nei);
      });
    });
  }

  return layers;
}