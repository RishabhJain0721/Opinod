import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newsletterSignup } from "../APIs/UserDetailsApis";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();

    console.log(email);
    if (!email) {
      toast.error("Please enter an email");
      return;
    }
    try {
      await newsletterSignup(email);
      toast.success(`Subscribed to newsletter : ${email}`);
    } catch (error) {
      toast.error("Error subscribing to newsletter");
      console.error("Error:", error);
    } finally {
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-white text-center py-6 bottom-0 relative w-full">
      <div className="text-sm md:text-lg mt-3 mx-3">
        Join our newsletter to get exclusive articles based on your interests
        and stay informed always
      </div>

      <form
        className="mt-4 flex justify-center items-center text-sm md:text-base"
        onSubmit={handleNewsletterSignup}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <div onClick={() => navigate("/contact")} className="hover:underline">
          Contact
        </div>
        <div onClick={() => navigate("/policy")} className="hover:underline">
          Privacy Policy
        </div>
        <div onClick={() => navigate("/terms")} className="hover:underline">
          Terms of Use
        </div>
        <div onClick={() => navigate("/support")} className="hover:underline">
          Help Center
        </div>
      </div>

      <div className="text-xs mt-4">© 2024 Opinod. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
