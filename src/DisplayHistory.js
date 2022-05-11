import React from "react";
import "./App.css";

const DisplayHistory = ({ data }) => {
  return (
    <>
      {data.map((val, idx) => (
        <div className="DisplayHistory" key={idx}>
          {val}
        </div>
      ))}
    </>
  );
};

export default DisplayHistory;
