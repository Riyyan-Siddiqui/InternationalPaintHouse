import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineDelete,
} from "react-icons/ai";
import "../Styles/ShoppingCartWishlist.css";

export default function ShoppingCartWishlist() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 79.99,
      quantity: 2,
      image: "https://placehold.co/100x100",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      quantity: 1,
      image: "https://placehold.co/100x100",
    },
  ]);

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 59.99,
      quantity: 1,
      image: "https://placehold.co/100x100",
    },
  ]);

  const [activeTab, setActiveTab] = useState("cart");

  const updateQuantity = (id, newQuantity, isCart) => {
    const updateItems = (items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      );

    if (isCart) {
      setCartItems(updateItems(cartItems));
    } else {
      setWishlistItems(updateItems(wishlistItems));
    }
  };

  const removeItem = (id, isCart) => {
    if (isCart) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    }
  };

  const moveItem = (id, fromCart) => {
    const sourceList = fromCart ? cartItems : wishlistItems;
    const targetList = fromCart ? wishlistItems : cartItems;
    const item = sourceList.find((item) => item.id === id);

    if (item) {
      if (fromCart) {
        setCartItems(cartItems.filter((i) => i.id !== id));
        setWishlistItems([...wishlistItems, item]);
      } else {
        setWishlistItems(wishlistItems.filter((i) => i.id !== id));
        setCartItems([...cartItems, item]);
      }
    }
  };

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderItems = (items, isCart) => (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          <img src={item.image} alt={item.name} className="item-image" />
          <div className="item-details">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-price">${item.price.toFixed(2)}</p>
          </div>
          <div className="quantity-control">
            <button
              className="quantity-button"
              onClick={() => updateQuantity(item.id, item.quantity - 1, isCart)}
            >
              <AiOutlineMinus />
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button
              className="quantity-button"
              onClick={() => updateQuantity(item.id, item.quantity + 1, isCart)}
            >
              <AiOutlinePlus />
            </button>
          </div>
          <button
            className="action-button"
            onClick={() => removeItem(item.id, isCart)}
          >
            <AiOutlineDelete />
          </button>
          <button
            className="action-button"
            onClick={() => moveItem(item.id, isCart)}
          >
            {isCart ? <AiOutlineHeart /> : <AiOutlineShoppingCart />}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === "cart" ? "active" : ""}`}
          onClick={() => setActiveTab("cart")}
        >
          Cart ({cartItems.length})
        </button>
        <button
          className={`tab-button ${activeTab === "wishlist" ? "active" : ""}`}
          onClick={() => setActiveTab("wishlist")}
        >
          Wishlist ({wishlistItems.length})
        </button>
      </div>
      {activeTab === "cart" && (
        <div>
          <h2 className="section-title">Shopping Cart</h2>
          {cartItems.length > 0 ? (
            <>
              {renderItems(cartItems, true)}
              <div className="total-section">
                <div className="total-row">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">
                    ${calculateTotal(cartItems).toFixed(2)}
                  </span>
                </div>
                <button className="checkout-button">Proceed to Checkout</button>
              </div>
            </>
          ) : (
            <p className="empty-message">Your cart is empty.</p>
          )}
        </div>
      )}
      {activeTab === "wishlist" && (
        <div>
          <h2 className="section-title">Wishlist</h2>
          {wishlistItems.length > 0 ? (
            renderItems(wishlistItems, false)
          ) : (
            <p className="empty-message">Your wishlist is empty.</p>
          )}
        </div>
      )}
    </div>
  );
}
