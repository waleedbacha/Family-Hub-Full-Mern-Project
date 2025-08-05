import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleStoryCard from "../postStories/SingelCard";
import { fetchStories } from "../../Slices/storySlice";
// import CustomModal from "./CustomModal";

const StoryCard = () => {
  const dispatch = useDispatch();
  const { stories, loading } = useSelector((state) => state.successtory);

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  if (loading) {
    return <h5>Loading...</h5>;
  }

  return (
    <div className="container">
      <div className="row">
        {stories &&
          stories.map((ele) => (
            <div className="col-md-6 col-lg-4 mb-4" key={ele._id}>
              <SingleStoryCard stories={ele} />
            </div>
          ))}
      </div>
    </div>
    // <div className="container">
    //   {/* <CustomModal /> */}
    //   <div className="row">
    //     {story &&
    //       story.map((ele) => (
    //         <div className="col-md-6 col-lg-4 mb-4" key={ele.id}>
    //           <div
    //             className="card shadow p-3"
    //             style={{
    //               background: "linear-gradient(135deg, #e6e6fa, #fffacd)",
    //               borderRadius: "1rem",
    //             }}
    //           >
    //             <div className="d-flex">
    //               {/* Image on the left */}
    //               <img
    //                 src={
    //                   ele.imageURL?.startsWith("http")
    //                     ? ele.imageURL
    //                     : "https://picsum.photos/120"
    //                 }
    //                 alt={ele.name || "No Name"}
    //                 style={{
    //                   width: "100px",
    //                   height: "100px",
    //                   objectFit: "cover",
    //                   borderRadius: "0.5rem",
    //                   marginRight: "1rem",
    //                   border: "3px solid #fff",
    //                 }}
    //               />

    //               {/* Text content on the right */}
    //               <div className="flex-grow-1">
    //                 <h5 className="fw-bold mb-1">{ele.name}</h5>
    //                 <p className="mb-2" style={{ fontSize: "14px" }}>
    //                   {ele.description}
    //                 </p>
    //                 <p
    //                   className="text-muted mb-2"
    //                   style={{ fontSize: "12px" }}
    //                 >
    //                   {ele.createdAt}
    //                 </p>

    //                 {/* Action Buttons */}
    //                 <div className="d-flex gap-2">
    //                   <button className="btn btn-sm btn-primary">Read</button>
    //                   <button className="btn btn-sm btn-primary">Edit</button>
    //                   {/* <button className="btn btn-sm btn-secondary">Edit</button> */}
    //                   <button
    //                     className="btn btn-sm btn-danger"
    //                     onClick={() => dispatch(deleteStory(ele.id))}
    //                   >
    //                     Delete
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //   </div>
    // </div>
  );
};

export default StoryCard;
