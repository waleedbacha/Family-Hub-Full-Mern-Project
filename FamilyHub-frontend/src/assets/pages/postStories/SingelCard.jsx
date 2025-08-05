import { useDispatch } from "react-redux";
import { deleteStory } from "../../Slices/storySlice";

const SingleStoryCard = ({ stories }) => {
  const dispatch = useDispatch();

  //   if (!story) return null; // protect against undefined

  return (
    <div
      className="card shadow-sm p-3 mb-3"
      style={{
        background: "linear-gradient(135deg, #e6e6fa, #fffacd)",
        borderRadius: "1rem",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div className="d-flex">
        <img
          src={
            stories.image
              ? `http://localhost:3000/api/uploads/${stories.image}`
              : "https://picsum.photos/120"
          }
          alt="Story"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "0.5rem",
            marginRight: "1rem",
            border: "3px solid #fff",
          }}
        />

        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">{stories.title}</h5>
            {stories.scholarshipRewarded && (
              <span className="badge bg-info text-dark">
                {stories.scholarshipRewarded}
              </span>
            )}
          </div>

          <p className="mb-1 text-muted" style={{ fontSize: "13px" }}>
            {new Date(stories.createdAt).toLocaleDateString()}
          </p>

          <p
            className="mb-2 text-truncate"
            style={{ maxWidth: "100%", fontSize: "14px" }}
            title={stories.description}
          >
            {stories.description}
          </p>

          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-primary">Read</button>
            <button className="btn btn-sm btn-outline-secondary">Edit</button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => dispatch(deleteStory(stories.id))}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStoryCard;
