import React from "react";
import "./App.css";

const Button = ({ label, onClick, value, size }) => {
  return (
    <div
      className="Button"
      onClick={onClick}
      data-value={value}
      data-size={size}
    >
      {label}
    </div>
  );
};

export default Button;
