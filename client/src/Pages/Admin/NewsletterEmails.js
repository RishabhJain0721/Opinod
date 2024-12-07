import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/AdminNav";
import { getNewsletterEmails } from "../../APIs/UserDetailsApis";
import { MutatingDots } from "react-loader-spinner";

const NewsletterEmails = () => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmails = async () => {
    try {
      const emails = await getNewsletterEmails();
      setEmails(emails);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="text-lg md:text-3xl text-center m-4 font-semibold text-gray-700">
        Newsletter Subscribers
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
        <div className="">
          <table className="  border border-gray-300 w-7/12 mx-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email._id} className="text-gray-700">
                  <td className="px-4 py-2 border">{email.email}</td>
                  <td className="px-4 py-2 border">
                    {new Date(email.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterEmails;
