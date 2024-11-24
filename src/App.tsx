import { useAtomValue, useSetAtom } from 'jotai';
import { NodeDiagram } from './NodeDiagram/NodeDiagram';
import './index.css';
import { moveNodeAtom, nodesAtom } from './TaskNode/atom';

function App() {
  const nodes = useAtomValue(nodesAtom);
  const moveNode = useSetAtom(moveNodeAtom);
  return <NodeDiagram nodes={nodes} moveNode={moveNode} />;
}

export default App;
