import React, { useContext, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import { useNavigate } from "react-router-dom";

const AddTaskModal = ({
  setIsModalOpen,
  titleProp,
  DescProp,
  priorityProp,
  isEdit,
}) => {
  const [title, setTitle] = useState(isEdit ? titleProp : "");
  const [description, setDescription] = useState(isEdit ? DescProp : "");
  const [priority, setPriority] = useState(priorityProp ? priorityProp : "low");
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const { addTask, editTask } = useContext(TasksContext);
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSubmit = () => {
    console.log({ title, description });
    if (title === "" || description === "") {
      setError("*** Fields cannot be empty ***");
      return;
    }
    if (isEdit) {
      const updatedTaskData = { title, description, priority };
      editTask(titleProp, updatedTaskData);
      setIsModalOpen(false);
      navigate(`/`);
      return;
    }

    // When adding a new task
    const newTask = { title, description, priority, isComplete };
    addTask(newTask);
    setTitle("");
    setDescription("");
    setPriority("low");
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-black">Add New Task</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-lg mb-2 text-black" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            className="w-full p-2 border border-gray-300 rounded -lg focus:outline-none focus:ring focus:ring-blue-500 text-black"
            placeholder="Enter task title"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            className="block text-lg mb-2 text-black"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError("");
            }}
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Enter task description"
          />
        </div>

        {/* Priority Dropdown */}
        <div className="mb-2">
          <label className="block text-lg mb-2 text-black" htmlFor="priority">
            Priority:
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-2">
          <p className="text-red-600 text-sm">{error ? error : ""}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
