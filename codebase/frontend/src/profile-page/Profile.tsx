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
  
const Profile = () => {
    return <div className="relative rounded-3xl mb-16 grid justify-items-center shadow-xl pb-8">
    <div className="rounded-t-3xl bg-green-600 w-full h-40"></div>
    <div className="absolute top-24 rounded-full bg-white w-32 h-32"></div>
    <FaUserCircle className="absolute p-2 top-24 rounded-full bg-white w-32 h-32" />
    <div className="grid justify-items-center mt-16">
      <div className="mb-8">
        <FaRegBookmark className="inline mx-2" />
        <FaSearch className="inline mx-2" />
        <FaCog className="inline mx-2" />
      </div>
      <p className="text-3xl">Bob the Builder</p>
      <p className="mt-8 mb-4 text-xl">Contact Information</p>
      <div>
        <p>
          <FaPhoneAlt className="inline mr-4" />
          (1) 123-345-4678
        </p>
        <p>
          <FaRegEnvelope className="inline mr-4" />
          123@456.com
        </p>
        <p>
          <FaTwitter className="inline mr-4" />
          @tweettweet
        </p>
        <p>
          <FaFacebookF className="inline mr-4" />
          @noprivacyallowed
        </p>
      </div>
    </div>
  </div>
}

export default Profile;