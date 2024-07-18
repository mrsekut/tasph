import { useCallback } from "react";

import "@xyflow/react/dist/style.css";
import {
  Background,
  Controls,
  type EdgeChange,
  type NodeChange,
  type OnConnect,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import { useAtom } from "jotai";
import { defaultEdgeOptions, edgeTypes } from "./edges";
import { edgesAtom } from "./edges/atom";
import { type TasphNode, nodeTypes } from "./nodes";
import { nodesAtom } from "./nodes/atom";

export default function App() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const onNodesChange = (changes: NodeChange<TasphNode>[]) => {
    setNodes(applyNodeChanges(changes, nodes));
  };

  const [edges, setEdges] = useAtom(edgesAtom);
  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges(applyEdgeChanges(changes, edges));
  };

  const onConnect: OnConnect = useCallback(
    connection => setEdges(addEdge(connection, edges)),
    [edges, setEdges],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
