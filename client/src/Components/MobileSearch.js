import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MobileSearch = () => {
  return (
    <div className="relative top-24 flex mx-3">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-900 border-r-0 rounded-l-full focus:outline-none focus:border-blue-500"
        placeholder="Search news"
      />
      <button className="px-4 border border-gray-900 border-l-0 rounded-r-full text-gray-400">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default MobileSearch;
