import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaRegEnvelope,
  FaGithub,
  FaFacebookF,
  FaUserCircle,
  FaCog,
  FaMapMarkerAlt,
  FaFileAlt,
} from "react-icons/fa";

import Modal from "react-modal";
import ContactInformation from "../types/ContactInformation";
import Section from "./Section";

/**
 * Basic profile and contact information on profile page
 *
 * @returns JSX.Element content to be displayed
 */
const Profile = (props) => {
  /**
   * Shows the editing modal for profile and contact information changes
   */
  const [show_editing_modal, set_show_editing_modal] = useState(false);

  /**
   * Functions to update the various contact information iterms
   */

  const [contact, set_contact] = useState<ContactInformation>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    github: "",
    facebook: "",
    resumeURL: "",
  });

  useEffect(() => {
    /**
     * Gets user profile from database
     * 
     * @returns Promise
     */
    const get_profile = async () => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}/api/jobseekerprofile`, {
          params: { email: props.email },
        })
        .then((res) => {
          set_contact({
            firstName: res.data[0].firstName,
            lastName: res.data[0].lastName,
            email: res.data[0].email,
            address: res.data[0].address,
            github: res.data[0].githubID,
            facebook: res.data[0].facebookID,
            resumeURL: res.data[0].resumeUrl,
          });
        });
    };
    get_profile();
  }, [props.email]);

  /**
   * Updates the users contact information based on the input provided by the editing modal
   *
   * @param event Form input from the editing modal
   */
  const update_profile = async (event) => {
    event.preventDefault();
    const profile: ContactInformation = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      address: event.target.address.value,
      github: event.target.github.value,
      facebook: event.target.facebook.value,
      resumeURL: event.target.resumeURL.value,
    };
    return axios
      .post(`${process.env.REACT_APP_API_URL}/api/updatecontactinformation`, {
        email: props.email,
        profile,
      })
      .then(() => {
        set_contact(profile);
        event.target.reset();
        set_show_editing_modal(false);
      });
  };

  /**
   * CSS for the editing modal
   */
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "50vw",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const labels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    address: "Address",
    github: "Github Account (optional)",
    facebook: "Facebook Account (optional",
    resumeURL: "Resume",
  };

  const modal = (
    <Modal
      isOpen={show_editing_modal}
      onRequestClose={() => set_show_editing_modal(false)}
      style={customStyles}
    >
      <form onSubmit={update_profile}>
        <div className="flex gap-8">
          <div className="flex flex-col">
            {Object.keys(contact).map((key, index) => (
              <label htmlFor={key} className="mb-4" key={index}>
                {labels[key]}
              </label>
            ))}
          </div>
          <div className="flex flex-col">
            {Object.keys(contact).map((key, index) => (
              <input
                key={index}
                type="text"
                name={key}
                defaultValue={contact[key]}
                className="ml-4 w-96 mb-4"
              />
            ))}
          </div>
        </div>
        <input
          type="submit"
          value="Enter"
          className="bg-gray-300 px-4 mt-4 w-20"
        />
      </form>
    </Modal>
  );

  const profile = (
    <div>
      {modal}
      <div className="grid justify-items-center mt-16">
        <div className="absolute top-24 rounded-full bg-white w-32 h-32"></div>
        <FaUserCircle className="absolute p-2 top-24 rounded-full bg-white w-32 h-32" />
        <div className="mb-4">
          <FaCog
            className="inline mx-2 cursor-pointer"
            onClick={() => set_show_editing_modal(true)}
          />
        </div>
        <p className="text-3xl mb-2">
          {contact.firstName + " " + contact.lastName}
        </p>
        <div>
          <p>
            <FaRegEnvelope className="inline mr-4" />
            {contact.email}
          </p>
          <p>
            <FaMapMarkerAlt className="inline mr-4" />
            {contact.address}
          </p>
          <a
            href={contact.resumeURL}
            target="_blank"
            title="Click Here to View My Resume"
          >
            <FaFileAlt className="inline mr-4" /> Resume
          </a>
        </div>
        <hr className="w-1/3 mt-4"/> 
        <div className="mt-2 mb-2">
          <a href={contact.facebook} target="_blank" title="Facebook Profile">
            <FaFacebookF className="inline mx-2 text-lg" />
          </a>
          <a href={contact.github} target="_blank" title="Github Profile">
            <FaGithub className="inline mx-2 text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
  return <Section name="" content={profile} headerHeight="h-40" />;
};

export default Profile;
