import type React from "react";
import { useRef, useState } from "react";
import type { Pos, TaskId, TaskNode } from "../TaskNode";
import { Node } from "./Node";

type Props = {
  nodes: TaskNode[];
  moveNode: (id: TaskId, pos: Pos) => void;
};

// TODO: style
export const NodeDiagram: React.FC<Props> = ({ nodes, moveNode }) => {
  const [draggingNodeId, setDraggingNodeId] = useState<TaskId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNodeMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    nodeId: TaskId,
  ) => {
    e.stopPropagation();
    setDraggingNodeId(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingNodeId && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      moveNode(draggingNodeId, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {nodes.map(node => (
        <div
          key={node.id}
          className="absolute cursor-move"
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          onMouseDown={e => handleNodeMouseDown(e, node.id)}
        >
          <Node key={node.id} node={node} />
        </div>
      ))}
    </div>
  );
};
