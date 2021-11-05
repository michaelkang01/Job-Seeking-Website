import React from "react";
import "tailwindcss/tailwind.css";
import TextareaAutosize from "react-textarea-autosize";
import JobseekerProfile from "../types/JobseekerProfile";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Job from "../types/WorkExperience";

interface jobseeker {
  seeker: JobseekerProfile;
}

const Seeker = (props: jobseeker) => {
  return (
    <div>
      <div className=" p-8 text-gray-900 leading-normal bg-white border rounded">
        <img
          className="object-scale-down h-9 place-items-start"
          alt="Profile Pic Here"
          src={props?.seeker.profile_picture}
        ></img>
        <span className="text-2xl text-left font-bold">
          {props?.seeker.firstName + " " + props?.seeker.lastName}
        </span>
        <div className="text-xl">{props?.seeker.email}
          <a href={"mailto:" + props?.seeker.email}>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
              <svg width="20" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </button>
          </a></div>
        <section>{props?.seeker.address}</section>
        <section className=" font-extralight">
          <span className="text-xl text-left font-bold">
            Summary
          </span>
          <div className="grid justify-items-center py-4">
            <TextareaAutosize
              className={`w-full px-4 resize-none h-full`}
              name="summary"
              readOnly={true}
              minRows={3}
              defaultValue={props?.seeker.summary}
            />
          </div>
          <span className="text-xl text-left font-bold">
            Skills
          </span>
          <div className="flex flex-row w-full flex-wrap py-4">
            {props?.seeker.skills.map((skill) => (
              <div
                className="flex items-center bg-gray-300 mx-4 mb-4 p-2"
                key={skill}
              >
                <p className="my-0 mx-2">{skill}</p>
              </div>
            ))}</div>
          <span className="text-xl text-left font-bold">
            Work Experiences
          </span>
          <div className="flex flex-row w-full flex-wrap py-4 overflow-auto">
            {props?.seeker.workExperience.map((work_experience: Job, i: number) => (
              <div
                className="relative flex items-center mx-4 mb-4 p-2">
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
              </div>
            ))}
          </div>
        </section>
      </div>
    </div >
  );
};

export default Seeker;
