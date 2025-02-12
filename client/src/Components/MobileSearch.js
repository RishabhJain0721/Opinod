import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const MobileSearch = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    if (!searchText) {
      toast.error("Please enter something");
      return;
    }
    navigate(`/search/${searchText}`);
  };

  return (
    <div className="relative top-24 flex mx-3 text-sm">
      <input
        type="text"
        className=" w-full text-sm md:text-base px-4 py-2 border border-gray-300 border-r-0 rounded-l-full focus:outline-none focus:border-gray-800"
        placeholder="Search news/community posts"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className="px-4 border border-gray-300 bg-gray-800 border-l-0 rounded-r-full text-white"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default MobileSearch;
