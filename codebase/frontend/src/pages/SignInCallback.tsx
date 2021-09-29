import React from "react";
import "tailwindcss/tailwind.css";
import { useLocation, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SignInCallback = () => {
  const auth = useAuth();
  const d = useQuery().get("d") || btoa(JSON.stringify({}));
  const callbackDataJsonString = atob(d);
  const callbackData = JSON.parse(callbackDataJsonString);
  const authToken: string = callbackData.token || "";
  const authData: string = JSON.stringify(callbackData.authData) || "";
  auth.updateData({ authToken, authData });
  return <Redirect to="/" />;
};

export default SignInCallback;
