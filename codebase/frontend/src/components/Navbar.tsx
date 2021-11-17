import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { useAuth } from "../context/AuthContext";

/* To add: navbar props to allow better link input */
const Navbar = () => {
  const [mobileNavShown, setMobileNavShown] = useState(false);
  const auth = useAuth();

  const navBarToggle = () => {
    setMobileNavShown(!mobileNavShown);
  };

  const signedIn = auth.getAuthData().authToken.length > 0;

  return (
    <nav className="flex items-center justify-between flex-wrap bg-orange-peel p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        <span className="font-semibold text-xl tracking-tight">EZApply</span>
      </div>
      <div className="flex md:hidden">
        <button id="hamburger" onClick={navBarToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${mobileNavShown ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <Link
          to="/"
          className="font-bold block mt-4 lg:inline-block lg:mt-0 text-mellow-apricot hover:text-white mr-4"
        >
          Home
        </Link>
        {signedIn && (
          <>
            <Link
              to="/messages"
              className="font-bold block mt-4 lg:inline-block lg:mt-0 text-mellow-apricot hover:text-white mr-4"
            >
              Messaging
            </Link>
          </>
        )}
        {signedIn && (
          <Link
            to="/search"
            className="font-bold block mt-4 lg:inline-block lg:mt-0 text-mellow-apricot hover:text-white mr-4"
          >
            Job Search
          </Link>
        )}
        {signedIn && (
          <Link
            to="/applied"
            className="font-bold block mt-4 lg:inline-block lg:mt-0 text-mellow-apricot hover:text-white mr-4"
          >
            Applied
          </Link>
        )}
        {/**Will eventually change to signedIn and isRecruiter */}
        {signedIn && (
          <Link
            to="/searchprofiles"
            className="font-bold block mt-4 lg:inline-block lg:mt-0 text-mellow-apricot hover:text-white mr-4"
          >
            Search Candidates
          </Link>
        )}
        {!signedIn && (
          <Link
            to="/signup"
            className={`${mobileNavShown ? "block" : "hidden"
              } font-bold inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-mellow-apricot hover:bg-white mt-4 lg:mt-0`}
          >
            Create Account
          </Link>
        )}
      </div>
      <div>
        {(!signedIn && (
          <Link
            to="/signin"
            className="font-bold inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-mellow-apricot hover:bg-white mt-4 lg:mt-0"
          >
            Sign in
          </Link>
        )) || (
            <button
              onClick={auth.signOut}
              className="font-bold inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-mellow-apricot hover:bg-white mt-4 lg:mt-0"
            >
              Sign out
            </button>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
