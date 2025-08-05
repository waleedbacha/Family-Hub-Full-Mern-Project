import React from "react";
import { useDispatch } from "react-redux";
import {
  updateRequestStatus,
  deleteScholarship,
} from "../../Slices/scholarshipSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ScholarshipsTable = ({
  scholarships,
  scholarshipLoading,
  scholarshipError,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteScholarship(id));
        MySwal.fire("Deleted!", "The scholarship has been deleted.", "success");
      }
    });
  };

  return (
    <div className="col-12">
      <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle mt-3">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Purpose</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scholarshipLoading ? (
                  <tr>
                    <td colSpan="8">Loading...</td>
                  </tr>
                ) : scholarshipError ? (
                  <tr>
                    <td colSpan="8" className="text-danger">
                      {scholarshipError}
                    </td>
                  </tr>
                ) : !scholarships || scholarships.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No scholarship applications yet.
                    </td>
                  </tr>
                ) : (
                  scholarships.map((req) => (
                    <tr key={req._id}>
                      <td>{req.applicant?.name || "-"}</td>
                      <td>{req.applicant?.email || "-"}</td>
                      <td>{req.applicant?.phone_number || "-"}</td>
                      <td>{req.amount || "-"}</td>
                      <td>
                        <span
                          className={`badge ${
                            req.status === "approved"
                              ? "bg-success"
                              : req.status === "rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {req.status || "pending"}
                        </span>
                      </td>
                      <td>{req.description || "-"}</td>
                      <td>{req.purpose || "-"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-success me-1"
                          onClick={() =>
                            dispatch(
                              updateRequestStatus({
                                id: req._id,
                                status: "approved",
                              })
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger me-1"
                          onClick={() =>
                            dispatch(
                              updateRequestStatus({
                                id: req._id,
                                status: "rejected",
                              })
                            )
                          }
                        >
                          Reject
                        </button>
                        <button
                          className="btn btn-sm btn-secondary me-1"
                          onClick={() =>
                            dispatch(
                              updateRequestStatus({
                                id: req._id,
                                status: "pending",
                              })
                            )
                          }
                        >
                          Reset
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleDelete(req._id)}
                        >
                          Delt
                        </button>
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

export default ScholarshipsTable;
