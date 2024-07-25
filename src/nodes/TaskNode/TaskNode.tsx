import { Handle, type NodeProps, Position } from "@xyflow/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import {
  type TaskNode as TaskNode_,
  isLeaf,
  setLinesAtom,
  setTitleAtom,
  splitAtom,
  taskNodeAtom,
} from ".";
import { Editor } from "./Editor";
import { useShowDeps } from "./showDeps";

// TODO: clean, style
export function TaskNode({ id, selected }: NodeProps<TaskNode_>) {
  const taskNode = useAtomValue(taskNodeAtom(id));
  const { title, lines } = taskNode.data;
  const setTitle = useSetAtom(setTitleAtom(id));
  const setLines = useSetAtom(setLinesAtom(id));
  const split = useSetAtom(splitAtom);

  const { toggle, depsLevel } = useShowDeps(id);
  const backgroundColor = useMemo(() => {
    switch (true) {
      case depsLevel === 0:
        return "white";

      case depsLevel === 1:
        return "#cffafe";
      case isLeaf(taskNode.data):
        return "#67e8f9";
      default:
        return "#ecfeff";
    }
  }, [depsLevel, taskNode.data]);

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
        backgroundColor,
      }}
    >
      <Editor
        title={title}
        setTitle={setTitle}
        lines={lines}
        setLines={setLines}
      />

      <div>
        <button type="button" onClick={toggle}>
          deps
        </button>
      </div>
      <div>
        <button type="button" onClick={() => split(id)}>
          分割
        </button>
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
