import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import SettingsModal from "./settings/Settings";
import Skills from "./Skills";
import Summary from "./Summary";
import WorkExperiences from "./WorkExperiences";
/**
 * THe profile page
 *
 * @returns JSX.Element content to be displayed
 */
const ProfilePage = (props) => {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    /**
     * Retrives the user summary from the database
     *
     * @returns Promise.
     */
    const getProfile = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/api/jobseekerprofile`, {
          params: { email: props.email },
        })
        .then((res) => setProfile(res.data[0]));
    };
    getProfile();
  }, [props.email, profile]);

  return (
    <div className="w-3/4 m-auto bg-gray-100">
      <div className="w-full float-left p-4 sm:w-1/3">
        <Profile profile={profile} authToken={props.authToken} />
        <div className="w-full flex flex-col items-center">
          <SettingsModal profile={profile} authToken={props.authToken} />
        </div>
      </div>
      <div className="w-full float-left p-4 sm:w-2/3">
        <Summary summary={profile["summary"]} authToken={props.authToken} />
        <Skills skills={profile["skills"]} authToken={props.authToken} />
        <WorkExperiences
          workExperiences={profile["workExperience"]}
          authToken={props.authToken}
        />
      </div>
    </div>)
};

export default ProfilePage;
