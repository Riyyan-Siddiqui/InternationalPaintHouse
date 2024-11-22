import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure you install Axios: npm install axios
import "../Styles/ShopPage.css"; // Import your CSS styles here

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("/api/v1/getAllProducts") // Replace with your backend endpoint
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  return (
    <body className="shoppage">
      <div id="title-container">
        <h1>Shop</h1>
      </div>

      <section id="product-listing">
        <aside>{/* Sidebar content remains unchanged */}</aside>

        <div className="right-container">
          <div className="address_strip">
            <p>
              <span>Home /</span> Shop{" "}
            </p>
            <label htmlFor="sorting"></label>
            <select name="sorting" id="sorting">
              <option value="" selected>
                Default sorting
              </option>
              <option value="">Sort by popularity</option>
              <option value="">Sort by average rating</option>
              <option value="">Sort by latest</option>
              <option value="">Sort by price: low to high</option>
              <option value="">Sort by price: high to low</option>
            </select>
          </div>

          <div className="products">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <ul className="listing">
                {products.map((product) => (
                  <li key={product.id} className="product-1 product">
                    <a href={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} />
                      <h5>{product.name}</h5>
                      <p>
                        <span className="bold">Rs</span>
                        {product.priceRange.min} -{" "}
                        <span className="bold">Rs</span>
                        {product.priceRange.max}
                      </p>
                      <button className="select-option">SELECT OPTIONS</button>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </body>
  );
};

export default ShopPage;
