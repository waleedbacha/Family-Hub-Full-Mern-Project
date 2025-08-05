import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDonation } from "../Slices/donationSlice";
import "bootstrap/dist/css/bootstrap.min.css";
// import NavBar from "../components/wepages/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DonationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDonation(formData)).then(() => {
      toast.success("you're amazing--thanks for donating");
      navigate("/", { state: { showThankYou: true } });
      setFormData({ amount: "", message: "" });
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#d69050" }}
    >
      {/* <NavBar /> */}
      <div
        className="card p-4 shadow-lg mt-5"
        style={{
          width: "28rem",
          borderRadius: "1rem",
          backgroundColor: "#fff7ee",
        }}
      >
        <h3 className="text-center mb-4">Make a Donation</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="Enter amount to donate"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="3"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Card Number (Dummy)</label>
            <input
              type="text"
              className="form-control"
              value="**** **** **** 4242"
              disabled
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#5c4033", color: "#fff" }}
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
