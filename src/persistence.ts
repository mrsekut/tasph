import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { TasphEdge } from "./edges";
import { edgesAtom } from "./edges/atom";
import type { TasphNode } from "./nodes";
import { nodesAtom } from "./nodes/atom";

type Data = { nodes: TasphNode[]; edges: TasphEdge[] };
const dataAtom = atomWithStorage<Data>(
  "tasph",
  {
    nodes: [],
    edges: [],
  },
  {
    getItem(key, initialValue) {
      const storedValue = localStorage.getItem(key);
      try {
        return JSON.parse(storedValue ?? "");
      } catch (e) {
        console.error(e);
        console.log(storedValue);
        return initialValue;
      }
    },
    setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
  },
  { getOnInit: true },
);

// TODO: 自動
export const loadAtom = atom(null, (get, set) => {
  const data = get(dataAtom);
  set(nodesAtom, data.nodes);
  set(edgesAtom, data.edges);
});

// TODO: 自動
export const saveAtom = atom(null, (get, set) => {
  const data = { nodes: get(nodesAtom), edges: get(edgesAtom) };
  set(dataAtom, data);
});
