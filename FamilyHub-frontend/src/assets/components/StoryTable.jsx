import { useDispatch } from "react-redux";
import { deleteStory, fetchStories, updateStory } from "../Slices/storySlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const StoryTable = ({ stories = [] }) => {
  const dispatch = useDispatch();
  const [editStoryId, setEditStoryId] = useState(null);
  const [editedStory, setEditedStory] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditStoryId((prev) => ({
        ...prev,
        imageFile: file, // file for backend
        image: URL.createObjectURL(file), // preview
      }));
    }
  };

  const handleEditStory = (story) => {
    setEditStoryId(story._id);
    setEditedStory({
      title: story.title || "",
      description: story.description || "",
      scholarshipRewarded: story.scholarshipRewarded || "",
    });
  };

  const handleSaveStory = async (id) => {
    await dispatch(updateStory({ id, formData: editedStory }));
    await dispatch(fetchStories());
    toast.success("Story Updated successfully!");

    setEditStoryId(null);
    setEditedStory({});
  };

  const handleCancelStoryEdit = () => {
    setEditStoryId(null);
    setEditedStory({});
  };

  const handleDeleteStory = (id) => {
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
        dispatch(deleteStory(id));
        MySwal.fire("Deleted!", "The story has been deleted.", "success");
      }
    });
  };

  const handleChange = (e) => {
    setEditedStory({ ...editedStory, [e.target.name]: e.target.value });
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        {/* <h5 className="card-title">Success Stories</h5> */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle mt-3">
            <thead className="table-primary">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Scholarship</th>
                <th>Description</th>
                <th>Date</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No stories found.
                  </td>
                </tr>
              ) : (
                stories.map((story) => (
                  <tr key={story._id}>
                    <td>
                      {editStoryId === story._id ? (
                        <>
                          <Form.Control
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {editedStory.image && (
                            <Image
                              src={editedStory.image}
                              alt="Preview"
                              thumbnail
                              width="60"
                              height="60"
                              className="mt-1"
                            />
                          )}
                        </>
                      ) : story.imageUrl ? (
                        <img
                          src={`http://localhost:3000${story.imageUrl}`}
                          alt={story.title || "story"}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>
                      {editStoryId === story._id ? (
                        <input
                          type="text"
                          name="title"
                          value={editedStory.title}
                          onChange={handleChange}
                          className="form-control form-control-sm"
                        />
                      ) : (
                        story.title
                      )}
                    </td>

                    <td>
                      {editStoryId === story._id ? (
                        <input
                          type="text"
                          name="scholarshipRewarded"
                          value={editedStory.scholarshipRewarded}
                          onChange={handleChange}
                          className="form-control form-control-sm"
                        />
                      ) : story.scholarshipRewarded ? (
                        <span className="badge bg-info text-dark">
                          {story.scholarshipRewarded}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td
                      className="text-truncate"
                      style={{ maxWidth: "200px" }}
                      title={story.description}
                    >
                      {editStoryId === story._id ? (
                        <textarea
                          name="description"
                          value={editedStory.description}
                          onChange={handleChange}
                          rows={2}
                          className="form-control form-control-sm"
                        />
                      ) : (
                        story.description
                      )}
                    </td>

                    <td>{new Date(story.createdAt).toLocaleDateString()}</td>

                    <td>
                      <div className="btn-group">
                        {editStoryId === story._id ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => handleSaveStory(story._id)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={handleCancelStoryEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEditStory(story)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteStory(story._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
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

export default StoryTable;
