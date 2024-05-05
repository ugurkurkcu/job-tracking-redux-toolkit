import React from "react";

const SubmitButton = ({name}) => {
  return (

      <button type="submit" className="btn-1">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {name}
      </button>

  );
};

export default SubmitButton;
