import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistories } from "../Slices/familyHistorySlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { unparse } from "papaparse";
import { Tabs, Tab, Pagination } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import FamilyTreeView from "../components/FamilyTreeView";
import "../components/FamilyTreeView.css"; // Custom fade class

const FamilyHistoryPage = () => {
  const dispatch = useDispatch();
  const { histories = [], loading } = useSelector(
    (state) => state.familyHistory
  );
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ gender: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(fetchHistories());
  }, [dispatch]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("All Family Members", 14, 22);
    doc.setFontSize(12);

    const tableColumn = [
      "Name",
      "Gender",
      "Relation",
      "DOB",
      "DOD",
      "Status",
      "Bio",
      "parent",
    ];

    const tableRows = [];

    histories.forEach((member) => {
      tableRows.push([
        member.name || "-",
        member.gender || "-",
        member.relation || "-",
        member.dateOfBirth || "-",
        member.dateOfDeath || "-",
        member.status || "-",
        member.bio || "-",
        member.parent || "-",
      ]);
    });

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10 },
    });

    doc.save("family-history.pdf");
  };

  const handleExportCSV = () => {
    const csv = unparse(histories);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "family-history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMembers = histories.filter((member) => {
    const searchText = search.toLowerCase();
    const matchesSearch = ["name", "bio", "relation", "status", "gender"].some(
      (field) => member[field]?.toLowerCase().includes(searchText)
    );
    const matchesGender = filters.gender
      ? member.gender.toLowerCase() === filters.gender
      : true;
    const matchesStatus = filters.status
      ? member.status.toLowerCase() === filters.status
      : true;
    const matchesTab =
      activeTab === "all" || member.status?.toLowerCase() === activeTab;
    return matchesSearch && matchesGender && matchesStatus && matchesTab;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  return (
    <div>
      {/* <NavBar /> */}

      <section
        className="py-5 text-center text-white mt-5"
        style={{
          background: "linear-gradient(135deg, #3a6073, #16222a)",
          minHeight: "300px",
        }}
      >
        <div className="container">
          <h1 className="display-3 fw-bold mb-3">Our Family Legacy</h1>
          <p className="lead">
            Explore the cherished memories and stories passed down through
            generations.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <button onClick={handleExportPDF} className="btn btn-outline-light">
              <i className="bi bi-file-earmark-pdf"></i> Export PDF
            </button>
            <button onClick={handleExportCSV} className="btn btn-outline-light">
              <i className="bi bi-file-earmark-spreadsheet"></i> Export CSV
            </button>
          </div>
        </div>
      </section>

      <div className="container py-5 fade-in" id="history-section">
        <div className="row g-3 mb-4 align-items-end">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search name, bio, relation..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select shadow-sm"
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select shadow-sm"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="alive">Alive</option>
              <option value="deceased">Deceased</option>
            </select>
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="all" title="All Members" />
          <Tab eventKey="alive" title="Alive" />
          <Tab eventKey="deceased" title="Deceased" />
          <Tab eventKey="tree" title="Tree View" />
        </Tabs>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : activeTab === "tree" ? (
          <FamilyTreeView histories={histories} />
        ) : currentItems.length > 0 ? (
          <div className="row g-4 fade-in">
            {currentItems.map((member) => (
              <div className="col-md-4" key={member._id}>
                <div
                  className="card h-100 shadow-lg border-0 rounded-4 text-white"
                  style={{
                    background: "linear-gradient(145deg, #485563, #29323c)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold mb-3">
                      <i className="bi bi-person-circle me-2"></i>
                      {member.name}
                    </h5>
                    <p className="card-text">
                      <i
                        className={`bi ${
                          member.gender.toLowerCase() === "female"
                            ? "bi-gender-female"
                            : "bi-gender-male"
                        }`}
                      ></i>{" "}
                      <strong>Gender:</strong> {member.gender}
                      <br />
                      <i className="bi bi-people"></i>{" "}
                      <strong>Relation:</strong> {member.relation}
                      <br />
                      <i className="bi bi-calendar"></i> <strong>Born:</strong>{" "}
                      {member.dateOfBirth}
                      <br />
                      {member.dateOfDeath && (
                        <>
                          <i className="bi bi-x-circle"></i>{" "}
                          <strong>Died:</strong> {member.dateOfDeath}
                          <br />
                        </>
                      )}
                      {member.status && (
                        <>
                          <i className="bi bi-heart-pulse"></i>{" "}
                          <strong>Status:</strong> {member.status}
                          <br />
                        </>
                      )}
                      {member.bio && (
                        <>
                          <i className="bi bi-journal-text"></i>{" "}
                          <strong>Bio:</strong> {member.bio}
                        </>
                      )}
                      <br />
                      {member.parent && (
                        <>
                          <i className="bi bi-person-fill-up"></i>{" "}
                          <strong>Parent:</strong>{" "}
                          {member.parent?.name || "Unknown"}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 text-muted">
            <p>No matching family members found.</p>
          </div>
        )}

        {activeTab !== "tree" && totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyHistoryPage;
