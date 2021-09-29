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

  return (
    <nav className="flex flex-wrap items-center justify-between p-5 bg-blue-200">
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
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          mobileNavShown ? "block" : "hidden"
        } md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none`}
      >
        <Link
          to="/"
          className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
        >
          Home
        </Link>
        {(!auth.authToken && (
          <Link
            to="/signin"
            className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >
            Sign in
          </Link>
        )) || (
          <button
            onClick={auth.signOut}
            className="cursor-pointer block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none"
          >
            Sign out
          </button>
        )}
      </div>
      {!auth.authToken && (
        <Link
          to="/signup"
          className={`${
            mobileNavShown ? "block" : "hidden"
          } md:flex w-full md:w-auto px-4 py-2 text-right bg-blue-900 hover:bg-blue-500 text-white md:rounded`}
        >
          Create Account
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
