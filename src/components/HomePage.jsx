import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import TaskCard from "./TaskCard";
import { TasksContext } from "../context/TasksContext";
import Navbar from "./Navbar";
import SearchBar from "./Searchbar";

const HomePage = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { allTasks } = useContext(TasksContext);
  const [selectedTask, setSelectedTask] = useState("All Task");
  const [filteredTasks, setFilteredTasks] = useState(allTasks);

  const taskButtons = [
    { id: 1, label: "All Task" },
    { id: 2, label: "Completed Task" },
    { id: 3, label: "Not Completed Task" },
    { id: 4, label: "Priority - HIGH" },
    { id: 5, label: "Priority - MEDIUM" },
    { id: 6, label: "Priority - LOW" },
  ];

  const handleButtonClick = (task) => {
    setSelectedTask(task);

    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];

    // Filter tasks based on the selected task filter
    if (task === "Completed Task") {
      const completedTasks = tasksFromStorage.filter(
        (task) => task.isComplete === true
      );
      setFilteredTasks(completedTasks);
    } else if (task === "Not Completed Task") {
      const notCompletedTasks = tasksFromStorage.filter(
        (task) => task.isComplete === false || task.isComplete === undefined
      );
      setFilteredTasks(notCompletedTasks);
    } else if (task === "Priority - HIGH") {
      const highPriorityTasks = tasksFromStorage.filter(
        (task) => task.priority === "high"
      );
      setFilteredTasks(highPriorityTasks);
    } else if (task === "Priority - MEDIUM") {
      const mediumPriorityTasks = tasksFromStorage.filter(
        (task) => task.priority === "medium"
      );
      setFilteredTasks(mediumPriorityTasks);
    } else if (task === "Priority - LOW") {
      const lowPriorityTasks = tasksFromStorage.filter(
        (task) => task.priority === "low"
      );
      setFilteredTasks(lowPriorityTasks);
    } else {
      setFilteredTasks(tasksFromStorage);
    }
  };

  // Function to handle marking a task as completed or not completed
  const handleMarkAsComplete = (title) => {
    setSelectedTask("All Task");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = tasks.map((task) =>
      task.title === title ? { ...task, isComplete: !task.isComplete } : task
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setFilteredTasks(updatedTasks);
  };

  const handleSearch = (query) => {
    setSelectedTask("All Task");

    const filtered = allTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    setFilteredTasks(allTasks);
  }, [allTasks]);

  return (
    <>
      <Navbar />
      <div
        className={`${
          isDarkTheme ? "bg-[#0e172a] text-white" : "bg-[#edf2f7] text-black"
        }`}
        style={{ height: "100vh" }}
      >
        <div className={`text-center pt-[50px] p-5`}>
          <h1 className="font-bold sm:text-5xl text-3xl">
            Work <span className="text-red-500">smarter</span> with the
          </h1>
          <h1 className="font-bold sm:text-5xl text-3xl mt-4">
            #1 task <span className="text-red-500">management</span> platform
          </h1>
        </div>
        <div>
          <div className="flex flex-wrap justify-center gap-4 mt-6 p-5">
            {taskButtons.map((obj) => (
              <button
                key={obj.id}
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                className={`px-4 py-2 rounded ${
                  selectedTask === obj.label ? "bg-red-500" : "bg-white"
                } ${
                  selectedTask === obj.label ? "text-white" : "text-black"
                } text-sm sm:px-6 sm:py-3 sm:text-base`}
                onClick={() => handleButtonClick(obj.label)}
              >
                {obj.label}
              </button>
            ))}
          </div>
        </div>
        <SearchBar placeholder="Search tasks..." onSearch={handleSearch} />
        <div
          className={`${
            isDarkTheme ? "bg-[#0e172a] text-white" : "bg-[#edf2f7] text-black"
          } flex justify-center mt-10 gap-10 flex-wrap pt-10 pr-5 pl-5`}
        >
          {filteredTasks.length === 0 ? (
            <div className="text-center text-xl font-bold">No Task Added</div>
          ) : (
            filteredTasks.map((task, index) => (
              <div className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[25%]">
                <TaskCard
                  key={index}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  isComplete={task.isComplete}
                  markComplete={handleMarkAsComplete}
                />
              </div>
            ))
          )}
        </div>
        {/* Footer */}
        <div
          className={`${
            isDarkTheme ? "bg-[#0e172a] text-white" : "bg-[#edf2f7] text-black"
          } text-center pt-[9vh]`}
        >
          <p>Designed and build by Subham Saha, 2025 All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
