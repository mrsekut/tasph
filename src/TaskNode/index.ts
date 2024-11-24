export type TaskId = string

export type Task = {
  id: TaskId;
}

/////
export type TaskNode = Task & Pos

export type Pos = {
  x: number;
  y: number;
}