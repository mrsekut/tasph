import { atom, useAtomValue } from "jotai";
import { atomFamily, useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import type { TaskNode } from ".";
import { type NodeId, nodeIdsAtom, nodesAtom } from "../atom";

// TODO: interface
export const useShowDeps = (id: NodeId) => {
  const depsLevel = useAtomValue(depsLevelAtom(id));

  const toggle = useCallback(
    useAtomCallback((get, set) => {
      if (get(isShowDeps)) {
        set(resetAtom);
      } else {
        set(selectRootAtom, id);
      }
    }),
    [],
  );

  return { depsLevel, toggle };
};

const depsLevelAtom = atomFamily((_id: NodeId) => atom(0));

const isShowDeps = atom(get => {
  const ids = get(nodeIdsAtom);
  return ids.some(id => get(depsLevelAtom(id)) > 0);
});

const selectRootAtom = atom(null, (get, set, id: NodeId) => {
  const nodes = get(nodesAtom);
  selfAndLeaves(nodes, id).map(l => set(depsLevelAtom(l.id), l.level));
});

const resetAtom = atom(null, (get, set) => {
  get(nodesAtom).map(n => set(depsLevelAtom(n.id), 0));
});

const selfAndLeaves = (
  nodes: TaskNode[],
  id: NodeId,
  level = 1,
): { id: NodeId; level: number }[] => {
  const node = nodes.find(n => n.id === id);
  if (node == null) {
    return [];
  }

  const self = { id, level };

  const children = node.data.children;
  if (children.length === 0) {
    return [self];
  }

  const leaves = children.flatMap(childId =>
    selfAndLeaves(nodes, childId, level + 1),
  );

  return [self, ...leaves];
};
