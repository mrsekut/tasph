import type { NodeTypes } from "@xyflow/react";
import type { TaskNode } from "./TaskNode";
import { TaskNode as TaskNodeComponent } from "./TaskNode/TaskNode";

export const nodeTypes = {
  task: TaskNodeComponent,
} satisfies NodeTypes;

export type TasphNode = TaskNode;
