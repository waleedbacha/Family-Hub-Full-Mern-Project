import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Slices/authSlice"; // adjust import path if needed
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { toast } from "react-toastify";

const Navv = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth); // <- your Redux auth slice

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.info("log out successfully");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{
        backgroundColor: "#274c77",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container">
        <a
          className="navbar-brand fw-bold fs-3"
          style={{ fontFamily: "Playfair Display, serif", color: "#fff" }}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            scroll.scrollToTop();
          }}
        >
          FamilyHub
        </a>

        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            {[
              "Home",
              "About",
              "Mission",
              "What We Do",
              "Marketplace",
              "Donation",
              "Scholarship",
              "Contact",
            ].map((item) => (
              <li className="nav-item" key={item}>
                <ScrollLink
                  to={item.toLowerCase().replace(" ", "")}
                  smooth={true}
                  duration={800}
                  offset={-70}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsNavOpen(false)}
                >
                  {item}
                </ScrollLink>
              </li>
            ))}

            {/* Auth Buttons */}
            <li className="nav-item d-flex align-items-center">
              {!user ? (
                <>
                  <a
                    href="/login"
                    className="btn btn-outline-light btn-sm mx-2"
                  >
                    Login
                  </a>
                  <a href="/register" className="btn btn-warning btn-sm">
                    Register
                  </a>
                </>
              ) : (
                <>
                  {user.role === "admin" && (
                    <a
                      href="/admindashboard"
                      className="btn btn-success btn-sm mx-2"
                    >
                      Admin
                    </a>
                  )}
                  <button
                    className="btn btn-danger btn-sm mx-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navv;
