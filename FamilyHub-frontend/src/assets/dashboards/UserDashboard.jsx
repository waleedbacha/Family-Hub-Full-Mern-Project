import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ScholarshipStatus from "../Slices/scholarshipSlice";
import NavBar from "../components/wepages/NavBar";
import { fetchScholarships } from "../Slices/scholarshipSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showThankYou, setShowThankYou] = useState(false);
  const [showScholarshipSuccess, setShowScholarshipSuccess] = useState(false);

  const scholarships = useSelector(
    (state) => state.scholarships.scholarships || []
  );
  const user = useSelector((state) => state.auth.user);

  // ✅ Fix 1: Match using `applicant._id` not `userId`
  const userRequest = user
    ? scholarships.find(
        (req) => req.userId?.id === user.id || req.userId === user.id
      )
    : null;

  // ✅ Fix 2: Show donation thank you
  useEffect(() => {
    if (location.state?.showThankYou) {
      setShowThankYou(true);
      const timer = setTimeout(() => setShowThankYou(false), 3000);
      navigate(location.pathname, { replace: true });
      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

  // ✅ Fix 3: Show scholarship success message (only once)
  useEffect(() => {
    if (location.state?.scholarshipSubmitted) {
      setShowScholarshipSuccess(true);
      const timer = setTimeout(() => setShowScholarshipSuccess(false), 3000);
      navigate(location.pathname, { replace: true });
      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

  useEffect(() => {
    dispatch(fetchScholarships());

    const interval = setInterval(() => {
      dispatch(fetchScholarships());
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "#f5f9f7", minHeight: "100vh" }}>
      <NavBar bg="#d6e4e5" />

      <div className="MainHead px-4" style={{ marginTop: "5rem" }}>
        <div className="text-center mb-4">
          <h2 style={{ color: "#274c77" }}>
            Welcome back, {user?.name || "User"} 👋
          </h2>
          <p style={{ color: "#52796f" }}>
            Thank you for being part of our mission to uplift lives.
          </p>
        </div>

        {/* ✅ Donation Thank You */}
        {showThankYou && (
          <div className="d-flex justify-content-center mb-4">
            <div
              className="card shadow p-4 text-center"
              style={{
                backgroundColor: "#d1fae5",
                color: "#065f46",
                width: "80%",
                maxWidth: "600px",
              }}
            >
              <h5>🎉 Thank You, {user?.name || "Donor"}!</h5>
              <p>
                Your generous donation has been recorded. We appreciate your
                support!
              </p>
            </div>
          </div>
        )}

        {/* ✅ Scholarship Submission Success */}
        {showScholarshipSuccess && (
          <div className="d-flex justify-content-center mb-4">
            <div
              className="card shadow p-4 text-center"
              style={{
                backgroundColor: "#e3f2fd",
                color: "#1565c0",
                width: "80%",
                maxWidth: "600px",
              }}
            >
              <h5>✅ Scholarship Request Submitted!</h5>
              <p>
                Your application has been successfully submitted. We'll review
                it shortly.
              </p>
            </div>
          </div>
        )}

        <div className="container">
          <div className="row g-4">
            {/* Quick Actions */}
            <div className="col-md-6">
              <div
                className="card shadow h-100"
                style={{
                  backgroundColor: "#ffffff",
                  borderLeft: "5px solid #3d5a80",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-muted">Quick Actions</h5>
                  <div className="list-group mt-3">
                    <button
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      onClick={() => navigate("/donatepage")}
                    >
                      <span>💝 Donate Now</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                    <button
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      onClick={() => navigate("/scholarshippage")}
                      disabled={!!userRequest}
                    >
                      <span>
                        🎓{" "}
                        {userRequest
                          ? "Scholarship Submitted"
                          : "Apply for Scholarship"}
                      </span>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                    <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <span>🛍️ Visit Store</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                    <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                      <span>📨 Submit Query</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scholarship Status */}
            <div className="col-md-6">
              <div
                className="card shadow h-100"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-muted">Scholarship Status</h5>
                  <div className="mt-3">
                    {userRequest ? (
                      <ScholarshipStatus
                        status={userRequest.status}
                        id={userRequest.id}
                      />
                    ) : (
                      <div
                        className="alert alert-info text-center"
                        role="alert"
                      >
                        You haven't submitted a scholarship request yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
