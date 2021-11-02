import React from "react";
import "tailwindcss/tailwind.css";
import { useAuth } from "../context/AuthContext";
import JobseekerProfile from "../types/JobseekerProfile";

const SearchProfiles = () => {
  const auth = useAuth();
  const authToken = auth.getAuthData().authToken;
  const authData = auth.getAuthData().authData;
  
  return (
    <div className="px-8 pt-28 h-screen">
    </div>
  );
};

export default SearchProfiles;