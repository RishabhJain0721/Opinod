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

  const handleNewsletterSignup = () => {
    alert(`Signed up with: ${email}`);
    setEmail("");
  };

  return (
    // <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-white p-6">
    //   <div className="ml-5 mr-5 flex flex-col md:flex-row md:justify-between items-center">
    //     {/* Left Half: Newsletter Signup */}
    //     <div className="w-full md:w-1/2 flex items-center mb-4 md:mb-0">
    //       <div>Join Our Newsletter : &nbsp;</div>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="Enter your email"
    //         className="p-2 text-xs rounded-l md:text-sm text-gray-800 outline-none"
    //       />
    //       <button
    //         onClick={handleNewsletterSignup}
    //         className="bg-blue-500 text-white px-4 py-2 rounded-r text-xs md:text-sm font-semibold hover:bg-blue-600 transition"
    //       >
    //         Join
    //       </button>
    //     </div>

    //     {/* Right Half: Buttons */}
    //     <div className="w-full text-sm md:w-1/2 flex flex-col md:flex-row justify-end items-center space-y-2 md:space-y-0 md:space-x-4">
    //       <button>Privacy Policy</button>
    //       <button>Terms of Use</button>
    //       <button>About Us</button>
    //       <button>Support</button>
    //     </div>
    //   </div>
    //   <div className="ml-5 mr-5 flex justify-between items-center mt-5">
    //     {/* Left Half: Newsletter Signup */}
    //     <div className="w-full md:w-1/2 flex text-xs items-center mb-4 md:mb-0">
    //       © 2024 Opinod
    //     </div>

    //     {/* Right Half: Buttons */}
    //     <div className="w-full text-lg md:w-1/2 flex flex-col md:flex-row justify-end items-center space-y-2 md:space-y-0 md:space-x-4">
    //       <FontAwesomeIcon icon={faEnvelope} />
    //       <FontAwesomeIcon icon={faFacebook} />
    //       <FontAwesomeIcon icon={faXTwitter} />
    //       <FontAwesomeIcon icon={faInstagram} />
    //     </div>
    //   </div>
    // </footer>

    // <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-white p-6">
    //   {/* Top Part: Newsletter Signup */}
    //   <div className="flex flex-col items-start mb-8">
    //     <h3 className="text-lg mb-2 font-semibold">Join Our Newsletter</h3>
    //     <div className="flex items-center w-full">
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="Enter your email"
    //         className="p-2 text-xs rounded-l md:text-sm text-gray-800 outline-none"
    //       />
    //       <button
    //         onClick={handleNewsletterSignup}
    //         className="bg-blue-500 text-white px-4 py-2 rounded-r text-xs md:text-sm font-semibold hover:bg-blue-600 transition"
    //       >
    //         Join
    //       </button>
    //     </div>
    //   </div>

    //   {/* Footer Content */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //     {/* Section: Need Help */}
    //     <div className="flex flex-col">
    //       <h4 className="font-bold mb-2">NEED HELP?</h4>
    //       <ul className="space-y-2 text-sm">
    //         <li>
    //           <button>Increase Contrast</button>
    //         </li>
    //         <li>
    //           <button>Store Locator</button>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Section: Contact Us */}
    //     <div className="flex flex-col">
    //       <h4 className="font-bold mb-2">CONTACT US</h4>
    //       <ul className="space-y-2 text-sm">
    //         <li>
    //           <button>Contact Us</button>
    //         </li>
    //         <li>
    //           <button>Careers</button>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Section: Legal */}
    //     <div className="flex flex-col">
    //       <h4 className="font-bold mb-2">LEGAL</h4>
    //       <ul className="space-y-2 text-sm">
    //         <li>
    //           <button>Privacy Policy</button>
    //         </li>
    //         <li>
    //           <button>Terms of Use</button>
    //         </li>
    //         <li>
    //           <button>About Us</button>
    //         </li>
    //         <li>
    //           <button>Support</button>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>

    //   {/* Social Media Icons */}
    //   <div className="flex justify-center md:justify-start mt-6 space-x-4">
    //     <FontAwesomeIcon icon={faEnvelope} />
    //     <FontAwesomeIcon icon={faFacebook} />
    //     <FontAwesomeIcon icon={faXTwitter} />
    //     <FontAwesomeIcon icon={faInstagram} />
    //   </div>

    //   {/* Company Name and Year */}
    //   <div className="text-center mt-4">© 2024 Opinod</div>
    // </footer>

    <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-white text-center py-6">
      <div className="text-base mt-3">
        Join our newsletter to get exclusive articles based on your interests
        and stay informed always
      </div>

      <form className="mt-4 flex justify-center items-center ">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-1 rounded-l-md border border-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-1 border border-blue-500 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-sm mt-10">
        <a href="#explore" className="hover:underline">
          Explore
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
        <a href="#privacy-policy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#terms-of-use" className="hover:underline">
          Terms of Use
        </a>
        <a href="#support" className="hover:underline">
          Support
        </a>
      </div>

      <div className="text-xs mt-4">© 2021 Opinod. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
