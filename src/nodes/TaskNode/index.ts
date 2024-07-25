import { MarkerType, type Node } from "@xyflow/react";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomFamily } from "jotai/utils";
import { nanoid } from "nanoid";
import { edgeAtom, edgeIdsAtom } from "../../edges/atom";
import { type NodeId, nodeIdsAtom } from "../atom";

export type TaskNode = Node<Task>;

export const taskNodeAtom = atomFamily((id: NodeId) =>
  atom<TaskNode>({
    id,
    type: "task",
    position: { x: 0, y: 0 },
    data: {
      title: "",
      lines: [],
      parents: [],
      children: [],
    },
  }),
);

export type Task = {
  title: string;
  lines: string[];
  parents: NodeId[];
  children: NodeId[];
};

/**
 * NOTE:
 * - taskDataAtomを基準にtaskNodeAtomを構成すると問題が起きた
 *   - input要素で連続で更新するとfocusが外れてしまう
 *   - そのため、taskNodeAtomを基準としつつ、jotai-opticsを使ってtaskDataAtomを構成している
 */
const taskDataAtom = atomFamily((id: NodeId) =>
  focusAtom(taskNodeAtom(id), o => o.prop("data")),
);

export const setTitleAtom = atomFamily((id: NodeId) =>
  atom(null, (_get, set, title: string) => {
    set(taskDataAtom(id), p => ({ ...p, title }));
  }),
);

export const setLinesAtom = atomFamily((id: NodeId) =>
  atom(null, (_get, set, lines: string[]) => {
    set(taskDataAtom(id), p => ({ ...p, lines }));
  }),
);

export const isRoot = (task: Task) => task.parents.length === 0;
export const isLeaf = (task: Task) => task.children.length === 0;

// TODO: clean
export const splitAtom = atom(null, (get, set, id: string) => {
  const node = get(taskNodeAtom(id));
  const lines = node.data.lines;

  // 親の内容を書き換える
  set(setLinesAtom(id), []);

  lines.forEach((line, index) => {
    const newId = nanoid();
    const newPosition = getChildNodePosition(node, index, lines.length);

    set(taskDataAtom(id), p => ({
      ...p,
      children: [...p.children, newId],
    }));

    // linesの分だけnodeを追加する TODO: split:add
    set(nodeIdsAtom, ids => [...ids, newId]);
    set(taskNodeAtom(newId), () => ({
      id: newId,
      type: "task",
      position: newPosition,
      data: {
        title: line,
        lines: [],
        parents: [id],
        children: [],
      },
    }));

    // 親に対してedgeを引く
    set(edgeIdsAtom, ids => [...ids, newId]);
    set(edgeAtom(newId), {
      id: nanoid(),
      source: newId,
      target: id,
      markerStart: "source",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "black",
      },
    });
  });
});

// TODO: 適当
const getChildNodePosition = (
  parentNode: Node,
  index: number,
  totalChildren: number,
) => {
  if (!parentNode?.position || !parentNode?.width || !parentNode?.height) {
    return { x: 0, y: 0 };
  }

  const offsetX = -200;
  const spacingY = 50;

  const baseX = parentNode.position.x + offsetX;
  const baseY = parentNode.position.y + parentNode.height / 2;

  const positionY = baseY + (index - (totalChildren - 1) / 2) * spacingY;

  return {
    x: baseX,
    y: positionY,
  };
};
