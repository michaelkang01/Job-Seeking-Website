import React from "react";
import "tailwindcss/tailwind.css";
import { useAuth } from "../context/AuthContext";

const Welcome = () => {
  const auth = useAuth();
  const authToken = auth.authToken;
  const authData = auth.authData;
  console.log(authData);

  return (
    <div className="p-8">
      {authToken && authData ? (
        <>
          <h1>You're signed in as {JSON.parse(authData).payload.email}</h1>
        </>
      ) : (
        <h1>Please login</h1>
      )}
    </div>
  );
};

export default Welcome;
