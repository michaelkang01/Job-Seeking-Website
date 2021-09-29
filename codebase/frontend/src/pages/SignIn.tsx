import React from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { Redirect } from "react-router";
import { useAuth } from "../context/AuthContext";
import GoogleIcon from "../assets/google.svg";
import "../assets/SignIn.css";

const SignIn = () => {
  const [message, setMessage] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const auth = useAuth();
  const authToken = auth.getAuthData().authToken;

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

  if (authToken || signedIn) {
    return (
      <>
        <Redirect to="/" />
      </>
    );
  }

  return (
    <div
      className="px-8 bg-gray-100 md:bg-none pt-24 md:pt-40 h-screen md:bg-none signin-background"
    >
      <div className="md:flex md:justify-center">
        <div className="w-full md:max-w-lg md:bg-white md:rounded-xl md:py-12 md:px-16">
          <h1 className="text-3xl text-center">Sign in to your account</h1>
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
            <input
              name="email"
              type="email"
              className="focus:outline-none bg-gray-200 w-full py-2 px-4 focus:bg-gray-100 border-2 border-gray-200 rounded-full"
              placeholder="my@email.net"
            />
            <br />
            <br />
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
                value="Continue"
              />
            </div>
            <br />
            <div className="flex flex-col justify-center items-center">
              <a href="/" className="text-black underline">
                Forgot your password?
              </a>
            </div>
            <br />
            <hr />
            <br />
            <p className="text-center">Or, sign in with</p>
            <br />
            <div className="flex flex-col justify-center items-center">
              <a
                href="http://localhost:8001/api/user/auth/google"
                className="cursor-pointer py-2 px-4 w-full md:w-auto rounded-md bg-blue-500 text-white rounded-full text-center"
              >
                <p>
                  <img
                    src={GoogleIcon}
                    alt="Google Sign-in"
                    style={{ filter: "invert(1)", marginBottom: "1px" }}
                    className="inline pr-1"
                  />{" "}
                  Google
                </p>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
