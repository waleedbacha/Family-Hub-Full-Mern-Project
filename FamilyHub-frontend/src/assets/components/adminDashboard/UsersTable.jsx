import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const UsersTable = ({
  users,
  usersLoading,
  usersError,
  editUserId,
  editedUser,
  setEditedUser,
  setEditUserId,
  handleSaveUser,
  handleCancelEdit,
  handleDeleteUser,
  handleEditUser,
}) => {
  return (
    <div className="col-md-12">
      <div className="card shadow-sm" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="card-body">
          {/* <h5 className="card-title">Registered Users</h5> */}
          <table className="table table-bordered table-striped table-hover align-middle mt-3">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersLoading ? (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              ) : usersError ? (
                <tr>
                  <td colSpan="4" className="text-danger">
                    {usersError}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4">No users found.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          value={editedUser.name || ""}
                          className="form-control"
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.name || "-"
                      )}
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <input
                          type="email"
                          value={editedUser.email || ""}
                          className="form-control"
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.email || "-"
                      )}
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <select
                          className="form-select"
                          value={editedUser.role || "user"}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              role: e.target.value,
                            })
                          }
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        user.role || "-"
                      )}
                    </td>
                    <td>
                      {editUserId === user._id ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleSaveUser(user._id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEditUser(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteUser(user._id)}
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
  );
};

export default UsersTable;
