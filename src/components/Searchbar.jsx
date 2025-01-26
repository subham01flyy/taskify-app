import React, { useState } from "react";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value); // Trigger the search dynamically on input change
    }
  };

  return (
    <div className="flex items-center justify-center sm:w-full w-[85%] max-w-md mx-auto">
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default SearchBar;
