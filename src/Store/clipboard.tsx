import { useSetAtom } from 'jotai';
import { storeAtom } from '.';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';

export const CopyButton: React.FC = () => {
  const handleClick = useAtomCallback(
    useCallback(get => {
      const store = get(storeAtom);
      navigator.clipboard.writeText(JSON.stringify(store, null, 2));
    }, []),
  );

  return <button onClick={handleClick}>copy</button>;
};

export const PasteButton: React.FC = () => {
  const setStore = useSetAtom(storeAtom);

  const handleClick = async () => {
    const input = await navigator.clipboard.readText();
    const { nodes, text } = JSON.parse(input);
    setStore({ nodes, text });
  };

  return <button onClick={handleClick}>paste</button>;
};
