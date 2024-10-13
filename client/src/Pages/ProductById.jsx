// ProductPage.jsx
import React, { useState } from "react";
import "./ProductById.css"; // Import your CSS file if needed

const ProductPage = () => {
  const [counter, setCounter] = useState(1);
  const [size, setSize] = useState("Choose an option");

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter > 1 ? counter - 1 : 1);
  const handleSizeChange = (e) => setSize(e.target.value);

  return (
    <div>
      <section className="product-detail">
        <div className="product-img-container">
          <img
            src="https://www.paintlo.com/wp-content/uploads/2021/04/Berger-Nu-Emulsion.jpg"
            alt="Berger NU Emulsion"
          />
        </div>
        <div className="product-text-container">
          <p className="breadcrumbs">
            Home / Interior Paints / Berger NU Emulsion (Distemper)
          </p>
          <div className="product-intro">
            <h2>Berger NU Emulsion (Distemper)</h2>
            <p className="price">₨1,500.00</p>
            <p className="disclaimer">Disclaimer:</p>
            <p className="disclaimer">
              The colors that you see on the website will vary from the actual
              colors. This is because a color is shown different on each screen
              and varies a lot by what kind of a screen you are viewing it on.
              To counter this, we will send a representative over with a shade
              card once an order is made. You can then verify the shade at your
              homestep and approve it by taking a look at the shade card. Once
              the shade has been approved, we will proceed with your order.
            </p>
            <div className="product-size">
              <p>Size:</p>
              <select
                name="size"
                id="size"
                value={size}
                onChange={handleSizeChange}
              >
                <option value="Choose an option">Choose an option</option>
                <option value="Gallon">Gallon</option>
                <option value="Drum">Drum</option>
              </select>
              <p className="clear">
                <i className="fa-solid fa-xmark"></i> Clear
              </p>
            </div>
            <p className="label">Write shade name or number</p>
            <input
              type="text"
              placeholder="Write shade name or number from shade card"
            />
            <div className="add-to-cart">
              <div className="counter-container">
                <button className="minus b1" onClick={decrement}>
                  -
                </button>
                <p className="counter">{counter}</p>
                <button className="add b2" onClick={increment}>
                  +
                </button>
              </div>
              <button className="add-to-cart-btn">ADD TO CART</button>
            </div>
            <hr />
            <div className="tags">
              <p>
                <span>SKU:</span> BIP16
              </p>
              <p>
                <span>Categories:</span>
                <a href="">Berger</a>, <a href="">Interior Paints</a>
              </p>
              <p>
                <span>Tag:</span> <a href="">Berger</a>
              </p>
              <p>
                <span>Share:</span> BIP16
              </p>
            </div>
          </div>
        </div>
      </section>
      <br />
      <hr />
      <section className="about-product">
        <div className="headings">
          <h3 className="description">DESCRIPTION</h3>
          <h3 className="additional-information">ADDITIONAL INFORMATION</h3>
          <h3 className="reviews">
            Reviews (<span className="review-counter">0</span>)
          </h3>
        </div>
      </section>
      <hr />
      <section className="related-product">
        {/* Related products can be added here */}
      </section>
    </div>
  );
};

export default ProductPage;
