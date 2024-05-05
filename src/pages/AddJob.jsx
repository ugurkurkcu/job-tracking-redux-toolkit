import { v4 } from "uuid";
import AutoInput from "../components/AutoInput";
import { statusOptions, typeOptions } from "../constants";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createJob } from "../app/slice/jobSlice";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import SubmitButton from "../components/SubmitButton";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newJobData = Object.fromEntries(formData.entries());

    newJobData.id = v4();
    newJobData.date = Date.now();

    api
      .post("/jobs", newJobData)
      .then((res) => {
        toast.success("Job is added successfully");
        dispatch(createJob(newJobData));
        navigate("/");
      })
      .catch((err) => {
        toast.error("Error occured adding job");
      });
  };
  return (
    <div className="add-page">
      <section className="container">
        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit}>

            <AutoInput label={"Pozisyon"} name={"position"} />
            <AutoInput label={"Şirket"} name={"company"} />
            <AutoInput label={"Lokasyon"} name={"location"} />

            <Select label={"Status"} options={statusOptions} name={"status"} />
            <Select label={"Type"} options={typeOptions} name={"type"} />


          <div className="items-center">
            <SubmitButton name={"Create"} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
