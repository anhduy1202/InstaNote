import React from "react";

interface TaskProps {
  task: string;
  id: number;
}

const Task: React.FC<TaskProps> = (props) => {
  const { task, id } = props;
  return (
    <div className="w-[150px] h-auto p-1 rounded-md text-start bg-sky-300 text-black">
      <p className="text-[2rem] font-bold font-mono mb-2">{id + 1}.</p>
      <p>{task}</p>
    </div>
  );
};

export default Task;
