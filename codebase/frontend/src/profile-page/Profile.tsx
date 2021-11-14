import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaRegEnvelope,
  FaUserCircle,
  FaCog,
  FaMapMarkerAlt,
  FaFileAlt,
  FaLink
} from "react-icons/fa";

import Modal from "react-modal";
import Section from "./Section";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
  const [firstname, set_firstname] = useState("");
  const [lastname, set_lastname] = useState("");
  const [email, set_email] = useState("");
  const [address, set_address] = useState("");
  const [resume, set_resume] = useState("");
  const [socials, set_socials] = useState<string[]>([]);

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
          const profile = res.data[0];
          set_firstname(profile.firstName);
          set_lastname(profile.lastName);
          set_email(profile.email);
          set_address(profile.address);
          set_resume(profile.resumeUrl);
          set_socials(profile.socials);
        });
    };
    get_profile();
  }, [props.email]);

  /**
   * Updates the users contact information based on the input provided by the editing modal
   *
   * @param event Form input from the editing modal
   */
  const update_general_profile = async (event) => {
    event.preventDefault();
    let resumeURL = resume;
    if (event.target.resume.files.length === 1) {
      const formdata = new FormData();
      formdata.append("resume", event.target.resume.files[0]);
      await axios
        .request({
          url: `${process.env.REACT_APP_API_URL}/api/uploadresume`,
          method: "POST",
          headers: {
            Authorization: props.authToken,
          },
          data: formdata,
        })
        .then((res) => (resumeURL = res.data.data));
    }
    const profile = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      address: event.target.address.value,
      resumeURL: resumeURL,
    };
    return axios
      .request({
        url: `${process.env.REACT_APP_API_URL}/api/updategeneralcontact`,
        method: "POST",
        headers: { Authorization: props.authToken },
        data: { profile },
      })
      .then(() => {
        set_firstname(profile.firstName);
        set_lastname(profile.lastName);
        set_email(profile.email);
        set_address(profile.address);
        set_resume(profile.resumeURL);
        event.target.reset();
        set_show_editing_modal(false);
      });
  };

  /**
   * Updates user social urls
   *
   * @param {String[]} socials List of user socials
   * @returns Promise
   */
  const update_socials = async (socials) => {
    return axios
      .request({
        url: `${process.env.REACT_APP_API_URL}/api/updatesocials`,
        method: "POST",
        headers: { Authorization: props.authToken },
        data: { socials: socials },
      })
      .then(() => set_socials(socials));
  };

  /**
   * Adds a new social account
   *
   * @param event Form input passed in by the insert social form
   */
  const add_social = (event) => {
    event.preventDefault();
    const new_social = event.target.social.value;
    if (socials.findIndex((social) => social === new_social) === -1) {
      update_socials(socials.concat(new_social));
      event.target.reset();
    }
  };

  /**
   * Removes a social
   *
   * @param social Social to remove
   */
  const delete_social = (remove_social) =>
    update_socials(socials.filter((social) => social !== remove_social));

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

  const textinput = (name, defaultValue) => (
    <input
      type="text"
      name={name}
      defaultValue={defaultValue}
      className="mx-4 mb-4 flex-auto"
    />
  );

  const general_contact = (
    <form onSubmit={update_general_profile}>
      <div className="flex gap-8">
        <div className="w-full flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-4 flex-1">
              First Name {textinput("firstName", firstname)}
            </label>
            <label htmlFor="lastName" className="mb-4 flex-1">
              Last Name {textinput("lastName", lastname)}
            </label>
            <label htmlFor="email" className="mb-4 flex-1">
              Email {textinput("email", email)}
            </label>
            <label htmlFor="address" className="mb-4 flex-1">
              Address {textinput("address", address)}
            </label>
            <label htmlFor="resume" className="flex-1">
              Resume
              <input type="file" name="resume" className="mx-4 flex-1" />
            </label>
          </div>
        </div>
      </div>
      <input
        type="submit"
        value="Enter"
        className="bg-gray-300 px-4 mt-4 w-20"
      />
    </form>
  );

  const social_links = (
    <div className="flex flex-row w-full flex-wrap py-4">
      {socials.map((social) => (
        <div
          className="flex items-center bg-gray-300 mx-4 mb-4 p-2"
          key={social}
        >
          <button
            className="hover:text-gray-500"
            onClick={() => delete_social(social)}
          >
            &#10005;
          </button>
          <p className="my-0 mx-2">{social}</p>
        </div>
      ))}

      <div className="flex items-center bg-gray-300 mx-4 p-2">
        <form onSubmit={add_social}>
          <input
            className="bg-gray-200"
            type="text"
            name="social"
            placeholder="Social URL"
          />
          <input type="submit" value="Enter" className="bg-gray-300 px-2" />
        </form>
      </div>
    </div>
  );

  const modal = (
    <Modal
      isOpen={show_editing_modal}
      onRequestClose={() => set_show_editing_modal(false)}
      style={customStyles}
    >
      <Tabs>
        <TabList>
          <Tab>General Contact</Tab>
          <Tab>Socials</Tab>
        </TabList>
        <TabPanel>{general_contact}</TabPanel>
        <TabPanel>{social_links}</TabPanel>
      </Tabs>
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
        <p className="text-3xl mb-2">{firstname + " " + lastname}</p>
        <div>
          <p>
            <FaRegEnvelope className="inline mr-4" />
            {email}
          </p>
          <p>
            <FaMapMarkerAlt className="inline mr-4" />
            {address}
          </p>
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            title="Click Here to View My Resume"
          >
            <FaFileAlt className="inline mr-4" /> Resume
          </a>
        </div>
        <hr className="w-1/3 mt-4" />
        <div className="mt-2 mb-2">
          {socials.map((social) => (
            <p key={social}>
              <FaLink className="inline mr-4" />
              <a href={social} target="_blank" rel="noreferrer">
                {social}
              </a>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
  return <Section name="" content={profile} headerHeight="h-40" />;
};

export default Profile;
