import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { TasksContext } from "../context/TasksContext";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
  title,
  description,
  priority,
  isComplete,
  markComplete,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { deleteTask } = useContext(TasksContext);
  const navigate = useNavigate();

  const priorityColors = {
    low: "border-green-500",
    medium: "border-yellow-500",
    high: "border-red-700",
  };

  const priorityColor = priorityColors[priority] || "bg-gray-200";

  const handleDelete = () => {
    deleteTask(title);
  };

  const handleNavigate = () => {
    navigate(`/task-details/${title}`);
  };

  return (
    <div
      className={`${
        isDarkTheme ? "bg-[#0b111b] text-white" : "bg-[#ffffff] text-black"
      } w-full p-7 rounded-xl mb-5 shadow-md max-[600px]:w-full border-b-2 ${priorityColor}`}
    >
      <p className="text-xl font-bold text-center mt-3">{title}</p>
      <div
        className="h-[20vh] overflow-scroll
"
      >
        {" "}
        <p className="text-sm mt-2">{description}</p>
      </div>
      <div className="flex gap-4 item-center">
        <button
          className={`${
            isDarkTheme ? "border-[1px] border-white" : "border-2 border black"
          } text-[10px] p-2 rounded-md mt-5`}
          onClick={() => markComplete(title)}
        >
          {isComplete ? "Completed" : "Mark as Complete"}
        </button>
        <button onClick={handleDelete}>
          <MdDelete size={25} className="mt-5" />
        </button>
        <button onClick={handleNavigate}>
          <IoEyeSharp size={23} className="mt-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
