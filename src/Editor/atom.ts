import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Task } from "../TaskNode";
import { addNodeAtom, nodesAtom, removeNodeAtom } from "../TaskNode/atom";

// TODO: use jotai-effect
export const textAtom = atomWithStorage("text", "");

// TODO: clean
// TODO: taskに依存してしまう。 jotai-effectを使う?
export const changeTextAtom = atom(null, (get, set, newText: string) => {
  const tasks = get(nodesAtom);

  const { added, removed } = diff(tasks, extractTasks(newText));

  added.map(t => set(addNodeAtom, t));
  removed.map(t => set(removeNodeAtom, t.id));

  set(textAtom, newText);
});

const extractTasks = (text: string): Task[] => {
  return Array.from(text.matchAll(/\[([^\]]+)\]/g)).map(match => ({
    id: match[1],
  }));
};

const diff = (a: Task[], b: Task[])  => {
  const isIn = (arr: Task[], id: string) => arr.some(item => item.id === id);

  return {
    added: b.filter(item => !isIn(a, item.id)),
    removed: a.filter(item => !isIn(b, item.id)),
  };
}