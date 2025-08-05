import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Slices/productSlice";
import { FaBoxOpen, FaTags, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Button, Spinner, Badge } from "react-bootstrap";
// import NavBar from "../components/wepages/NavBar";

const Store = () => {
  const dispatch = useDispatch();
  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.products || {});

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* <NavBar /> */}
      <div className="container my-5 mt-5">
        {/* Intro Section */}
        <div
          className="text-center p-5 rounded-3 mb-4"
          style={{
            background: "linear-gradient(135deg, #274c77, #5e12c2ff)",
            color: "white",
          }}
        >
          <FaBoxOpen size={50} className="mb-3" />
          <h1 className="fw-bold">Family Marketplace</h1>
          <p className="lead">
            Discover beautifully curated products crafted with love for your
            family.
          </p>
        </div>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {uniqueCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <Badge bg="primary" className="ms-auto">
              {filteredProducts.length} Products Found
            </Badge>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {/* Error */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Products Grid */}
        <div className="row g-4">
          {currentProducts.length === 0 && !loading && (
            <div className="text-center col-12">
              <h5>No products found.</h5>
            </div>
          )}

          {currentProducts.map((product) => (
            <div className="col-md-6 col-lg-4" key={product._id}>
              <div
                className="card h-100 border-0 shadow-sm product-card"
                style={{ transition: "transform 0.2s ease" }}
              >
                {product.imageUrl ? (
                  <img
                    src={`http://localhost:3000${product.imageUrl}`}
                    className="card-img-top"
                    alt={product.title}
                    style={{ objectFit: "cover", height: "220px" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light"
                    style={{ height: "220px" }}
                  >
                    <FaBoxOpen size={40} className="text-muted" />
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold text-dark">
                    {product.title}
                  </h5>
                  <p className="card-text mb-1">
                    <FaTags className="me-1 text-secondary" />
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Price:</strong> Rs {product.price}
                  </p>
                  <p className="card-text small text-muted">
                    {product.description?.slice(0, 70)}...
                  </p>
                  <div className="mt-auto">
                    <Button variant="primary" className="w-100">
                      <FaShoppingCart className="me-2" />
                      Coming soon
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      page === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Store;
