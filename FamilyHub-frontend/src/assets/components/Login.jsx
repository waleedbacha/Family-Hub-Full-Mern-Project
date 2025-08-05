// Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Slices/authSlice";
// import Navv from "../pages/Navv"; // ✅ Import NavBar
import "../App.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log(user, isAuthenticated);
  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success("Login successfully");
      navigate(user.role === "admin" ? "/admindashboard" : "/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      const role = result.payload.role;
      // navigate(role === "admin" ? "/admindashboard" : "/");
    }
  };

  return (
    <>
      {/* Navbar */}
      {/* <Navv /> */}

      {/* Main Login Section */}
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1507238691740-157033c2737b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px 0",
          minHeight: "100vh",
          //   style={{ minHeight: "100vh" }}
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              {/* Login Card */}
              <div
                className="card shadow-lg border-0"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
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
                    Welcome Back
                  </h3>
                  <p
                    className="mb-0 opacity-90"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Sign in to continue to FamilyHub
                  </p>
                </div>

                {/* Body */}
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label small text-muted fw-semibold">
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
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

                    {/* Password */}
                    <div className="mb-3">
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
                            Logging in...
                          </>
                        ) : (
                          "Log In"
                        )}
                      </button>
                    </div>

                    {/* Register Link */}
                    <div
                      className="text-center mt-3"
                      style={{ fontSize: "0.95rem" }}
                    >
                      <p className="text-muted mb-1">Don't have an account?</p>
                      <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="btn btn-link text-decoration-none p-0"
                        style={{
                          color: "#274c77",
                          fontWeight: "600",
                          fontSize: "1rem",
                        }}
                      >
                        Register here
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
                By logging in, you agree to our{" "}
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
    </>
  );
};

export default Login;
