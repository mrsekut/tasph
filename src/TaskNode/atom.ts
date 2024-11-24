import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils';
import type { Pos, TaskId, TaskNode } from ".";
import { dummyNodes } from "./dummy";

// TODO: use jotai-effect
export const nodesAtom = atomWithStorage<TaskNode[]>('nodes', dummyNodes)

export const moveNodeAtom = atom(null, (get, set, id: TaskId, pos: Pos) => {
  const nodes = get(nodesAtom);
  const node = nodes.find(node => node.id === id);

  if (node == null) return;

  set(
    nodesAtom,
    nodes.map(n => (n.id === id ? { ...n, ...pos } : n)),
  );
})