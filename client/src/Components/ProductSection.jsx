import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ProductSection = ({ showNotification }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    description: "",
    price: "",
    stock_quantity: "",
    status: true,
    category_id: "",
    brand_id: "",
    admin_id: "",
    image_url: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    } else {
      fetchProducts();
    }
  }, [id]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/v1/getAllProducts");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification(
        "Failed to fetch products. Please try again later.",
        "error"
      );
    }
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`/api/v1/getProductById/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const product = await response.json();
      setProducts([product]);
    } catch (error) {
      console.error("Error fetching product:", error);
      showNotification(
        "Failed to fetch product. Please try again later.",
        "error"
      );
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(newProduct.price);
    const parsedStock = parseInt(newProduct.stock_quantity, 10);

    if (!newProduct.product_name || isNaN(parsedPrice) || isNaN(parsedStock)) {
      return showNotification(
        "Please fill all required fields correctly.",
        "error"
      );
    }

    try {
      const response = await fetch("/api/v1/createProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          price: parsedPrice,
          stock_quantity: parsedStock,
        }),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct.product]);
        setNewProduct({
          product_name: "",
          description: "",
          price: "",
          stock_quantity: "",
          status: true,
          category_id: "",
          brand_id: "",
          admin_id: "",
          image_url: "",
        });
        showNotification(
          `${addedProduct.product.product_name} has been added successfully.`,
          "success"
        );
      } else {
        const errorData = await response.json();
        showNotification(
          errorData.message || "Failed to add product.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error adding product:", error);
      showNotification(
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/v1/deleteProduct/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((product) => product.product_id !== productId));
        showNotification("Product deleted successfully.", "info");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Failed to delete product. Please try again.", "error");
    }
  };

  const startEditing = (product) => {
    setEditingProduct({ ...product });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(editingProduct.price);
    const parsedStock = parseInt(editingProduct.stock_quantity, 10);

    if (!editingProduct.product_name || isNaN(parsedPrice) || isNaN(parsedStock)) {
      return showNotification(
        "Please fill all required fields correctly.",
        "error"
      );
    }

    try {
      const response = await fetch(`/api/v1/updateProduct/${editingProduct.product_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingProduct,
          price: parsedPrice,
          stock_quantity: parsedStock,
        }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(p => p.product_id === updatedProduct.product_id ? updatedProduct : p));
        setEditingProduct(null);
        showNotification(
          `${updatedProduct.product_name} has been updated successfully.`,
          "success"
        );
      } else {
        const errorData = await response.json();
        showNotification(
          errorData.message || "Failed to update product.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showNotification(
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">Products</h3>
      <form onSubmit={addProduct} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newProduct.product_name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, product_name: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.stock_quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock_quantity: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Category ID"
            value={newProduct.category_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category_id: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Brand ID"
            value={newProduct.brand_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand_id: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Admin ID"
            value={newProduct.admin_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, admin_id: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={newProduct.image_url}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image_url: e.target.value })
            }
            required
            className="border p-2 rounded"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="status"
              checked={newProduct.status}
              onChange={(e) =>
                setNewProduct({ ...newProduct, status: e.target.checked })
              }
              className="mr-2"
            />
            <label htmlFor="status">Active</label>
          </div>
        </div>
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          required
          className="border p-2 rounded w-full"
          rows="3"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Add Product
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Image</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Stock</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Category ID</th>
              <th className="text-left p-2">Brand ID</th>
              <th className="text-left p-2">Admin ID</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id} className="border-b">
                {editingProduct && editingProduct.product_id === product.product_id ? (
                  <td colSpan="10" className="p-2">
                    <form onSubmit={updateProduct} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          value={editingProduct.product_name}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, product_name: e.target.value })
                          }
                          required
                          className="border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          value={editingProduct.price}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, price: e.target.value })
                          }
                          required
                          className="border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Stock Quantity"
                          value={editingProduct.stock_quantity}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, stock_quantity: e.target.value })
                          }
                          required
                          className="border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Category ID"
                          value={editingProduct.category_id}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, category_id: e.target.value })
                          }
                          required
                          className="border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Brand ID"
                          value={editingProduct.brand_id}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, brand_id: e.target.value })
                          }
                          required
                          className="border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Admin ID"
                          value={editingProduct.admin_id}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, admin_id: e.target.value })
                          }
                          required
                          className="border p-2 rounded"
                        />
                        <input
                          type="url"
                          placeholder="Image URL"
                          value={editingProduct.image_url}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, image_url: e.target.value })
                          }
                          required
                          className="border p-2 rounded"
                        />
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="editStatus"
                            checked={editingProduct.status}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, status: e.target.checked })
                            }
                            className="mr-2"
                          />
                          <label htmlFor="editStatus">Active</label>
                        </div>
                      </div>
                      <textarea
                        placeholder="Description"
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, description: e.target.value })
                        }
                        required
                        className="border p-2 rounded w-full"
                        rows="3"
                      ></textarea>
                      <div className="flex justify-end space-x-2">
                        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
                          Save
                        </button>
                        <button type="button" onClick={cancelEditing} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="p-2">
                      <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2">{product.product_name}</td>
                    <td className="p-2">{product.description.substring(0, 50)}...</td>
                    <td className="p-2">${product.price}</td>
                    <td className="p-2">{product.stock_quantity}</td>
                    <td className="p-2">{product.status ? "Active" : "Inactive"}</td>
                    <td className="p-2">{product.category_id}</td>
                    <td className="p-2">{product.brand_id}</td>
                    <td className="p-2">{product.admin_id}</td>
                    <td className="p-2">
                      <button
                        onClick={() => startEditing(product)}
                        className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition-colors mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.product_id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/products/${product.product_id}`)}
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSection;