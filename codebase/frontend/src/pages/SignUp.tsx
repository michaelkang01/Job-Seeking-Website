import React from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "react-router-dom";
import { AlertMessage, AlertType } from "../components/AlertMessage";
import { Spacer } from "../components/Spacer";
import TextInput from "../components/TextInput";

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
      url: `${process.env.REACT_APP_API_URL}/api/user/create`,
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
        setMessage("Signed up successfully");
        setSignedUp(true);
      })
      .catch((err) => {
        setMessage("Error signing up: " + err.response.data.message);
      });
  };

  if (authToken || signedUp) {
    return <Redirect to="/signin" />;
  }

  return (
    <div className="px-8 bg-gray-100 md:bg-none pt-24 md:pt-56 h-screen md:bg-none signin-background">
      <div className="md:flex md:justify-center">
        <div className="filter drop-shadow-2xl w-full md:max-w-lg md:bg-white md:rounded-xl md:py-12 md:px-16">
          <h1 className="text-3xl text-center">Create an account</h1>
          <Spacer height={2} />
          <AlertMessage message={message} type={AlertType.info} />
          <Spacer height={1} />
          <form
            onSubmit={(e) => {
              submitForm(e);
            }}
          >
            <label className="pl-4">First name</label>
            <TextInput
              name="firstName"
              type="text"
              placeholder="John"
              autoComplete="given-name"
              required={true}
            />
            <Spacer height={1.5} />
            <label className="pl-4">Last name</label>
            <TextInput
              name="lastName"
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              required={true}
            />
            <Spacer height={1.5} />
            <label className="pl-4">Email</label>
            <TextInput name="email" type="email" autoComplete="email" placeholder="my@email.net" />
            <Spacer height={1.5} />
            <label className="pl-4">Password</label>
            <TextInput
              name="password"
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              autoComplete="new-password"
            />
            <Spacer height={2} />
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
