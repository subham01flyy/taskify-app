import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import Navbar from "./Navbar";
import { ThemeContext } from "../context/ThemeContext";
import AddTaskModal from "./AddTaskModal";

const TaskDetails = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const { allTasks } = useContext(TasksContext);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const task = allTasks.find((task) => task.title === title);

  if (!task) {
    return <p>Task not found!</p>;
  }

  const handleNavigate = () => {
    navigate(`/`);
  };

  return (
    <>
      <Navbar />
      <div
        className={`${
          isDarkTheme ? "bg-[#0e172a] text-white" : "bg-[#edf2f7] text-black"
        } flex justify-center items-center p-7`}
        style={{ height: "100vh" }}
      >
        <div
          className={`${
            isDarkTheme ? "bg-[#0b111b] text-white" : "bg-[#ffffff] text-black"
          } p-7 rounded-xl mb-10 shadow-md w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[50%] mx-auto`}
          style={{ height: "70vh" }}
        >
          <div className="h-[50vh]">
            <h2 className="text-center sm:text-[38px] font-bold">
              {task.title}
            </h2>
            <div className="h-[20vh] overflow-scroll mb-8">
              <p className="text-left sm:text-[20px] mt-6">
                {task.description}
              </p>
            </div>
            <p className="sm:m-6 mb-10 flex">
              <span className="text-center text-[16px] sm:text-[22px] font-bold block sm:inline">
                Priority:
              </span>
              <span
                className={`${
                  task.priority === "high"
                    ? "bg-red-700"
                    : task.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                } sm:px-8 px-4 py-2 sm:py-2 text-[14px] sm:text-[18px] sm:rounded-full rounded-[5px] ml-4`}
              >
                {task.priority}
              </span>
            </p>

            <p className=" sm:m-6 mb-10">
              <span className="text-center sm:text-[28px] font-bold">
                Status:
              </span>{" "}
              <span className={` px-10 sm:text-[18px] rounded-full`}>
                {task.isComplete ? "Completed" : "Not Completed"}
              </span>
            </p>
          </div>
          <div className="flex justify-center gap-5 w-full mt-30px">
            <button
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="sm:px-10 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700 text-[15px]"
              onClick={handleNavigate}
            >
              All Tasks
            </button>
            <button
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="sm:px-10 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700 text-[15px]"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Task
            </button>
          </div>
          {isModalOpen && (
            <AddTaskModal
              titleProp={task.title}
              DescProp={task.description}
              priorityProp={task.priority}
              setIsModalOpen={setIsModalOpen}
              isEdit={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
