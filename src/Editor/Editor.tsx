import type React from "react";

type Props = {
  text: string;
  handleChange: (text: string) => void;
};

export const Editor: React.FC<Props> = ({ text, handleChange }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e.target.value);
  };

  return (
    <div className="min-w-[30rem] h-full p-4">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type here... Use [task name] to create tasks"
        className="w-full h-full p-2 focus:outline-none focus:ring-0"
      />
    </div>
  );
};
