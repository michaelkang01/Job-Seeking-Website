import React from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { Redirect } from "react-router";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [message, setMessage] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const auth = useAuth();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    axios({
      method: "post",
      url: "http://localhost:8001/api/user/authenticate",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: form.email.value,
        password: form.password.value,
      },
    })
      .then((res) => {
        setMessage("Signed in successfully");
        setSignedIn(true);
        auth.updateData({
          authData: JSON.stringify(res.data.authData),
          authToken: res.data.token,
        });
      })
      .catch((err) => {
        setMessage("Invalid email or password");
      });
  };

  if (auth.authToken || signedIn) {
    return (
      <>
        <Redirect to="/" />
      </>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl">Sign in</h1>
      <br />
      <div
        className={`${
          !message ? "hidden" : "block"
        } py-3 px-4 bg-blue-300 mb-4`}
      >
        {message}
      </div>
      <form
        action="http://localhost:8001/signin"
        method="POST"
        onSubmit={(e) => {
          submitForm(e);
        }}
      >
        <label className="text-xl">Email address</label>
        <input
          name="email"
          type="email"
          className="w-full p-2 focus:bg-blue-100 border-2 border-gray-200"
          placeholder="my@email.net"
        />
        <br />
        <br />
        <label className="text-xl">Password</label>
        <input
          name="password"
          type="password"
          className="w-full p-2 focus:bg-blue-100 focus:border-2 focus:border-gray-200 border-2 border-gray-200"
          placeholder="*********"
        />
        <br />
        <br />
        <input
          type="submit"
          className="cursor-pointer hover:bg-gray-500 py-2 px-4 w-full md:w-auto md:float-right bg-black text-white"
          value="Sign in"
        />
      </form>
    </div>
  );
};

export default SignIn;
