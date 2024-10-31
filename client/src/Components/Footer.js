import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSignup = () => {
    alert(`Signed up with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-white text-center py-6">
      <div className="text-sm md:text-base mt-3 mx-3">
        Join our newsletter to get exclusive articles based on your interests
        and stay informed always
      </div>

      <form className="mt-4 flex justify-center items-center text-sm md:text-base">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-1 w-3/5 md:w-auto rounded-l-md border border-gray-400 text-gray-800 focus:outline-none"
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
