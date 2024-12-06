import { useAtom } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { textAtom } from '../Editor/atom';
import type { TaskNode } from '../TaskNode';
import { nodesAtom } from '../TaskNode/atom';

type Store = {
  text: string;
  nodes: TaskNode[];
};

const storeAtom = atomWithStorage<Store>(
  'store',
  { text: '', nodes: [] },
  createJSONStorage<Store>(),
  { getOnInit: true },
);

const saveAtom = atomEffect((get, set) => {
  const nodes = get(nodesAtom);
  const text = get(textAtom);
  set(storeAtom, { nodes, text });
});

const loadAtom = atomEffect((get, set) => {
  const { nodes, text } = get(storeAtom);
  set(nodesAtom, nodes);
  set(textAtom, text);
});

export const useSyncStore = () => {
  // initialize時にloadを優先するため、loadを先に書く
  useAtom(loadAtom);
  useAtom(saveAtom);
};
