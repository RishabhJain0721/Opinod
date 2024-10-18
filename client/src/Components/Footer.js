import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNewsletterSignup = () => {
    alert(`Signed up with: ${email}`);
    setEmail("");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic to toggle dark mode in your app
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-white p-6">
      <div className="ml-5 mr-5 flex flex-col md:flex-row md:justify-between items-center">
        {/* Left Half: Newsletter Signup */}
        <div className="w-full md:w-1/2 flex items-center mb-4 md:mb-0">
          <div>Join Our Newsletter : &nbsp;</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-2 text-xs rounded-l md:text-sm text-gray-800 outline-none"
          />
          <button
            onClick={handleNewsletterSignup}
            className="bg-blue-500 text-white px-4 py-2 rounded-r text-xs md:text-sm font-semibold hover:bg-blue-600 transition"
          >
            Join
          </button>
        </div>

        {/* Right Half: Buttons */}
        <div className="w-full text-sm md:w-1/2 flex flex-col md:flex-row justify-end items-center space-y-2 md:space-y-0 md:space-x-4">
          <button>Privacy Policy</button>
          <button>Terms of Use</button>
          <button>About Us</button>
          <button>Support</button>
        </div>
      </div>
      <div className="ml-5 mr-5 flex justify-between items-center mt-5">
        {/* Left Half: Newsletter Signup */}
        <div className="w-full md:w-1/2 flex text-xs items-center mb-4 md:mb-0">
          © 2024 Opinod
        </div>

        {/* Right Half: Buttons */}
        <div className="w-full text-lg md:w-1/2 flex flex-col md:flex-row justify-end items-center space-y-2 md:space-y-0 md:space-x-4">
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
