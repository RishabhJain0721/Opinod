import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faLinkSlash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const UploadImage = ({ ongettingurl, cancel }) => {
  //   const api_key = "336342327162494";

  const [isUploaded, setIsUploaded] = useState(false);

  const cloud_name = "dujldfdhe";

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: cloud_name,
        uploadPreset: "jxls3wlm",
        sources: ["local"],
        multiple: false,
      },
      function (error, result) {
        if (result.event === "success") {
          ongettingurl(result.info.secure_url);
          setIsUploaded(true);
          toast.success("Image Attached");
        }
      }
    );
    // console.log("Cloudinary", cloudinaryRef.current);
  }, []);

  return (
    <div>
      {!isUploaded ? (
        <button onClick={() => widgetRef.current.open()}>
          <FontAwesomeIcon icon={faPaperclip} />
        </button>
      ) : (
        <FontAwesomeIcon icon={faLinkSlash} onClick={() => cancel()} />
      )}
    </div>
  );
};

export default UploadImage;
