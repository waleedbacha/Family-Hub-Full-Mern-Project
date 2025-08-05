import React from "react";
import "../App.css";
import NavBar from "../components/wepages/NavBar";
import { useNavigate } from "react-router-dom";

const Scholarship = () => {
  const navigate = useNavigate();
  return (
    <div
      className="herosection-1"
      style={{
        backgroundColor: "#e0be1a",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <NavBar />

      <div className="container py-5">
        {/* Heading */}
        <h2 className="donation-heading fs-2 fw-bold mb-4 text-center mt-5">
          Scholarship
        </h2>

        <div className="row align-items-center">
          {/* Image on the left */}
          <div className="col-12 col-lg-5 text-center mb-4 mb-lg-0">
            <img
              className="img-fluid"
              src="/images/Scholarship.png"
              alt="Scholarship"
              style={{ maxWidth: "400px", height: "auto" }}
            />
          </div>

          {/* Text on the right */}
          <div className="col-12 col-lg-7">
            <p
              className="fs-5"
              style={{
                lineHeight: "1.8",
                textAlign: "left",
                maxWidth: "70ch",
                margin: "0 auto",
              }}
            >
              At the heart of every family is the hope for a brighter future.
              Our scholarship program is dedicated to uplifting families by
              providing financial support to students who aspire to grow, learn,
              and give back. We believe that education is not just a personal
              journey—it's a shared dream that strengthens entire communities.
              Through these scholarships, we aim to ease financial burdens and
              open doors of opportunity, so families can thrive together.
              Whether you're a first-generation student, a dedicated parent
              returning to school, or a young dreamer with big goals, this is
              our way of saying: we believe in you.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-success px-5 py-2"
            style={{
              fontFamily: "Times New Roman, serif",
              fontSize: "1.1rem",
            }}
            onClick={() => navigate("/form2")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
