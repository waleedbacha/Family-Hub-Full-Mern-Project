import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const ScholarshipStatus = ({ status, id }) => {
  const statusSteps = ["pending", "approved", "rejected"];
  const currentStep = statusSteps.indexOf(status);

  return (
    <div className="container mt-3" style={{ width: "20rem", height: "auto" }}>
      <div
        className="card shadow-sm p-3"
        style={{ backgroundColor: "#efe1d1" }}
      >
        <h4 className="mb-3">Application ID: {id}</h4>

        <div className="mb-3">
          <span className="text-muted">Status:</span>{" "}
          <span
            className={`badge ${
              status === "approved"
                ? "bg-success"
                : status === "rejected"
                ? "bg-danger"
                : "bg-warning text-dark"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="progress mb-4" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${((currentStep + 1) / statusSteps.length) * 100}%`,
            }}
          >
            {status}
          </div>
        </div>

        <div className="d-flex justify-content-between">
          {statusSteps.map((step, index) => (
            <div
              key={index}
              className={`text-center ${
                index <= currentStep ? "text-success" : "text-muted"
              }`}
            >
              <i
                className={`bi ${
                  index <= currentStep ? "bi-check-circle-fill" : "bi-circle"
                }`}
                style={{ fontSize: "1.5rem" }}
              />
              <div className="small mt-1">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipStatus;
