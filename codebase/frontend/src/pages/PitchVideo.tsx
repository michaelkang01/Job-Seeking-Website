import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "tailwindcss/tailwind.css";
import { useAuth } from "../context/AuthContext";

const PitchVideo = () => {
  const auth = useAuth();
  const authToken = auth.getAuthData().authToken;
  const authData = auth.getAuthData().authData;
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [videoUrl, setVideoUrl] = React.useState("");
  const [uploadMessage, setUploadMessage] = React.useState("");
  const [uploadError, setUploadError] = React.useState(false);

  console.log(authData);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setUploadError(false);
    if (acceptedFiles.length > 1) {
      setUploadMessage("Please choose one video to upload.");
      setUploadError(true);
    } else {
      setUploadMessage("Your video is being uploaded...");
      setUploadError(false);
      const formData = new FormData();
      formData.append("pitch", acceptedFiles[0]);
      fetch(`${process.env.REACT_APP_API_URL}/api/pitch/store`, {
        method: "POST",
        headers: {
          "Authorization": authToken,
        },
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            setUploadMessage("Video uploaded successfully.");
            setUploadError(false);
            setVideoUrl("");
            setVideoUrl(res.videoUrl);
          } else {
            setUploadMessage("Error uploading video: " + res.error);
            setUploadError(true);
          }
        });
    }
  }, [authToken]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (authData && authToken.length > 0 && loading) {
      fetch(`${process.env.REACT_APP_API_URL}/api/pitch/get`, {
        method: "GET",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setVideoUrl(res.videoUrl);
        })
        .catch((err) => {
          console.log(err);
          setError("Error fetching pitch video");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  if (!authData || loading) {
    // Loading
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8 pt-28 h-screen">
      <div className="flex justify-center">
        <div className="w-full max-w-md mt-8">
          <div className="bg-white shadow-md rounded px-8 pt-4 pb-4 mb-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-center pb-4">
                Pitch Video Demo
              </h1>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : !error ? (
                <div className="text-center">
                  <video
                    className="w-full"
                    muted
                    autoPlay={true}
                    controls={true}
                    src={videoUrl}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-red-500 text-center">{error}</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-4 pb-4 mb-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-center pb-4">Upload</h1>
              <div
                className="text-center bg-gray-100 py-8 px-4"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag your video here or select one to upload</p>
                )}
                {uploadMessage && (
                  <p
                    className={`font-bold text-center p-2 mt-4 mx-4 rounded-md ${
                      uploadError ? "bg-red-400" : "bg-blue-200"
                    }`}
                  >
                    {uploadMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchVideo;
