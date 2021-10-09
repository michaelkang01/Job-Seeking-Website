import ElevatorPitch from "./ElevatorPitch";
import Profile from "./Profile";
import Skills from "./Skills";
import Summary from "./Summary";
import WorkExperiences from "./WorkExperiences";

/**
 * THe profile page
 * 
 * @returns JSX.Element content to be displayed
 */
const ProfilePage = () => {
  return (
    <div className="w-11/12 m-auto">
      <div className="w-full float-left p-4 sm:w-1/4 ">
        <Profile />
        <ElevatorPitch />
      </div>
      <div className="w-full float-left p-4 sm:w-3/4">
        <Summary />
        <Skills />
        <WorkExperiences />
      </div>
    </div>
  );
};

export default ProfilePage;