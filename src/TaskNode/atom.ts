import { atom } from "jotai";
import type { Pos, TaskId, TaskNode } from ".";
import { dummyNodes } from "./dummy";

export const nodesAtom = atom<TaskNode[]>(dummyNodes)

export const moveNodeAtom = atom(null, (get, set, id: TaskId, pos: Pos) => {
  const nodes = get(nodesAtom);
  const node = nodes.find(node => node.id === id);

  if (node == null) return;

  set(
    nodesAtom,
    nodes.map(n => (n.id === id ? { ...n, ...pos } : n)),
  );
})