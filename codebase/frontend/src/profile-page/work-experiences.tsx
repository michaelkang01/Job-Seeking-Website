import React, { useState } from "react";

import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Section from "./section";

type Job = {
  position: string;
  company: string;
  time: string;
  location: string;
};

const WorkExperiences = () => {
  const initialize: Job[] = [];

  const [work_experiences_list, set_work_experience_list] =
    useState(initialize);
  const [display_insert, set_display_insert] = useState(false);
  const [display_remove_button, set_display_remove_button] = useState(-1);

  const add_work_experience = (event) => {
    event.preventDefault();
    const position = event.target.position.value;
    const company = event.target.company.value;
    const time = event.target.time.value;
    const location = event.target.location.value;

    for (let i = 0; i < work_experiences_list.length; i++) {
      let work_experience = work_experiences_list[i];
      if (
        work_experience.position === position &&
        work_experience.company === company &&
        work_experience.time === time &&
        work_experience.location === location
      ) {
        event.target.reset();
        return;
      }
    }
    const new_work_experience: Job = {
      position: position,
      company: company,
      time: time,
      location: location,
    };
    const new_list = work_experiences_list.concat(new_work_experience);
    set_work_experience_list(new_list);
    event.target.reset();
  };

  const delete_work_experience = (remove_work_experience) => {
    const new_list = work_experiences_list.filter(
      (work_experience) => work_experience !== remove_work_experience
    );
    set_work_experience_list(new_list);
  };

  const work_experiences = (
    <div className="flex flex-row w-full flex-wrap">
      {work_experiences_list.map((work_experience: Job, i: number) => (
        <div
          className="relative flex items-center mx-4 mb-4 p-2"
          onMouseOver={() =>
            set_display_remove_button(
              work_experiences_list.indexOf(work_experience)
            )
          }
          onMouseLeave={() => set_display_remove_button(-1)}
          key={
            work_experience.position +
            work_experience.company +
            work_experience.time +
            i
          }
        >
          <div className="left rounded-full bg-gray-300 w-16 h-16"></div>
          <div className="left p-4">
            <p className="my-0">
              <FaBriefcase className="inline mx-2" />
              {work_experience.position}
            </p>
            <p className="my-0">
              <FaBuilding className="inline mx-2" />
              {work_experience.company}
            </p>
            <p className="my-0">
              <FaCalendarAlt className="inline mx-2" />
              {work_experience.time}
            </p>
            <p className="my-0">
              <FaMapMarkerAlt className="inline mx-2" />
              {work_experience.location}
            </p>
          </div>
          {display_remove_button ===
            work_experiences_list.indexOf(work_experience) && (
            <button
              className="hover:text-gray-500 absolute top-4 left-0"
              onClick={() => delete_work_experience(work_experience)}
            >&#10005;</button>
          )}
        </div>
      ))}
      {display_insert && (
        <div className="flex items-center mx-4 mb-4 p-2">
          <div className="left rounded-full bg-gray-300 w-16 h-16"></div>
          <div className="left p-4">
            <form onSubmit={add_work_experience}>
              <FaBriefcase className="inline mx-2" />
              <input
                type="text"
                name="position"
                placeholder="Job Title"
                required
              />
              <br />
              <FaBuilding className="inline mx-2" />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                required
              />
              <br />
              <FaCalendarAlt className="inline mx-2" />
              <input
                type="text"
                name="time"
                placeholder="Job Period"
                required
              />
              <br />
              <FaMapMarkerAlt className="inline mx-2" />
              <input
                type="text"
                name="location"
                placeholder="Location"
                required
              />
              <br />
              <input type="submit" value="Enter" className="bg-white px-4" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <div
      onMouseOver={() => set_display_insert(true)}
      onMouseLeave={() => set_display_insert(false)}
    >
      <Section name="Work Experiences" content={work_experiences} />
    </div>
  );
};

export default WorkExperiences;
