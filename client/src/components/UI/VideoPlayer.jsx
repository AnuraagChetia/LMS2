import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  });

  return (
    <video
      ref={videoRef}
      width="220"
      height="220"
      controls
      style={{ padding: "0" }}
    >
      <source
        src={`${import.meta.env.VITE_BACKEND_URL}/course/get-lecture`}
        type="video/mp4"
      ></source>
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
