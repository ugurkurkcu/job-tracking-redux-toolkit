import React from "react";

const Select = ({ label, options, handleChange, name }) => {
  return (
    <div>
      <label>{label}</label>
      <select onChange={handleChange} name={name}>
        <option key={"select"} hidden value="select">
          Select
        </option>
        {options.map((i, index) => (
          <option key={index} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
