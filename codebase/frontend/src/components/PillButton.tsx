import React from "react";

type RoundedButtonProps = {
  children: any;
  href: string;
};
const RoundedButton = ({
  children,
  href,
}: RoundedButtonProps) => {
  return (
    <a
      href={href}
      className="cursor-pointer py-2 px-4 w-full md:w-auto rounded-md bg-blue-500 text-white rounded-full text-center"
    >
      <p>{children}</p>
    </a>
  );
};

export default RoundedButton;