import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createScholarship } from "../Slices/scholarshipSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ScholarshipForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.users);

  const [formData, setFormData] = useState({
    description: "",
    purpose: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!user) {
    //   alert("You need to be logged in first.");
    //   return;
    // }

    // const requestPayload = {
    //   userId: user._id,
    //   purpose: formData.purpose,
    //   description: formData.description,
    //   amount: parseFloat(formData.amount),
    // };

    dispatch(createScholarship(formData)).then((res) => {
      if (!res.error) {
        toast.success("Scholarship request submitted successfully!");
        navigate("/");
        setFormData({ description: "", purpose: "", amount: "" });
      } else {
        alert("Error: " + res.payload);
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#e0be1a", minHeight: "100vh" }}>
      {/* <NavBar /> */}
      <div className="container d-flex justify-content-center align-items-start py-5">
        <div
          className="card shadow p-4 w-100"
          style={{
            maxWidth: "600px",
            backgroundColor: "#e8f4fd",
            borderRadius: "1rem",
            marginTop: "4rem",
          }}
        >
          <h3 className="text-center mb-4">Scholarship Application</h3>
          <form onSubmit={handleSubmit}>
            {/* <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={user?.name || ""}
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={user?.email || ""}
                  disabled
                />
              </div>
            </div> */}

            <div className="row mb-3">
              {/* <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  className="form-control"
                  value={user?.phone || ""}
                  disabled
                />
              </div> */}
              <div className="col-md-6">
                <label className="form-label">Amount Requested</label>
                <input
                  name="amount"
                  type="number"
                  className="form-control"
                  placeholder="Amount in numbers"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Purpose</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="e.g: Education, Business"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="purpose"
                className="form-control"
                placeholder="What do you need?"
                value={formData.purpose}
                onChange={handleChange}
                rows={2}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipForm;
