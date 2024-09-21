import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/AdminNav";
import {
  getPeopleWithBadges,
  sendAchievementMail,
} from "../../APIs/UserDetailsApis.js";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const Rewards = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPeople = async () => {
    try {
      const data = await getPeopleWithBadges();
      // Initialize subject and body fields for each person
      const initializedPeople = data.map((person) => ({
        ...person,
        subject: "",
        body: "",
        isOpen: false, // Initialize dropdown state as closed
      }));
      setPeople(initializedPeople);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleSendEmail = async (person) => {
    await sendAchievementMail({
      email: person.email,
      subject: person.subject,
      body: person.body,
      badge: person.badge.name,
    });
    console.log(`Sending email to: ${person.email}`);
    console.log(`Subject: ${person.subject}`);
    console.log(`Body: ${person.body}`);
    toast.success(
      `Email sent to ${person.name} for achieving ${person.badge.name}!`
    );
    // Remove the specific achievement of the person after the email is sent
    setPeople((prevPeople) =>
      prevPeople.filter(
        (p) => p.email !== person.email || p.badge.name !== person.badge.name
      )
    );
  };

  const toggleDropdown = (index) => {
    setPeople((prevPeople) =>
      prevPeople.map((person, i) => ({
        ...person,
        isOpen: i === index ? !person.isOpen : person.isOpen,
      }))
    );
  };

  const handleInputChange = (index, field, value) => {
    setPeople((prevPeople) =>
      prevPeople.map((person, i) =>
        i === index ? { ...person, [field]: value } : person
      )
    );
  };

  return (
    <div>
      <AdminNav />
      <div className="text-lg md:text-3xl text-center m-4 font-semibold text-gray-700">
        Rewards
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#212121"
            secondaryColor="#212121"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex flex-col m-3 space-y-3">
          {people.map((person, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  {index + 1}. {person.name}
                </div>
                <div className="font-semibold ml-4 md:ml-0">
                  {person.badge.name}
                </div>
                <div className="ml-4 md:ml-0">{person.email}</div>
                <button
                  className="ml-4 md:ml-0 p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => toggleDropdown(index)}
                >
                  {person.isOpen ? "Hide" : "Show"}
                </button>
              </div>
              {person.isOpen && (
                <div className="flex flex-col mt-2 space-y-2">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={person.subject}
                    className="p-2 border border-gray-300 rounded-md md:w-3/4 ml-4 md:ml-0"
                    onChange={(e) =>
                      handleInputChange(index, "subject", e.target.value)
                    }
                  />
                  <textarea
                    placeholder="Body of the mail"
                    className="p-2 border border-gray-300 rounded-md md:w-3/4 ml-4 md:ml-0"
                    value={person.body}
                    rows="4"
                    onChange={(e) =>
                      handleInputChange(index, "body", e.target.value)
                    }
                  ></textarea>
                  <button
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 md:w-24 ml-4 md:ml-0"
                    onClick={() => handleSendEmail(person)}
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rewards;
