import React, { useState } from "react";
import "tailwindcss/tailwind.css";
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
import CloseButton from "react-bootstrap/CloseButton";

import "bootstrap/dist/css/bootstrap.min.css";
import { createInputFiles } from "typescript";
const ProfilePage = () => {
  const [isOpen, setOpen] = useState(false);
  const [skillslist, setList] = React.useState(["Java", "Python", "C"]);

  const add_skill = (event) => {
    event.preventDefault();
    const new_skill = event.target.skill.value
    const new_list = skillslist.concat(new_skill)
    setList(new_list)
    event.target.reset()
  };
  const delete_skill = (remove_skill) => {
    const new_list = skillslist.filter((skill) => skill !== remove_skill);
    setList(new_list);
  };

  const summary = (
    <p className="mx-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum iure
      blanditiis officia vero ipsa magnam ipsum sit quidem veritatis, quam
      quaerat laboriosam corporis harum recusandae odio error reprehenderit
      autem?
    </p>
  );

  const displayskills = (
    <div className="flex flex-row w-full flex-wrap">
      {skillslist.map((skill) => (
        <div className="flex items-center bg-gray-300 mx-4 mb-4 p-2" key={skill}>
          <CloseButton onClick={() => delete_skill(skill)} />
          <p className="my-0 mx-2">{skill}</p>
        </div>
      ))}
      <div className="flex items-center bg-gray-300 mx-4 p-2">
        <CloseButton />
        <form onSubmit={add_skill}>
          <input type="text" name="skill" placeholder="Enter in a new skill"/>
          <input type="submit" value="Enter" />
        </form>
      </div>
    </div>
  );
  const work = (
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
        <Section name="Skills" content={displayskills} />
        <Section name="Work Experiences" content={work} />
      </div>
    </div>
  );
};

export default ProfilePage;
