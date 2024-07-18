import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import type { TasphEdge } from ".";

export type EdgeId = string;
export const edgeIdsAtom = atom<EdgeId[]>([]);

export const edgesAtom = atom<TasphEdge[], [TasphEdge[]], void>(
  get => {
    return get(edgeIdsAtom)
      .map(id => get(edgeAtom(id)))
      .filter(e => e != null);
  },
  (_get, set, es) => {
    const ids = es.map(e => e.id);
    set(edgeIdsAtom, ids);
    es.map(e => set(edgeAtom(e.id), e));
  },
);

export const edgeAtom = atomFamily((_id: EdgeId) =>
  atom<null | TasphEdge>(null),
);
