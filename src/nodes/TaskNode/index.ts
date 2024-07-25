import type { Node } from "@xyflow/react";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { NodeId } from "../atom";

export type TaskNode = Node<Task>;

export const taskNodeAtom = atomFamily((id: NodeId) =>
  atom(
    get => {
      return {
        id,
        type: "task",
        position: get(positionAtom(id)),
        data: get(taskDataAtom(id)),
      } as const satisfies TaskNode;
    },
    (_get, set, n: TaskNode) => {
      set(positionAtom(id), n.position);
      set(taskDataAtom(id), n.data);
    },
  ),
);

const positionAtom = atomFamily((_id: NodeId) => atom({ x: 0, y: 0 }));

export type Task = {
  title: string;
  lines: string[];
  parents: NodeId[];
  children: NodeId[];
};

const taskDataAtom = atomFamily((_id: NodeId) =>
  atom<Task>({
    title: "",
    lines: [],
    parents: [],
    children: [],
  }),
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
