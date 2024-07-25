import { Handle, type NodeProps, Position } from "@xyflow/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  type TaskNode as TaskNode_,
  setLinesAtom,
  setTitleAtom,
  taskNodeAtom,
} from ".";
import { Editor } from "./Editor";

export function TaskNode({ id, selected }: NodeProps<TaskNode_>) {
  const taskNode = useAtomValue(taskNodeAtom(id));
  const { title, lines } = taskNode.data;
  const setTitle = useSetAtom(setTitleAtom(id));
  const setLines = useSetAtom(setLinesAtom(id));

  return (
    <div
      className="react-flow__node-default"
      style={{
        padding: 10,
        borderRadius: 5,
        border: "1px solid #ddd",
        background: "#fff",
        color: "#222",
        boxShadow: selected ? "0 0 10px #000" : "none",
      }}
    >
      <Editor
        title={title}
        setTitle={setTitle}
        lines={lines}
        setLines={setLines}
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
