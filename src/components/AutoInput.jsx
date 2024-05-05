import React from "react";
import { useSelector } from "react-redux";

const AutoInput = ({ label, name }) => {
  const { jobs } = useSelector((store) => store.jobReducer);

  const obj = jobs.map((job) => job[name]);

  const newObj = new Set(obj);

  const options = Array.from(newObj);

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input list={name} name={name} id={label} type="text" />

      <datalist id={name}>
        {options.map((i, ind) => (
          <option key={ind} value={i} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
