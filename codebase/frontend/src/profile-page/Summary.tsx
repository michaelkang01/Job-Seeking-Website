import React, { useEffect, useState } from "react";
import Section from "./Section";
import TextareaAutosize from "react-textarea-autosize";
import { isMobile } from "react-device-detect";
import axios from "axios";

/**
 * Summary section of profile page
 *
 * @returns JSX.Element content to be displayed
 */
const Summary = (props) => {
  /**
   * Holds the user summary.
   */
  const [user_summary, set_summary] = useState("");

  /**
   * Display the edit button in which user can click to display the form to update their summary
   */
  const [display_edit_button, set_display_edit_button] = useState(false);

  /**
   * Editing is enabled on summary
   */
  const [is_editing, set_is_editing] = useState(false);

  useEffect(() => {
    /**
     * Retrives the user summary from the database
     *
     * @returns Promise.
     */
    const get_profile_summary = async () => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}/api/jobseekerprofile`, {
          params: { email: props.email },
        })
        .then((res) => set_summary(res.data[0].summary));
    };
    get_profile_summary();
  }, [props.email]);

  /**
   * Updates users summary based on what the textbox has.
   *
   * @param event contents of the textbox
   */
  const update_summary = async (event) => {
    event.preventDefault();
    return axios
      .request({
        url: `${process.env.REACT_APP_API_URL}/api/jobseeker/updateprofilesummary`,
        method: "POST",
        headers: { Authorization: props.authToken },
        data: { summary: event.target.summary.value },
      })
      .then(() => set_is_editing(false));
  };

  const summary = (
    <form className="grid justify-items-center py-4" onSubmit={update_summary}>
      <TextareaAutosize
        className={`w-full px-4 resize-none h-full ${
          is_editing ? "" : "outline-none"
        }`}
        name="summary"
        readOnly={!is_editing}
        minRows={3}
        defaultValue={user_summary}
      />
      {is_editing && (
        <input
          type="submit"
          value="Update"
          className="bg-gray-300 px-4 py-2 mt-4"
        />
      )}
    </form>
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
          onClick={() => set_is_editing(true)}
        >
          edit
        </button>
      )}
      <Section name="Summary" content={summary} />
    </div>
  );
};

export default Summary;
