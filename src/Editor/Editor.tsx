import type React from "react";

type Props = {
  text: string;
  handleChange: (text: string) => void;
};

// TODO: style
export const Editor: React.FC<Props> = ({ text, handleChange }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type here... Use [task name] to create tasks"
        className="w-full h-64 p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
