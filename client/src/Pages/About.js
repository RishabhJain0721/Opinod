import React from "react";
import UploadImage from "../Components/UploadImage";

const About = () => {
  const imageurl = (url) => {
    console.log(url);
  };

  return (
    <div className="mb-4">
      <UploadImage ongettingurl={imageurl} />
    </div>
  );
};

export default About;
