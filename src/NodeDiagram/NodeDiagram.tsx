import type React from "react";
import { useRef, useState } from "react";
import type { Pos, TaskId, TaskNode } from "../TaskNode";
import { DraggableNode } from "./DraggableNode";

type Props = {
  nodes: TaskNode[];
  moveNode: (id: TaskId, pos: Pos) => void;
};

// TODO: style
export const NodeDiagram: React.FC<Props> = ({ nodes, moveNode }) => {
  const [draggingNodeId, setDraggingNodeId] = useState<TaskId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative w-full h-full bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {nodes.map(node => (
        <DraggableNode
          key={node.id}
          node={node}
          onMouseDown={() => setDraggingNodeId(node.id)}
        />
      ))}
    </div>
  );
};
