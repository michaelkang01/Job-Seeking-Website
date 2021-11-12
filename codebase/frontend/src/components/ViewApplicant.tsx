import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

type Applicant = {
  _id: string;
  city: string;
  education: [any];
  email: string;
  extra_fields: [any];
  firstName: string;
  lastName: string;
  listing_id: number;
  province: string;
  user_id: string;
  zip: string;
  additionalData: {
    profile: {
      user: string;
      profile_picture: string;
      socials: [any];
      resumeUrl: string;
      summary: string;
      skills: [string];
      workExperience: [
        {
          location: string;
        }
      ];
      education: [any];
    };
    pitchData: {
      userId: string;
      videoUrl: string;
      videoName: string;
      processingStatus: string;
      transcription: string;
    };
  };
};

const ViewApplicant = ({ match }: any) => {
  const authToken = useAuth().getAuthData().authToken;
  const [applicant, setApplicant] = useState({} as Applicant);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/recruiter/application/?applicationId=${
          match && match.params && match.params.id ? match.params.id : "none"
        }`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setApplicant(response.data.application);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [match, authToken]);

  // Display the applicant's information in cards (TailwindCSS 2.0)
  return (
    <div className="w-full">
      {error && !loading && <h3 className="text-red-500 text-lg text-center">{error}</h3>}
      {!error && applicant && !loading && (
        <div className="md:flex md:flex-row">
          <div className="w-full md:w-1/5 md:flex-shrink-0 pl-8 md:h-screen bg-gray-100 pt-28 pb-8 md:pb-0">
            <h1 className="text-2xl font-bold">Applicant Information</h1>
            <h2 className="text-xl text-gray-800 font-bold pt-4">
              {applicant.firstName} {applicant.lastName}
            </h2>
            <p className="text-gray-600 mt-2">
              <span className="font-bold">Email:</span> {applicant.email}
            </p>
            {/* Location */}
            <p className="text-gray-600 mt-2">
              <span className="font-bold">Location:</span> {applicant.city},{" "}
              {applicant.province} {applicant.zip}
            </p>
            {/* Pitch Video */}
            <p className="text-gray-600 mt-8 w-full pr-8">
              <span className="font-bold">Pitch Video:</span>{" "}
              {applicant && applicant.additionalData && applicant.additionalData.pitchData.videoUrl && (
                <video controls>
                  <source src={applicant.additionalData.pitchData.videoUrl} />
                </video>
              )}
            </p>
            {/* Transcription of pitch video */}
            <p className="text-gray-600 mt-8 w-full pr-8">
              <span className="font-bold">Transcription:</span>{" "}
              {applicant && applicant.additionalData && applicant.additionalData.pitchData &&
                (
                  <p className="" style={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "1rem",
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    lineBreak: "auto",
                    maxWidth: "100%",
                    overflowX: "auto",
                    maxHeight: "200px",
                  }}>{applicant.additionalData.pitchData.transcription && (JSON.parse(applicant.additionalData.pitchData.transcription).results.transcripts[0]
                    .transcript) || "Transcription is being processed"}</p>
                )}
            </p>
            {/* Show actions (accept/reject) */}
            <div className="mt-8 flex flex-row gap-2 pr-8">
                <button className="bg-green-500 hover:bg-green-700 w-full rounded-md text-white font-bold py-2 px-4 rounded">
                    Accept
                </button>
                <button className="bg-red-500 hover:bg-red-700 w-full rounded-md text-white font-bold py-2 px-4 rounded">
                    Reject
                </button>
            </div>
          </div>
          <div
            className="w-full md:flex-grow pt-4 md:pt-28 bg-gray-200 md:h-screen md:flex md:flex-col"
            style={{ minHeight: "300px" }}
          >
            <h3 className="text-2xl px-8 pb-4 font-bold">Resume</h3>
            {/* iFrame for resume */}

            {!loading && applicant.additionalData && applicant.additionalData.profile.resumeUrl && (
              <iframe
                src={applicant.additionalData.profile.resumeUrl}
                width="100%"
                height="100%"
                title="resume"
                style={{
                  minHeight: "600px",
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplicant;
