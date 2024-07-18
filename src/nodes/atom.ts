import { atom } from "jotai";
import { nanoid } from "nanoid";
import type { TasphNode } from ".";
import { taskNodeAtom } from "./TaskNode";

export type NodeId = string;
export const nodeIdsAtom = atom<NodeId[]>([nanoid()]);

export const nodesAtom = atom<TasphNode[], [TasphNode[]], void>(
  get => get(nodeIdsAtom).map(id => get(taskNodeAtom(id))),
  (_get, set, ns) => {
    const ids = ns.map(n => n.id);
    set(nodeIdsAtom, ids);
    ns.map(n => set(taskNodeAtom(n.id), n));
  },
);
