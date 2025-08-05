// Registration.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Slices/authSlice";
import "../App.css";
import { toast } from "react-toastify";
// import Navv from "../pages/Navv";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    address: "",
    phone_number: "",
    image: "",
    role: "",
  });
  console.log(user, isAuthenticated);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Registration successful. Redirecting to login...");
        navigate("/login");
      } else {
        alert("Registration failed: " + res.payload);
      }
    });
  };

  return (
    <div className="nav-bar ">
      {/* <Navv /> */}
      <div
        className="spaced-content container-fluid min-vh-100 d-flex justify-content-center align-items-center mt-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1507238691740-157033c2737b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
          minHeight: "100vh",
        }}
      >
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xl-5">
            {/* Main Card */}
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                transform: "scale(1)",
                animation: "fadeInUp 0.8s ease forwards",
              }}
            >
              {/* Header */}
              <div
                className="text-white text-center py-4"
                style={{
                  backgroundColor: "#274c77",
                  backgroundImage:
                    "radial-gradient(ellipse at top, #3d5a80, #274c77)",
                }}
              >
                <h3 className="mb-1 fw-bold" style={{ fontSize: "1.8rem" }}>
                  Join FamilyHub
                </h3>
                <p className="mb-0 opacity-90" style={{ fontSize: "0.95rem" }}>
                  Create your account to get started
                </p>
              </div>

              {/* Body */}
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Name */}
                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        style={{
                          borderRadius: "10px",
                          borderColor: "#d0e1e9",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.borderColor = "#88c0e0")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.borderColor = "#d0e1e9")
                        }
                      />
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-semibold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                        style={{
                          borderRadius: "10px",
                          borderColor: "#d0e1e9",
                        }}
                      />
                    </div>

                    {/* Age */}
                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-semibold">
                        Age
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter you age"
                        required
                        style={{
                          borderRadius: "10px",
                          borderColor: "#d0e1e9",
                        }}
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="+92 033457239"
                        required
                        style={{
                          borderRadius: "10px",
                          borderColor: "#d0e1e9",
                        }}
                      />
                    </div>

                    {/* Address */}
                    <div className="col-12">
                      <label className="form-label small text-muted fw-semibold">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Complete Address"
                        required
                        style={{
                          borderRadius: "10px",
                          borderColor: "#d0e1e9",
                        }}
                      />
                    </div>

                    {/* Password */}
                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-semibold">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        style={{
                          borderRadius: "10px",
                          borderColor: "#d0e1e9",
                        }}
                      />
                    </div>

                    {/* Role */}
                    <div className="col-md-6">
                      <label className="form-label small text-muted fw-semibold">
                        Role
                      </label>
                      <select
                        className="form-select form-select-lg"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: "10px",
                          borderColor: "#d0e1e9",
                        }}
                      >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    {/* Image URL (Optional) */}
                    <div className="col-12">
                      <label className="form-label small text-muted fw-semibold">
                        Profile Image URL (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        style={{
                          borderRadius: "10px",
                          borderColor: "#d0e1e9",
                        }}
                      />
                    </div>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <div
                      className="alert alert-danger mt-3 mb-0 text-center py-2"
                      style={{
                        fontSize: "0.9rem",
                        borderRadius: "8px",
                      }}
                    >
                      <i className="bi bi-exclamation-triangle-fill me-1"></i>
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn w-100 text-white fw-semibold"
                      disabled={loading}
                      style={{
                        backgroundColor: "#274c77",
                        padding: "12px",
                        borderRadius: "10px",
                        fontSize: "1.1rem",
                        transition: "all 0.3s",
                        boxShadow: "0 4px 12px rgba(39, 76, 119, 0.2)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#1e3a5f";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#274c77";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Registering...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>

                  {/* Login Link */}
                  <div
                    className="text-center mt-3"
                    style={{ fontSize: "0.95rem" }}
                  >
                    <p className="text-muted mb-1">Already have an account?</p>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="btn btn-link text-decoration-none p-0"
                      style={{
                        color: "#274c77",
                        fontWeight: "600",
                        fontSize: "1rem",
                      }}
                    >
                      Log in here
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer Note */}
            <div
              className="text-center mt-3"
              style={{ color: "#ffffffff", fontSize: "0.85rem" }}
            >
              By registering, you agree to our{" "}
              <a href="/terms" style={{ color: "#274c77" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" style={{ color: "#274c77" }}>
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
