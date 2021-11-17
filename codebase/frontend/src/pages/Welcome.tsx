import React from "react";
import "tailwindcss/tailwind.css";
import { useAuth } from "../context/AuthContext";
import ProfilePage from "../profile-page/ProfilePage";

const Welcome = () => {
  const auth = useAuth();
  const authToken = auth.getAuthData().authToken;
  const authData = auth.getAuthData().authData;
  
  return (
    <div className="px-8 pt-28 h-screen">
      {authToken && authData ? (
        <>
          <h1 className="text-2xl">
            Welcome back, {JSON.parse(authData).payload.firstName}. (profile
            goes here)
          </h1>
          <ProfilePage
            email={JSON.parse(authData).payload.email}
            authToken={authToken}
            role={JSON.parse(authData).payload.role}
          />
        </>
      ) : (
        <h1 className="text-2xl">
          Welcome. Please sign in. (frontpage goes here)
        </h1>
      )}
    </div>
  );
};

export default Welcome;
