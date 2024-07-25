import type { Node } from "@xyflow/react";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomFamily } from "jotai/utils";
import type { NodeId } from "../atom";

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
