import React from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "react-router-dom";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const auth = useAuth();
  const authToken = auth.getAuthData().authToken;
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    axios({
      method: "post",
      url: "http://localhost:8001/api/user/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        password: form.password.value,
      },
    })
      .then((res) => {
        console.log(res.data);
        setMessage("Signed up successfully");
        setSignedUp(true);
      })
      .catch((err) => {
        setMessage("Error signing up: " + err.response.data.message);
      });
  };

  if (authToken || signedUp) {
    return (
      <>
        <Redirect to="/signin" />
      </>
    );
  }

  return (
    <div className="px-8 bg-gray-100 md:bg-none pt-24 md:pt-40 h-screen md:bg-none signin-background">
      <div className="md:flex md:justify-center">
        <div className="w-full md:max-w-lg md:bg-white md:rounded-xl md:py-12 md:px-16">
          <h1 className="text-3xl text-center">Create an account</h1>
          <br />
          <div
            className={`${
              !message ? "hidden" : "block"
            } py-3 px-4 bg-blue-300 mb-4 rounded-md`}
          >
            {message}
          </div>
          <br />
          <form
            action="http://localhost:8001/signin"
            method="POST"
            onSubmit={(e) => {
              submitForm(e);
            }}
          >
            <label className="pl-4">First name</label>
            <input
              name="firstName"
              type="text"
              className="focus:outline-none bg-gray-200 w-full py-2 px-4 focus:bg-gray-100 border-2 border-gray-200 rounded-full"
              placeholder="John"
            />
            <br />
            <br />
            <label className="pl-4">Last name</label>
            <input
              name="lastName"
              type="text"
              className="focus:outline-none bg-gray-200 w-full py-2 px-4 focus:bg-gray-100 border-2 border-gray-200 rounded-full"
              placeholder="Doe"
            />
            <br />
            <br />
            <label className="pl-4">Email</label>
            <input
              name="email"
              type="email"
              className="focus:outline-none bg-gray-200 w-full py-2 px-4 focus:bg-gray-100 border-2 border-gray-200 rounded-full"
              placeholder="my@email.net"
            />
            <br />
            <br />
            <label className="pl-4">Password</label>
            <input
              name="password"
              type="password"
              className="focus:outline-none bg-gray-200 w-full py-2 px-4 focus:bg-gray-100 border-2 border-gray-200 rounded-full"
              placeholder="*********"
            />
            <br />
            <br />
            <br />
            <div className="flex flex-col justify-center items-center">
              <input
                type="submit"
                className="cursor-pointer hover:bg-blue-500 py-2 px-6 w-full md:w-auto rounded-md bg-blue-600 text-white rounded-full"
                value="Sign up"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
