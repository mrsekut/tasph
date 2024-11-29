import { useAtomValue, useSetAtom } from 'jotai';
import { NodeDiagram } from './NodeDiagram/NodeDiagram';
import './index.css';
import { Editor } from './Editor/Editor';
import { changeTextAtom, textAtom } from './Editor/atom';
import { moveNodeAtom, nodesAtom } from './TaskNode/atom';
import { useSyncStore } from './Store';
import { Suspense } from 'react';

function App() {
  const text = useAtomValue(textAtom);
  const changeText = useSetAtom(changeTextAtom);

  const nodes = useAtomValue(nodesAtom);
  const moveNode = useSetAtom(moveNodeAtom);

  return (
    <div className="h-screen grid grid-cols-[auto,1fr]">
      <Editor text={text} handleChange={changeText} />
      <NodeDiagram nodes={nodes} moveNode={moveNode} />

      <Suspense>
        <SyncStoreBoundary />
      </Suspense>
    </div>
  );
}

// useSyncStoreがsuspendしてEditorからフォーカスが外れるのを防ぐ
const SyncStoreBoundary: React.FC = () => {
  useSyncStore();
  return null;
};

export default App;
