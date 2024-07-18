import type { Node } from "@xyflow/react";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { NodeId } from "../atom";

export type Task = {
  label: "task";
  title: string;
  lines: string[];
  parents: NodeId[];
  children: NodeId[];
};

export type TaskNode = Node<Task>;
export const taskNodeAtom = atomFamily((id: NodeId) =>
  atom<TaskNode>({
    id,
    type: "task",
    position: { x: 0, y: 0 },
    data: {
      label: "task",
      title: "",
      lines: [],
      parents: [],
      children: [],
    },
  }),
);
