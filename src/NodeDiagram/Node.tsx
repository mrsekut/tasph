import type React from "react";
import type { TaskNode } from "../TaskNode";

type Props = {
  node: TaskNode;
};

// TODO: style
export const Node: React.FC<Props> = ({ node }) => {
  return (
    <div className="w-32 h-12 p-2 grid justify-center items-center rounded-lg bg-blue-300">
      {node.id}
    </div>
  );
};
