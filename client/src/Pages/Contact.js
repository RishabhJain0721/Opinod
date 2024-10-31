import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React from "react";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div
          className="cursor-pointer mb-3 md:mb-5 md:my-5"
          onClick={() => {
            navigate("/");
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" /> Home
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Contact Us
        </h2>
        <div className="mt-6 space-y-4 text-gray-700">
          <div>
            <h3 className="font-semibold">Address</h3>
            <p>123 Main St</p>
            <p>Cityville, ST 12345</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p>(123) 456-7890</p>
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>contact@yourcompany.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
