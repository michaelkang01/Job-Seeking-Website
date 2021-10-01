import React from "react";

// Interface: AlertMessageProps
// Description: Interface for AlertMessage component
// AlertMessage parameters:
//  message: string
//  type: AlertType
type AlertMessageProps = {
  message: string;
  type?: String;
};

// Alert Message Type
const AlertType = {
    success: "bg-green-300",
    error: "bg-red-300",
    info: "bg-blue-300",
    warning: "bg-yellow-300"
}

const AlertMessage = ({ message, type = AlertType.info }: AlertMessageProps) => {
    
  return (
    <div
      className={`${
        !message ? "hidden" : "block"
      } py-3 px-4 ${type} mb-4 rounded-md`}
    >
      {message}
    </div>
  );
};

export {AlertMessage, AlertType};