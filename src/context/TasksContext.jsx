import React, { createContext, useState, useEffect } from "react";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    setAllTasks(tasksFromStorage);
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [...allTasks, newTask];
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (title) => {
    // Filter out the task with the given title
    const updatedTasks = allTasks.filter((task) => task.title !== title);
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  const editTask = (title, updatedTaskData) => {
    const updatedTasks = allTasks.map((task) =>
      task.title === title ? { ...task, ...updatedTaskData } : task
    );
    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <TasksContext.Provider value={{ allTasks, addTask, deleteTask, editTask }}>
      {children}
    </TasksContext.Provider>
  );
};
