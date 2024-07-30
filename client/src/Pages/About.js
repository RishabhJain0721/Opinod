import React from "react";

const About = () => {
  const handle = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }
    console.log(file);
    const data = new FormData();
    data.append("file", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=bbaefed2c7f25d8a8276902c2cd6fac5",
        {
          method: "POST",
          body: data,
        }
      );
      const json = await response.json();
      console.log(json);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" id="i" onChange={handle} />
    </div>
  );
};

export default About;
