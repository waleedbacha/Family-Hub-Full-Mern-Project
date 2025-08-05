// AdminMenu.jsx
import React, { useState } from "react";
import { Nav, Card } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./SidebarStyling.css";
const AdminMenu = ({ setActiveSection }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CSSTransition
      in={sidebarOpen || window.innerWidth >= 768}
      timeout={300}
      classNames="sidebar"
      unmountOnExit
    >
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: 0,
          width: "200px",
          height: "calc(100vh - 56px)",
          background: "linear-gradient(135deg, #2c3e50, #3498db)",
          overflowY: "auto",
          zIndex: 1020,
        }}
        className="p-3"
      >
        <Card className="bg-transparent border-0">
          <Card.Body>
            <h5 className="text-white text-center mb-4">Dashboard</h5>
            <Nav className="flex-column">
              {[
                {
                  key: "quickActions",
                  label: "Quick Actions",
                  icon: "speedometer2",
                },
                { key: "users", label: "Users", icon: "people" },
                { key: "donations", label: "Donations", icon: "wallet" },
                {
                  key: "scholarships",
                  label: "Scholarships",
                  icon: "mortarboard",
                },
                { key: "familyHistory", label: "Family History", icon: "tree" },
                { key: "stories", label: "Stories", icon: "book" },
                { key: "products", label: "Products", icon: "cart" },
              ].map((item) => (
                <Nav.Item key={item.key} className="mb-2">
                  <Nav.Link
                    onClick={() => {
                      setActiveSection(item.key);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className="text-white rounded-pill d-flex align-items-center px-3 py-2"
                    style={{ transition: "all 0.3s ease" }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "#34495e")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "transparent")
                    }
                  >
                    <i
                      className={`bi bi-${item.icon} fs-4 me-2 text-light`}
                    ></i>
                    {item.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Card.Body>
        </Card>
      </div>
    </CSSTransition>
  );
};

export default AdminMenu;
