import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const FamilyHistoryTable = ({
  histories,
  historyLoading,
  historyError,
  editHistoryId,
  editedHistory,
  setEditedHistory,
  setEditHistoryId,
  handleSaveHistory,
  handleCancelHistoryEdit,
  handleDeleteHistory,
  handleEditHistory,
}) => {
  return (
    <div className="col-12">
      <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="card-body">
          {/* <h5 className="card-title mb-4">Family History</h5> */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>DOD</th>
                  <th>Relation</th>
                  <th>Bio</th>
                  <th>Status</th>
                  <th>Parent</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {historyLoading ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : historyError ? (
                  <tr>
                    <td colSpan="9" className="text-danger text-center">
                      {historyError}
                    </td>
                  </tr>
                ) : histories.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No family history found.
                    </td>
                  </tr>
                ) : (
                  histories.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {editHistoryId === item._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedHistory.name || ""}
                            onChange={(e) =>
                              setEditedHistory({
                                ...editedHistory,
                                name: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.name || "-"
                        )}
                      </td>
                      <td>
                        {editHistoryId === item._id ? (
                          <select
                            className="form-select"
                            value={editedHistory.gender || ""}
                            onChange={(e) =>
                              setEditedHistory({
                                ...editedHistory,
                                gender: e.target.value,
                              })
                            }
                          >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        ) : (
                          item.gender || "-"
                        )}
                      </td>
                      <td>
                        {editHistoryId === item._id ? (
                          <input
                            type="number"
                            className="form-control"
                            value={editedHistory.dateOfBirth || ""}
                            onChange={(e) =>
                              setEditedHistory({
                                ...editedHistory,
                                dateOfBirth: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.dateOfBirth || "-"
                        )}
                      </td>
                      <td>
                        {editHistoryId === item._id ? (
                          <input
                            type="number"
                            className="form-control"
                            value={editedHistory.dateOfDeath || ""}
                            onChange={(e) =>
                              setEditedHistory({
                                ...editedHistory,
                                dateOfDeath: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.dateOfDeath || "-"
                        )}
                      </td>
                      <td>
                        {editHistoryId === item._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedHistory.relation || ""}
                            onChange={(e) =>
                              setEditedHistory({
                                ...editedHistory,
                                relation: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.relation || "-"
                        )}
                      </td>
                      <td
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "normal",
                        }}
                      >
                        {editHistoryId === item._id ? (
                          <textarea
                            className="form-control"
                            value={editedHistory.bio || ""}
                            onChange={(e) =>
                              setEditedHistory({
                                ...editedHistory,
                                bio: e.target.value,
                              })
                            }
                          />
                        ) : (
                          item.bio || "-"
                        )}
                      </td>
                      <td>
                        {editHistoryId === item._id ? (
                          <select
                            className="form-select"
                            value={editedHistory.status || ""}
                            onChange={(e) =>
                              setEditedHistory({
                                ...editedHistory,
                                status: e.target.value,
                              })
                            }
                          >
                            <option value="">Select</option>
                            <option value="alive">Alive</option>
                            <option value="deceased">Deceased</option>
                          </select>
                        ) : (
                          <span
                            className={`badge rounded-pill ${
                              item.status === "alive"
                                ? "bg-success"
                                : item.status === "deceased"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {item.status || "-"}
                          </span>
                        )}
                      </td>
                      <td>{item.parent?.name || "-"}</td>
                      <td>
                        {editHistoryId === item._id ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => handleSaveHistory(item._id)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={handleCancelHistoryEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEditHistory(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteHistory(item._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyHistoryTable;
