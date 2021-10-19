import axios from "axios";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Job from "../types/WorkExperience";
import Section from "./Section";

/**
 * Work Experiences section in profile page
 *
 * @returns JSX.Element content to be displayed
 */
const WorkExperiences = (props) => {
  const initialize: Job[] = [];

  /**
   * Display the edit button in which user can click to display the form to update their work experiences
   */
  const [display_edit_button, set_display_edit_button] = useState(false);

  /**
   * List containing user's work experiences
   */
  const [work_experiences_list, set_work_experience_list] =
    useState(initialize);

  /**
   * Display the insert work experience form
   */
  const [display_insert, set_display_insert] = useState(false);

  /**
   * Display a button to remove a work experience at index i in work_experiences_list
   */
  const [display_remove_button, set_display_remove_button] = useState(-1);

  useEffect(() => {
    /**
     * Retrives the user work experienes from the database
     *
     * @returns Promise.
     */
    const get_work_experiences = async () => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}/api/jobseekerprofile`, {
          params: { email: props.email },
        })
        .then((res) => {
          let new_list: Job[] = [];
          for (const experience in res.data[0].workExperience) {
            const new_work_experience: Job = {
              position: res.data[0].workExperience[experience].position,
              company: res.data[0].workExperience[experience].company,
              time: res.data[0].workExperience[experience].time,
              location: res.data[0].workExperience[experience].location,
            };
            new_list.push(new_work_experience);
          }
          set_work_experience_list(new_list);
        });
    };
    get_work_experiences();
  }, [props.email]);

  /**
   * Adds a new work experience based on form input
   *
   * @param event Form input
   */
  const add_work_experience = async (event) => {
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
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/updateworkexperiences`, {
        email: props.email,
        workExperience: new_list,
      })
      .then(() => {
        set_work_experience_list(new_list);
        event.target.reset();
      });
  };

  /**
   * Removes a work experience
   *
   * @param remove_work_experience Work experience to remove
   */
  const delete_work_experience = (remove_work_experience) => {
    const new_list = work_experiences_list.filter(
      (work_experience) => work_experience !== remove_work_experience
    );
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/updateworkexperiences`, {
        email: props.email,
        workExperience: new_list,
      })
      .then(() => {
        set_work_experience_list(new_list);
      });
  };

  const work_experiences = (
    <div className="flex flex-row w-full flex-wrap py-4 overflow-auto">
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
          {(display_remove_button ===
            work_experiences_list.indexOf(work_experience) || isMobile) && (
            <button
              className="hover:text-gray-500 absolute top-4 left-0"
              onClick={() => delete_work_experience(work_experience)}
            >
              &#10005;
            </button>
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
              <input
                type="submit"
                value="Enter"
                className="bg-white px-4 mt-4"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <div
      className="relative"
      onMouseOver={() => set_display_edit_button(true)}
      onMouseLeave={() => set_display_edit_button(false)}
    >
      {(display_edit_button || isMobile) && (
        <button
          className="absolute top-0 z-10 right-0 text-xl text-gray-200 p-4 hover:text-white"
          onClick={() => set_display_insert(!display_insert)}
        >
          {display_insert ? "done" : "edit"}
        </button>
      )}
      <Section name="Work Experiences" content={work_experiences} />
    </div>
  );
};

export default WorkExperiences;
