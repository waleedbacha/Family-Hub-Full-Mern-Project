import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const DonationsTable = ({ donations, handleDeleteDonation }) => {
  return (
    <div className="col-md-12">
      <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="card-body">
          {/* <h5 className="card-title">Recent Donations</h5> */}
          <table className="table table-striped mt-3">
            <thead className="table-primary">
              <tr>
                <th>Donor</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!donations || donations.length === 0 ? (
                <tr>
                  <td colSpan="7">No donations yet.</td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{donation.donor?.name || "Anonymous"}</td>
                    <td>{donation.donor?.email || "-"}</td>
                    <td>${donation.amount || "-"}</td>
                    <td>{donation.donor?.phone_number || "-"}</td>
                    <td>{donation.donor?.address || "-"}</td>
                    <td>
                      {donation.createdAt
                        ? new Date(donation.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteDonation(donation._id)}
                      >
                        Delete
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
  );
};

export default DonationsTable;
