import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStory, fetchStories } from "../Slices/storySlice";
import { createHistory } from "../Slices/familyHistorySlice";
import { createProduct, fetchProducts } from "../Slices/productSlice";
import SingleStoryCard from "../pages/postStories/SingelCard";
import StoryTable from "../components/StoryTable";
import { toast } from "react-toastify";

const QuickActions = () => {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.successtory);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");

  const [storyData, setStoryData] = useState({
    title: "",
    description: "",
    scholarshipRewarded: "",
  });

  const [storyImage, setStoryImage] = useState(null);

  const [familyData, setFamilyData] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    dateOfDeath: "",
    relation: "",
    bio: "",
    image: "",
    status: "",
    parent: user?.id || "",
  });

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [productImage, setProductImage] = useState(null);

  const handleOpenModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStoryData({
      title: "",
      description: "",
      scholarshipRewarded: "",
      image: "",
    });
    setStoryImage(null);
    setFamilyData({
      name: "",
      gender: "",
      dateOfBirth: "",
      dateOfDeath: "",
      relation: "",
      bio: "",
      image: "",
      status: "",
      parent: user?.id || null,
    });
    setProductData({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
    setProductImage(null);
  };

  const handleStoryChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setStoryImage(files[0]);
    } else {
      setStoryData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFamilyChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFamilyData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFamilyData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setProductImage(files[0]);
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (actionType === "product") {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("category", productData.category);
      if (productImage) {
        formData.append("image", productImage);
      }

      try {
        await dispatch(createProduct(formData)).unwrap();
        dispatch(fetchProducts()); // Refresh product list
        toast.success("🛍️ Product added successfully!");
      } catch (error) {
        toast.error("Failed to add product: " + error.message);
      }
    } else if (actionType === "story") {
      const formData = new FormData();
      formData.append("title", storyData.title);
      formData.append("description", storyData.description);
      formData.append("scholarshipRewarded", storyData.scholarshipRewarded);
      if (storyImage) {
        formData.append("image", storyImage);
      }
      try {
        await dispatch(createStory(formData)).unwrap();
        dispatch(fetchStories());
        toast.success("🛍️ Story added successfully!");
      } catch (error) {
        toast.error("Failed to add story: " + error.message);
      }
    } else if (actionType === "history") {
      const payload = {
        ...familyData,
        dateOfBirth: parseInt(familyData.dateOfBirth),
        dateOfDeath: familyData.dateOfDeath
          ? parseInt(familyData.dateOfDeath)
          : undefined,
        parent: familyData.parent || null,
      };
      dispatch(createHistory(payload));
      toast.success("👨‍👩‍👧 Family history submitted successfully!");
    }

    handleCloseModal();
  };

  return (
    <>
      <div
        className={`card shadow-lg mb-4 p-4 text-center bg-light ${
          showModal ? "blurred" : ""
        }`}
      >
        <h5 className="mb-3">Quick Actions</h5>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2 px-5 py-4"
            onClick={() => handleOpenModal("story")}
          >
            <i className="bi bi-megaphone-fill"></i> Add Success Story
          </button>
          <button
            className="btn btn-outline-warning d-flex align-items-center gap-2 px-5 py-4"
            onClick={() => handleOpenModal("history")}
          >
            <i className="bi bi-journal-bookmark-fill"></i> Add Family Member
          </button>
          <button
            className="btn btn-outline-success d-flex align-items-center gap-2 px-5 py-4"
            onClick={() => handleOpenModal("product")}
          >
            <i className="bi bi-box-seam"></i> Add Product
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1050,
          }}
        >
          <div
            className="card shadow p-4"
            style={{
              width: "90%",
              maxWidth: "800px",
              borderRadius: "1rem",
              background: "#fff",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h5 className="mb-4 text-center">
              {actionType === "story"
                ? "Post Success Story"
                : actionType === "history"
                ? "Post Family History"
                : "Post Product"}
            </h5>

            <form onSubmit={handleSubmit}>
              {actionType === "story" ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Story Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="form-control"
                      onChange={handleStoryChange}
                      required
                    />
                    {productImage && (
                      <img
                        src={URL.createObjectURL(productImage)}
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginTop: "10px",
                        }}
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={storyData.title}
                      onChange={handleStoryChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={storyData.description}
                      onChange={handleStoryChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Scholarship Rewarded</label>
                    <textarea
                      name="scholarshipRewarded"
                      className="form-control"
                      rows="2"
                      value={storyData.scholarshipRewarded}
                      onChange={handleStoryChange}
                      required
                    />
                  </div>
                </>
              ) : actionType === "history" ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={familyData.name}
                      onChange={handleFamilyChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      name="gender"
                      value={familyData.gender}
                      onChange={handleFamilyChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label className="form-label">Date of Birth (Year)</label>
                      <input
                        type="number"
                        name="dateOfBirth"
                        className="form-control"
                        value={familyData.dateOfBirth}
                        onChange={handleFamilyChange}
                        required
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">Date of Death (Year)</label>
                      <input
                        type="number"
                        name="dateOfDeath"
                        className="form-control"
                        value={familyData.dateOfDeath}
                        onChange={handleFamilyChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Relation</label>
                    <input
                      type="text"
                      name="relation"
                      className="form-control"
                      value={familyData.relation}
                      onChange={handleFamilyChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea
                      name="bio"
                      className="form-control"
                      rows="3"
                      value={familyData.bio}
                      onChange={handleFamilyChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-select"
                      value={familyData.status}
                      onChange={handleFamilyChange}
                      required
                    >
                      <option value="">Select status</option>
                      <option value="alive">Alive</option>
                      <option value="death">Death</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label">Product Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="form-control"
                      onChange={handleProductChange}
                      required
                    />
                    {productImage && (
                      <img
                        src={URL.createObjectURL(productImage)}
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginTop: "10px",
                        }}
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={productData.title}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={productData.price}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={productData.description}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      value={productData.category}
                      onChange={handleProductChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;
