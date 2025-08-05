import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFamilyHistory } from "../redux/familyHistorySlice";

const FamilyHistoryForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    dateOfDeath: "",
    relation: "",
    bio: "",
    image: "",
    status: "",
    parent: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      gender: formData.gender,
      dateOfBirth: parseInt(formData.dateOfBirth),
      dateOfDeath: formData.dateOfDeath
        ? parseInt(formData.dateOfDeath)
        : undefined,
      relation: formData.relation,
      bio: formData.bio,
      image: formData.image,
      status: formData.status,
      parent: formData.parent || null,
    };

    console.log("Sending to backend:", data);
    dispatch(addFamilyHistory(data));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h4>Family History Form</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Gender *</label>
              <select
                name="gender"
                className="form-select"
                required
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Date of Birth *</label>
              <input
                type="number"
                name="dateOfBirth"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Date of Death (optional)</label>
              <input
                type="number"
                name="dateOfDeath"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Relation *</label>
              <input
                type="text"
                name="relation"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                name="image"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Status *</label>
              <select
                name="status"
                className="form-select"
                required
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="alive">Alive</option>
                <option value="death">Deceased</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Parent ID (optional)</label>
              <input
                type="text"
                name="parent"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-control"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success px-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FamilyHistoryForm;
