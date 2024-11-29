import { atom, useAtom, useSetAtom } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { useEffect } from 'react';
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

const isLoadedAtom = atom(false);

// save
const saveAtom = atomEffect((get, set) => {
  const nodes = get(nodesAtom);
  const text = get(textAtom);

  set(storeAtom, { nodes, text });
});

// load
const initializeAtom = atom(null, (get, set) => {
  const { nodes, text } = get(storeAtom);

  if (!get(isLoadedAtom)) {
    set(nodesAtom, nodes);
    set(textAtom, text);

    set(isLoadedAtom, true);
  }
});

export const useSyncStore = () => {
  // save
  useAtom(saveAtom);

  // load
  const initialize = useSetAtom(initializeAtom);
  useEffect(() => {
    initialize();
  }, []);
};
