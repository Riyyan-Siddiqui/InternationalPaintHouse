import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/ShopPage.css";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState(75000);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productsRes,
          categoriesRes,
          colorsRes,
          sizesRes,
          latestProductsRes,
        ] = await Promise.all([
          fetch("/api/v1/getAllProducts"),
          fetch("/api/v1/get_all_product_categories"),
          // fetch("/api/v1/colors"),
          // fetch("/api/v1/sizes"),
          // fetch("/api/v1/latestProducts"),
        ]);

        if (
          !productsRes.ok ||
          !categoriesRes.ok /*|| !colorsRes.ok || !sizesRes.ok || !latestProductsRes.ok*/
        ) {
          throw new Error("Failed to fetch data");
        }

        const [
          productsData,
          categoriesData,
          colorsData,
          sizesData,
          latestProductsData,
        ] = await Promise.all([
          productsRes.json(),
          categoriesRes.json(),
          // colorsRes.json(),
          // sizesRes.json(),
          // latestProductsRes.json(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
        // setColors(colorsData);
        // setSizes(sizesData);
        // setLatestProducts(latestProductsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePriceRangeChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // Implement sorting logic here
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.price <= priceRange &&
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shoppage">
      <div id="title-container">
        <h1>Shop</h1>
      </div>

      <section id="product-listing">
        <aside>
          <div className="sidebar-1">
            <h2>CATEGORIES</h2>
            <ul>
              {categories.map((category) => (
                <li key={category.category_id}>
                  <Link to={`/category/${category.category_id}`}>
                    {category.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <hr />

          <div className="sidebar-2 sidebar">
            <h2>FILTER BY PRICE</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                id="priceRange"
                name="priceRange"
                type="range"
                min="0"
                max="75000"
                step="50"
                value={priceRange}
                onChange={handlePriceRangeChange}
              />
              <div className="price-container">
                <p>
                  Price: <span className="font-bold">Rs</span>0 -{" "}
                  <span className="font-bold">Rs</span>
                  {priceRange}
                </p>
                <button type="submit">FILTER</button>
              </div>
            </form>
          </div>

          <hr />

          <div className="sidebar-3 sidebar">
            <h2>FILTER BY COLOR</h2>
            <div className="color-list-container scrollable-content">
              <ul>
                {colors.map((color) => (
                  <li key={color.id} className="color-list">
                    <div
                      className="color-shade"
                      style={{ backgroundColor: color.hexCode }}
                    ></div>
                    <div className="color-name">{color.name}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div className="sidebar-4 sidebar">
            <h2>FILTER BY SIZE</h2>
            <div className="size-list-container scrollable-content">
              <ul>
                {sizes.map((size) => (
                  <li key={size.id} className="size-list">
                    <p>{size.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div className="sidebar-5 sidebar">
            <h2>LATEST PRODUCTS</h2>
            <div className="latest-products-list">
              <ul>
                {latestProducts.map((product) => (
                  <li key={product.product_id}>
                    <Link to={`/shop/product/${product.product_id}`}>
                      <img src={product.image_url} alt={product.product_name} />
                      <h5>{product.product_name}</h5>
                      <p>
                        <span className="font-bold">Rs</span>
                        {product.price}
                      </p>
                      <button className="select-option">SELECT OPTIONS</button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="right-container">
          <div className="address_strip">
            <p>
              <Link to="/">Home</Link> / Shop
            </p>
            <div className="search-and-sort">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <label htmlFor="sorting">Sort by:</label>
              <select
                name="sorting"
                id="sorting"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="">Default sorting</option>
                <option value="popularity">Sort by popularity</option>
                <option value="rating">Sort by average rating</option>
                <option value="latest">Sort by latest</option>
                <option value="priceLow">Sort by price: low to high</option>
                <option value="priceHigh">Sort by price: high to low</option>
              </select>
            </div>
          </div>
          <div className="products">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : (
              <ul className="listing">
                {filteredProducts.map((product) => (
                  <li key={product.product_id} className="product-1 product">
                    <Link to={`/shop/getProductById/${product.product_id}`}>
                      <img src={product.image_url} alt={product.product_name} />
                      <h5>{product.product_name}</h5>
                      <p>
                        <span className="font-bold">Rs</span>
                        {product.price}
                      </p>
                      <button className="select-option">SELECT OPTIONS</button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;

