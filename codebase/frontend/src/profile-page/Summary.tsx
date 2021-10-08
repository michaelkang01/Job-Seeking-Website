import React, { useState } from "react";
import Section from "./Section";
import TextareaAutosize from "react-textarea-autosize";
import {isMobile} from 'react-device-detect';

const Summary = () => {
  const [display_edit_button, set_display_edit_button] = useState(false);
  const [is_editing, set_is_editing] = useState(false);

  const edit_summary = (event) => {
    event.preventDefault();
    console.log(event.target.summary.value);
    set_is_editing(false);
  };

  const summary = (
    <form className="grid justify-items-center py-4" onSubmit={edit_summary}>
      <TextareaAutosize
        className={`w-full px-4 resize-none h-full ${
          is_editing ? "" : "outline-none"
        }`}
        name="summary"
        readOnly={!is_editing}
        minRows={3}
      >Tell us about yourself!</TextareaAutosize>
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
      {display_edit_button || isMobile && (
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
