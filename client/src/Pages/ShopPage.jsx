import React from "react";
import "./ShopPage.css"; // Import your CSS styles here

const ShopPage = () => {
  return (
    <>
      <div id="title-container">
        <h1>Shop</h1>
      </div>

      <section id="product-listing">
        <aside>
          <div className="sidebar-1">
            <h2>CATEGORIES</h2>
            <ul>
              <li>
                <a href="#">Interior Paints</a>
              </li>
              <li>
                <a href="#">Exterior Paints</a>
              </li>
              <li>
                <a href="#">Woodcare Coatings</a>
              </li>
              <li>
                <a href="#">Waterproofing / Admixtures</a>
              </li>
              <li>
                <a href="#">Dry Colour</a>
              </li>
              <li>
                <a href="#">Aerosol Sprays</a>
              </li>
              <li>
                <a href="#">Texture / Special Effect</a>
              </li>
              <li>
                <a href="#">Paint Brushes / Rollers</a>
              </li>
              <li>
                <a href="#">Painting Tools & Accessories</a>
              </li>
              <li>
                <a href="#">Industrial & Marine Paint</a>
              </li>
            </ul>
          </div>
          <br />
          <br />
          <hr />
          <div className="sidebar-2 sidebar">
            <h2>FILTER BY PRICE</h2>
            <br />
            <form>
              <input
                id="points"
                name="points"
                type="range"
                min="0"
                max="75000"
                step="50"
              />
              <div className="price-container">
                <p>
                  Price: <span style={{ fontWeight: "bolder" }}>Rs</span>0 -{" "}
                  <span style={{ fontWeight: "bolder" }}>Rs</span>75770
                </p>
                <button type="submit">FILTER</button>
              </div>
            </form>
          </div>
          <hr />
          <div className="sidebar-3 sidebar">
            <h2>FILTER BY COLOR</h2>
            <br />
            <div className="color-list-container scrollable-content">
              <ul>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <li key={index} className="color-list">
                      <div
                        className="color-shade"
                        style={{ backgroundColor: "greenyellow" }}
                      ></div>
                      <div className="color-name">Olive Green - 569</div>
                      <div className="count">1</div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <hr />
          <div className="sidebar-4 sidebar ">
            <h2>FILTER BY SIZE</h2>
            <br />
            <div className="size-list-container scrollable-content">
              <ul>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <li key={index} className="size-list">
                      <p>400 gram</p>
                      <div className="count">1</div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <br />
          <hr />
          <div className="sidebar-5 sidebar">
            <h2>LATEST PRODUCTS</h2>
            <div className="latest-products-list">
              <ul>
                {Array(3)
                  .fill()
                  .map((_, index) => (
                    <li key={index}>
                      <a href="#">
                        <img
                          src="https://www.paintlo.com/wp-content/uploads/2020/06/berger-weather-pro-emulsion-300x300.png"
                          alt="Product"
                        />
                        <div className="nameANDprice">
                          <p>Genc Wood Sealer NC VN125.77</p>
                          <p className="latest-product-price">
                            RS4900.00 - RS40,000.00
                          </p>
                        </div>
                      </a>
                      <hr />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </aside>
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
            <ul>
              {Array(3)
                .fill()
                .map((_, index) => (
                  <li key={index} className="product-1 product">
                    <a href="#">
                      <img
                        src="https://www.paintlo.com/wp-content/uploads/2021/04/Berger-Nu-Emulsion.jpg"
                        alt="Product"
                      />
                      <h5>Berger NU Emulsion (Distemper)</h5>
                      <p>
                        <span className="bold">Rs</span>1500.00 -{" "}
                        <span className="bold">Rs</span>5,500.00
                      </p>
                      <button className="select-option">SELECT OPTIONS</button>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
