import type React from "react";

type Props = {
  title: string;
  setTitle: (title: string) => void;
  lines: string[];
  setLines: (lines: string[]) => void;
};

export const Editor: React.FC<Props> = ({
  title,
  setTitle,
  lines,
  setLines,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="nodrag"
      />
      <textarea
        style={{
          width: "100%",
          minHeight: 20,
          height: lines.length * 20,
        }}
        value={lines.join("\n")}
        onChange={e => setLines(e.target.value.split("\n"))}
        className="nodrag"
      />
    </div>
  );
};
