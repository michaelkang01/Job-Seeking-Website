import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaRegEnvelope,
  FaTwitter,
  FaFacebookF,
  FaUserCircle,
  FaCog,
  FaRegBookmark,
  FaSearch,
} from "react-icons/fa";

import ModalVideo from "react-modal-video";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import Section from "./section";

import Skills from "./skills";
import WorkExperiences from "./work-experiences";

const ProfilePage = () => {
  const [isOpen, setOpen] = useState(false);
  
  const summary = (
    <p className="mx-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum iure
      blanditiis officia vero ipsa magnam ipsum sit quidem veritatis, quam
      quaerat laboriosam corporis harum recusandae odio error reprehenderit
      autem?
    </p>
  );

  return (
    <div className="w-11/12 m-auto">
      <div className="float-left w-1/4 p-4">
        <div className="relative rounded-3xl mb-16 grid justify-items-center shadow-xl pb-8">
          <div className="rounded-t-3xl bg-green-600 w-full h-40"></div>
          <div className="absolute top-24 rounded-full bg-white w-32 h-32"></div>
          <FaUserCircle className="absolute p-2 top-24 rounded-full bg-white w-32 h-32" />
          <div className="grid justify-items-center mt-16">
            <div className="mb-8">
              <FaRegBookmark className="inline mx-2" />
              <FaSearch className="inline mx-2" />
              <FaCog className="inline mx-2" />
            </div>
            <p className="text-3xl">Bob the Builder</p>
            <p className="mt-8 mb-4 text-xl">Contact Information</p>
            <div>
              <p>
                <FaPhoneAlt className="inline mr-4" />
                (1) 123-345-4678
              </p>
              <p>
                <FaRegEnvelope className="inline mr-4" />
                123@456.com
              </p>
              <p>
                <FaTwitter className="inline mr-4" />
                @tweettweet
              </p>
              <p>
                <FaFacebookF className="inline mr-4" />
                @noprivacyallowed
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl mb-16 grid justify-items-center shadow-xl">
          <div className="flex relative rounded-t-3xl bg-green-600 w-full h-20 justify-center items-center">
            <p className="text-white font-semibold text-2xl">
              Elevator Pitch Video
            </p>
          </div>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId="dQw4w9WgXcQ"
            onClose={() => setOpen(false)}
          />
          <div
            className="w-full h-80 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <iframe
              title="Profile Pitch"
              className="w-full h-80 pointer-events-none"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              onClick={() => setOpen(true)}
            ></iframe>
          </div>
        </div>
      </div>
      <div className="float-left w-3/4 p-4">
        <Section name="Summary" content={summary} />
        <Skills />
        <WorkExperiences/>
      </div>
    </div>
  );
};

export default ProfilePage;
