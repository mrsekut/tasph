import { MarkerType } from "@xyflow/react";
import type { Edge, EdgeTypes } from "@xyflow/react";

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;

export type TasphEdge = Edge;

export const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 30,
    height: 30,
  },
};
