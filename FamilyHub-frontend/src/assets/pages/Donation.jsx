import React from "react";
import "../App.css";
import NavBar from "../components/wepages/NavBar";
import { useNavigate } from "react-router-dom";

const Donation = () => {
  const navigate = useNavigate();
  return (
    <div
      className="herosection-1"
      style={{
        backgroundColor: "#d69050",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <NavBar />

      <div className="container py-5">
        <h2
          className="donation-heading fs-2 fw-bold mb-4 text-center"
          style={{ marginTop: "4rem" }}
        >
          Donation
        </h2>

        <div className="row align-items-center">
          {/* Text */}
          <div className="col-12 col-lg-7 mb-4 mb-lg-0">
            <p
              className="fs-5"
              style={{
                lineHeight: "1.8",
                maxWidth: "70ch",
                margin: "0 auto",
                textAlign: "left",
              }}
            >
              Every donation is a step toward building stronger, more resilient
              families. Your generosity helps us fund scholarships, create
              community programs, and offer vital support to those working hard
              to build a better future. Whether big or small, your contribution
              makes a real difference — empowering children to learn, parents to
              grow, and communities to flourish. Together, we can share hope,
              spread kindness, and create lasting impact. Join us in making
              dreams possible, one family at a time.
            </p>
          </div>

          {/* Image */}
          <div className="col-12 col-lg-5 text-center">
            <img
              src="/images/donation.png"
              alt="Donation"
              className="img-fluid"
              style={{ maxWidth: "300px", height: "auto" }}
            />
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-success px-4 py-2"
            style={{
              fontFamily: "Times New Roman, serif",
              fontSize: "1.1rem",
            }}
            onClick={() => navigate("/form1")}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donation;
