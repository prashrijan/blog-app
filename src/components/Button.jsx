import React from "react";

const Button = ({
  text,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
