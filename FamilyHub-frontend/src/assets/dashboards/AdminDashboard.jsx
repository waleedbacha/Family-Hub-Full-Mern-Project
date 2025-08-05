import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import NavBar from "../components/wepages/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, updateUser } from "../Slices/userSlice";
import { fetchScholarships } from "../Slices/scholarshipSlice";
import { deleteDonation, fetchDonations } from "../Slices/donationSlice";
import { fetchStories, deleteStory } from "../Slices/storySlice";
import {
  deleteHistory,
  fetchHistories,
  updateHistory,
} from "../Slices/familyHistorySlice";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../Slices/productSlice";
import { toast } from "react-toastify";
import QuickActions from "../dashboards/QuickAction";
import UsersTable from "../components/adminDashboard/UsersTable";
import DonationsTable from "../components/adminDashboard/DonationsTable";
import ScholarshipsTable from "../components/adminDashboard/ScholarshipsTable";
import FamilyHistoryTable from "../components/adminDashboard/FamliyHistoryTable";
import StoriesTable from "../components/StoryTable";
import ProductsTable from "../components/adminDashboard/ProductsTable";
import AdminMenu from "../components/adminDashboard/AdminMenu";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("quickActions");

  const {
    users = [],
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);
  const {
    donations = [],
    loading: donationsLoading,
    error: donationsError,
  } = useSelector((state) => state.donations);
  const {
    scholarships = [],
    loading: scholarshipLoading,
    error: scholarshipError,
  } = useSelector((state) => state.scholarships);
  const {
    stories = [],
    loading: storiesLoading,
    error: storiesError,
  } = useSelector((state) => state.successtory);
  const {
    histories = [],
    loading: historyLoading,
    error: historyError,
  } = useSelector((state) => state.familyHistory);
  const {
    products = [],
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  const totalDonations = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  // STATES
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [editHistoryId, setEditHistoryId] = useState(null);
  const [editedHistory, setEditedHistory] = useState({});
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDonations());
    dispatch(fetchScholarships());
    dispatch(fetchStories());
    dispatch(fetchHistories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // USER ACTIONS
  const handleEditUser = (user) => {
    setEditUserId(user._id);
    setEditedUser({ name: user.name, email: user.email, role: user.role });
  };

  const handleSaveUser = async (id) => {
    await dispatch(updateUser({ id, data: editedUser }));
    await dispatch(fetchUsers());
    toast.success("User updated successfully!");
    setEditUserId(null);
    setEditedUser({ name: "", email: "", role: "" });
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditedUser({});
  };

  const handleDeleteUser = (id) => {
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
        dispatch(deleteUser(id));
        MySwal.fire("Deleted!", "The User has been deleted.", "success");
      }
    });
  };

  // DONATION ACTION
  const handleDeleteDonation = (id) => {
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
        dispatch(deleteDonation(id));
        MySwal.fire("Deleted!", "The donation has been deleted.", "success");
      }
    });
  };

  // FAMILY HISTORY ACTIONS
  const handleEditHistory = (history) => {
    setEditHistoryId(history._id);
    setEditedHistory({
      name: history.name,
      gender: history.gender,
      dateOfBirth: history.dateOfBirth,
      dateOfDeath: history.dateOfDeath,
      relation: history.relation,
      bio: history.bio,
      status: history.status,
      parent: history.parent,
    });
  };

  const handleSaveHistory = async (id) => {
    await dispatch(updateHistory({ id, updatedData: editedHistory }));
    await dispatch(fetchHistories());
    toast.success("History updated successfully!");
    setEditHistoryId(null);
    setEditedHistory({
      name: "",
      gender: "",
      dateOfBirth: "",
      dateOfDeath: "",
      relation: "",
      bio: "",
      status: "",
      parent: "",
    });
  };

  const handleCancelHistoryEdit = () => {
    setEditHistoryId(null);
    setEditedHistory({});
  };

  const handleDeleteHistory = (id) => {
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
        dispatch(deleteHistory(id));
        MySwal.fire("Deleted!", "The history has been deleted.", "success");
      }
    });
  };

  // STORY ACTION
  // const handleDeleteStory = (id) => {
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deleteStory(id));
  //       MySwal.fire("Deleted!", "The story has been deleted.", "success");
  //     }
  //   });
  // };

  // PRODUCT ACTIONS
  const handleEditProduct = (product) => {
    setEditProductId(product._id);
    setEditedProduct({
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  };

  const handleSaveProduct = async (id) => {
    await dispatch(updateProduct({ id, updatedData: editedProduct }));
    await dispatch(fetchProducts());
    toast.success("Product updated successfully!");
    setEditProductId(null);
    setEditedProduct({
      title: "",
      category: "",
      description: "",
      price: "",
      image: "",
    });
  };

  const handleCancelProductEdit = () => {
    setEditProductId(null);
    setEditedProduct({});
  };

  const handleDeleteProduct = (id) => {
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
        dispatch(deleteProduct(id));
        MySwal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      {/* <NavBar bg="#3b4a59" /> */}
      <div style={{ minHeight: "100vh", background: "#f0f4f8" }}>
        <Container fluid>
          <Row>
            <Button
              variant="dark"
              className="d-md-none mb-3 ms-3"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ position: "fixed", top: "60px", zIndex: 1030 }}
            >
              <i className="bi bi-list fs-4"></i>
            </Button>

            <AdminMenu setActiveSection={setActiveSection} />

            <Col md={10} className="offset-md-2 pt-5 px-4">
              <CSSTransition
                in={true}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <div className="mt-4">
                  <h3 className="text-dark text-center mb-4">
                    {activeSection === "quickActions"
                      ? ""
                      : activeSection.charAt(0).toUpperCase() +
                        activeSection.slice(1)}
                  </h3>
                  <Card
                    className="shadow-lg p-4 mb-5"
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #3498db)",
                      borderRadius: "15px",
                    }}
                  >
                    {/* Section Components */}
                    {activeSection === "quickActions" && <QuickActions />}
                    {activeSection === "users" && (
                      <UsersTable
                        users={users}
                        usersLoading={usersLoading}
                        usersError={usersError}
                        editUserId={editUserId}
                        editedUser={editedUser}
                        setEditedUser={setEditedUser}
                        setEditUserId={setEditUserId}
                        handleEditUser={handleEditUser}
                        handleSaveUser={handleSaveUser}
                        handleCancelEdit={handleCancelEdit}
                        handleDeleteUser={handleDeleteUser}
                      />
                    )}
                    {activeSection === "donations" && (
                      <DonationsTable
                        donations={donations}
                        handleDeleteDonation={handleDeleteDonation}
                      />
                    )}
                    {activeSection === "scholarships" && (
                      <ScholarshipsTable
                        scholarships={scholarships}
                        scholarshipLoading={scholarshipLoading}
                        scholarshipError={scholarshipError}
                      />
                    )}
                    {activeSection === "familyHistory" && (
                      <FamilyHistoryTable
                        histories={histories}
                        historyLoading={historyLoading}
                        historyError={historyError}
                        editHistoryId={editHistoryId}
                        editedHistory={editedHistory}
                        setEditedHistory={setEditedHistory}
                        setEditHistoryId={setEditHistoryId}
                        handleEditHistory={handleEditHistory}
                        handleSaveHistory={handleSaveHistory}
                        handleCancelHistoryEdit={handleCancelHistoryEdit}
                        handleDeleteHistory={handleDeleteHistory}
                      />
                    )}
                    {activeSection === "stories" && (
                      <StoriesTable stories={stories} />
                    )}
                    {activeSection === "products" && (
                      <ProductsTable
                        products={products}
                        editProductId={editProductId}
                        editedProduct={editedProduct}
                        setEditedProduct={setEditedProduct}
                        setEditProductId={setEditProductId}
                        handleEditProduct={handleEditProduct}
                        handleSaveProduct={handleSaveProduct}
                        handleCancelProductEdit={handleCancelProductEdit}
                        handleDeleteProduct={handleDeleteProduct}
                      />
                    )}
                  </Card>
                </div>
              </CSSTransition>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboard;
