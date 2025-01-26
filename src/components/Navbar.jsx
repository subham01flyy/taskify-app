import React, { useContext, useState } from "react";
import logo from "../assets/taskifyLogo.png";
import { ThemeContext } from "../context/ThemeContext";
import { BsFillMoonFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import AddTaskModal from "./AddTaskModal";
const Navbar = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className={`${
        isDarkTheme ? "bg-[#0e172a] text-white" : "bg-[#edf2f7] text-black"
      } flex justify-between items-center p-5`}
    >
      <div className="flex items-center gap-1">
        <img src={logo} alt="Icon" className="w-12 h-12" />
        <p className="font-bold text-xl tracking-widest">
          Taski<span className="text-red-500">fy</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 text-[10px]"
        >
          + Add Task
        </button>
        {isDarkTheme ? (
          <div className="cursor-pointer">
            <BsFillSunFill onClick={toggleTheme} size={25} />
          </div>
        ) : (
          <div className="cursor-pointer">
            <BsFillMoonFill onClick={toggleTheme} size={20} />
          </div>
        )}
      </div>
      {/* Modal Section */}
      {isModalOpen && <AddTaskModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Navbar;
