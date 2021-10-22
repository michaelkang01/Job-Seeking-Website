import React, { useState } from "react";
import Section from "./Section";
import { isMobile } from "react-device-detect";

/**
 * Skills section in profile page
 *
 * @returns JSX.Element content to be displayed
 */
const Skills = () => {
  /**
   * List of user skills
   */
  const [skills_list, set_skill_list] = useState([]);

  /**
   * Display the insert input form
   */
  const [display_insert, set_display_insert] = useState(false);

  /**
   * Display the edit button in which user can click to display the form to add a new skill
   */
  const [display_edit_button, set_display_edit_button] = useState(false);

  /**
   * Adds a new distinct skill based on insert skill form
   *
   * @param event Form input passed in by the insert skill form
   */
  const add_skill = (event) => {
    event.preventDefault();
    const new_skill = event.target.skill.value;
    if (skills_list.findIndex((skill) => skill === new_skill) === -1) {
      const new_list = skills_list.concat(new_skill);
      set_skill_list(new_list);
    }
    event.target.reset();
  };

  /**
   * Removes a skill from the user profile
   *
   * @param remove_skill Skill from skills_list to remove
   */
  const delete_skill = (remove_skill) => {
    const new_list = skills_list.filter((skill) => skill !== remove_skill);
    set_skill_list(new_list);
  };

  const skills = (
    <div className="flex flex-row w-full flex-wrap py-4">
      {skills_list.map((skill) => (
        <div
          className="flex items-center bg-gray-300 mx-4 mb-4 p-2"
          key={skill}
        >
          <button
            className="hover:text-gray-500"
            onClick={() => delete_skill(skill)}
          >
            &#10005;
          </button>
          <p className="my-0 mx-2">{skill}</p>
        </div>
      ))}
      {display_insert && (
        <div className="flex items-center bg-gray-300 mx-4 p-2">
          <form onSubmit={add_skill}>
            <input
              className="bg-gray-200"
              type="text"
              name="skill"
              placeholder="Enter in a new skill"
            />
            <input type="submit" value="Enter" className="bg-gray-300 px-2" />
          </form>
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
      <Section name="Skills" content={skills} />
    </div>
  );
};

export default Skills;
