import { atom } from 'jotai';
import type { Pos, Task, TaskId, TaskNode } from '.';

// TODO: use jotai-effect, name
export const nodesAtom = atom<TaskNode[]>([]);

// TODO: name:task?taskNode?
// TODO: 座標はいい感じにずらしたい, 既にそこにあったら少しズラス
export const addNodeAtom = atom(null, (get, set, task: Task) => {
  const nodes = get(nodesAtom);
  const newNodes = { ...task, x: 100, y: 100 };
  set(nodesAtom, [...nodes, newNodes]);
});

export const removeNodeAtom = atom(null, (get, set, id: TaskId) => {
  const nodes = get(nodesAtom);
  set(
    nodesAtom,
    nodes.filter(node => node.id !== id),
  );
});

export const moveNodeAtom = atom(null, (get, set, id: TaskId, pos: Pos) => {
  const nodes = get(nodesAtom);
  const node = nodes.find(node => node.id === id);

  if (node == null) return;

  set(
    nodesAtom,
    nodes.map(n => (n.id === id ? { ...n, ...pos } : n)),
  );
});
