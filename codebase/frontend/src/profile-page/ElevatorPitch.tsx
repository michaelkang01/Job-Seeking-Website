import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import Section from "./Section";

/**
 * Elevtator pitch section of profile page.
 * 
 * @returns JSX.Element content to be displayed
 */
const ElevatorPitch = () => {
  /**
   * Used to display the modal
   */
  const [isOpen, setOpen] = useState(false);

  const elevator_pitch = (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="dQw4w9WgXcQ"
        onClose={() => setOpen(false)}
      />
      <div
        className="w-full bg-black h-80 text-white cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Click Here!
      </div>
    </>
  );
  return (
    <Section
      name="Elevator Pitch"
      content={elevator_pitch}
      centerheader={true}
    />
  );
};

export default ElevatorPitch;
