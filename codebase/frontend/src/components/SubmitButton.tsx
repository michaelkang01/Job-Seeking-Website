import React from "react";
import PillButton from "./PillButton";
import "../assets/SignIn.css";

type SubmitButtonProps = {
  children?: React.ReactNode;
  // Additional classes to be added to the button
  className?: string;

  // Button state
  state?: "default" | "success" | "pending";

  // Text to show on success
  successText?: string;

  // Text to show on pending
  pendingText?: string;

  // Text to show on default
  defaultText?: string;
};

const SubmitButton = ({
  className = "",
  state = "default",
  successText = "Signed in",
  pendingText = "Please wait",
  defaultText = "Continue",
}: SubmitButtonProps) => {
  const disabled = state === "pending" || state === "success";
  return (
    <PillButton
      className={`${className} ${
        disabled ? "button-disabled" : "cursor-pointer"
      } transition-all ease-in-out duration-500 disabled:opacity-50 py-2 h-10 w-10 object-scale-down px-6 rounded-md bg-blue-600`}
      disabled={disabled}
      type="submit"
    >
      {state === "success" ? (
        <div className="flex flex-row text-center">
          <p className="mr-1">{successText}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
          </svg>
        </div>
      ) : state === "pending" ? (
        <div className="flex flex-row text-center">
          <p className="mr-3">{pendingText}</p>
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-4 h-4 mt-1 border-4 border-blue-400 border-solid rounded-full animate-spin"
          />
        </div>
      ) : (
        <p>{ defaultText }</p>
      )}
    </PillButton>
  );
};

export default SubmitButton;
