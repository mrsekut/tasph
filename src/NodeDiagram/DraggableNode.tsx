import type React from 'react';
import type { TaskNode } from '../TaskNode';
import { Node } from './Node';

type Props = {
  node: TaskNode;
  onMouseDown: () => void;
};

export const DraggableNode: React.FC<Props> = ({ node, onMouseDown }) => (
  <div
    className="absolute cursor-move"
    style={{
      left: `${node.x}px`,
      top: `${node.y}px`,
      transform: 'translate(-50%, -50%)',
    }}
    onMouseDown={onMouseDown}
  >
    <Node node={node} />
  </div>
);
