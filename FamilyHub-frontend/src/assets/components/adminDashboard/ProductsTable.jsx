import React from "react";
import { Button, Form, Table, Image } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductsTable = ({
  products,
  editProductId,
  editedProduct,
  setEditedProduct,
  setEditProductId,
  handleSaveProduct,
  handleCancelProductEdit,
  handleDeleteProduct,
  handleEditProduct,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProduct((prev) => ({
        ...prev,
        imageFile: file, // file for backend
        image: URL.createObjectURL(file), // preview
      }));
    }
  };

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <Table striped bordered hover className="shadow-sm text-center">
          <thead className="table-primary">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price (PKR)</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.length === 0 ? (
              <tr>
                <td colSpan="6">No products found.</td>
              </tr>
            ) : (
              products?.map((product) => (
                <tr key={product._id}>
                  <td>
                    {editProductId === product._id ? (
                      <>
                        <Form.Control
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {editedProduct.image && (
                          <Image
                            src={editedProduct.image}
                            alt="Preview"
                            thumbnail
                            width="60"
                            height="60"
                            className="mt-1"
                          />
                        )}
                      </>
                    ) : product.imageUrl ? (
                      <img
                        src={`http://localhost:3000${product.imageUrl}`}
                        alt={product.title || "Product"}
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
                    {editProductId === product._id ? (
                      <Form.Control
                        type="text"
                        name="title"
                        value={editedProduct.title || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.title || "-"
                    )}
                  </td>
                  <td>
                    {editProductId === product._id ? (
                      <Form.Control
                        type="text"
                        name="price"
                        value={editedProduct.price || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.price || "-"
                    )}
                  </td>
                  <td>
                    {editProductId === product._id ? (
                      <Form.Control
                        type="text"
                        name="description"
                        value={editedProduct.description || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.description || "-"
                    )}
                  </td>
                  <td>
                    {editProductId === product._id ? (
                      <Form.Control
                        type="text"
                        name="category"
                        value={editedProduct.category || ""}
                        onChange={(e) =>
                          setEditedProduct({
                            ...editedProduct,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.category || "-"
                    )}
                  </td>
                  <td>
                    {editProductId === product._id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-1"
                          onClick={() => handleSaveProduct(product._id)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCancelProductEdit}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsTable;
