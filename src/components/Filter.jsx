import { useEffect, useState } from "react";
import { sortOptions, statusOptions, typeOptions } from "../constants";
import Select from "./Select";
import SubmitButton from "./SubmitButton";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "../app/slice/jobSlice";

const Filter = () => {
  const [text, setText] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [sort, setSort] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();

  const dispatch = useDispatch();

  const handleReset = (e) => {
    e.preventDefault();

    setText("");
    setDebouncedText("");
    setSort("");
    setStatus("");
    setType("");

    e.target.reset();
  };

  useEffect(() => {
    const sortParam =
      sort === "a-z" || sort === "z-a"
        ? "position"
        : sort === "En Eski" || sort === "En Yeni"
        ? "date"
        : undefined;

    const orderParams = sort === "a-z" || sort === "En Eski" ? "asc" : "desc";

    console.log(sortParam);
    const params = {
      q: text,
      _sort: sortParam,
      _order: orderParams,
      status: status || undefined,
      type: type || undefined,
    };

    dispatch(setLoading());

    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, sort, status, type]);

  useEffect(() => {
    if (text === undefined) return;

    const timer = setTimeout(() => setDebouncedText(text), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);
  return (
    <div className="filter-sec">
      <h2>Filtering form</h2>

      <form onSubmit={handleReset}>
        <div>
          <div>
            <label htmlFor="">Search</label>
            <input onChange={(e) => setText(e.target.value)} type="text" />
          </div>

          <Select
            label={"Status"}
            options={statusOptions}
            handleChange={(e) => setStatus(e.target.value)}
          />
          <Select
            label={"Type"}
            options={typeOptions}
            handleChange={(e) => setType(e.target.value)}
          />
          <Select
            label={"Sort"}
            options={sortOptions}
            handleChange={(e) => setSort(e.target.value)}
          />
        </div>

        <div className="items-center">
          <SubmitButton name={"Reset Filter"} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
