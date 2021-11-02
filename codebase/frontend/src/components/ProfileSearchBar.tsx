import axios from "axios";
import "tailwindcss/tailwind.css";


const ProfileSearchBar = () => {
  return (
    <div className="p-8 flex">
      <form
        className="bg-white flex items-center rounded-full w-full shadow-xl"
        method="get"
      >
        <input
          className="rounded-l-auto w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="ser-skills"
          type="text"
          placeholder="Skills (Python, PowerBI, Excel, etc.)"
          name="skills"
        ></input>
        <div className="p-4">
          <button
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
            type="submit"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSearchBar;
