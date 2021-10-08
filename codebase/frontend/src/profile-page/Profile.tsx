import { useState } from "react";
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

import Modal from "react-modal";

const Profile = () => {
  const [show_editing_modal, set_show_editing_modal] = useState(false);
  const [name, set_name] = useState("Bob the Builder");
  const [number, set_number] = useState("1234567890");
  const [email, set_email] = useState("testuser@email.com");
  const [twitter, set_twitter] = useState("tweettweet");
  const [facebook, set_facebook] = useState("noprivacyallowed");

  const update_profile = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const number = event.target.number.value;
    const email = event.target.email.value;
    const twitter = event.target.twitter.value;
    const facebook = event.target.twitter.value;
    set_name(name);
    set_email(email);
    set_number(number);
    set_twitter("@" + twitter);
    set_facebook("@" + facebook);
    set_show_editing_modal(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "50vw",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const modal = (
    <Modal
      isOpen={show_editing_modal}
      onRequestClose={() => set_show_editing_modal(false)}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <form onSubmit={update_profile}>
        <label htmlFor="name" className="inline m-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Profile Name"
          defaultValue={name}
          required
        />
        <br />
        <br />
        <FaPhoneAlt className="inline m-2" />
        <input type="text" name="number" placeholder="Phone Number" />
        <br />
        <FaRegEnvelope className="inline m-2" />
        <input type="text" name="email" placeholder="Email" />
        <br />
        <FaTwitter className="inline m-2" />
        <input type="text" name="twitter" placeholder="Twitter Username" />
        <br />
        <FaFacebookF className="inline m-2" />
        <input type="text" name="facebook" placeholder="Facebook Username" />
        <br />
        <input type="submit" value="Enter" className="bg-gray-300 px-4 mt-4" />
      </form>
    </Modal>
  );
  return (
    <div className="relative rounded-3xl mb-16 grid justify-items-center shadow-xl pb-8">
      {modal}
      <div className="rounded-t-3xl bg-green-600 w-full h-40"></div>
      <div className="absolute top-24 rounded-full bg-white w-32 h-32"></div>
      <FaUserCircle className="absolute p-2 top-24 rounded-full bg-white w-32 h-32" />
      <div className="grid justify-items-center mt-16">
        <div className="mb-8">
          <FaRegBookmark className="inline mx-2" />
          <FaSearch className="inline mx-2" />
          <FaCog
            className="inline mx-2 cursor-pointer"
            onClick={() => {
              set_show_editing_modal(true);
            }}
          />
        </div>
        <p className="text-3xl">{name}</p>
        <p className="mt-8 mb-4 text-xl">Contact Information</p>
        <div>
          <p>
            <FaPhoneAlt className="inline mr-4" />
            {number}
          </p>
          <p>
            <FaRegEnvelope className="inline mr-4" />
            {email}
          </p>
          <p>
            <FaTwitter className="inline mr-4" />
            {twitter}
          </p>
          <p>
            <FaFacebookF className="inline mr-4" />
            {facebook}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
