import React from "react";

const Error = ({ message, retry }) => {
  return (
    <div className="error">
      <p>Sorry! An error occured fetching the job list</p>
      <p className="text">{message}</p>

      <button onClick={retry} className="btn-1">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Retry
      </button>
    </div>
  );
};

export default Error;
