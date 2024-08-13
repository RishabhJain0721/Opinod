import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const ReplyModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 pt-1 rounded w-96 shadow-lg">
        <button
          onClick={onClose}
          className=" text-sm text-blue-500 p-1 mb-1 rounded text-right w-full"
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ReplyModal;
