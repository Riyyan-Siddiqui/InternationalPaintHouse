import React, { useState } from "react";
import {
  FaUsers,
  FaPaintBrush,
  FaChartBar,
  FaBoxes,
  FaShoppingCart,
  FaTags,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserSection />;
      case "products":
        return <ProductSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "stock":
        return <StockSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h1 className="logo">Paint Pro</h1>
        <nav className="nav">
          <button
            className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <FaChartBar /> Overview
          </button>
          <button
            className={`nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers /> Users
          </button>
          <button
            className={`nav-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <FaPaintBrush /> Products
          </button>
          <button
            className={`nav-item ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <FaChartBar /> Analytics
          </button>
          <button
            className={`nav-item ${activeTab === "stock" ? "active" : ""}`}
            onClick={() => setActiveTab("stock")}
          >
            <FaBoxes /> Stock
          </button>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="user-info">
            <img
              src="https://placehold.co/40x40"
              alt="User Avatar"
              className="avatar"
            />
            <span>John Doe</span>
          </div>
        </header>
        <div className="content">{renderContent()}</div>
      </main>
    </div>
  );
};

const OverviewSection = () => (
  <div className="overview-section">
    <div className="stat-card">
      <FaUsers className="stat-icon" />
      <div className="stat-info">
        <h3>Total Users</h3>
        <p>1,234</p>
      </div>
    </div>
    <div className="stat-card">
      <FaPaintBrush className="stat-icon" />
      <div className="stat-info">
        <h3>Products</h3>
        <p>56</p>
      </div>
    </div>
    <div className="stat-card">
      <FaShoppingCart className="stat-icon" />
      <div className="stat-info">
        <h3>Orders</h3>
        <p>89</p>
      </div>
    </div>
    <div className="stat-card">
      <FaTags className="stat-icon" />
      <div className="stat-info">
        <h3>Revenue</h3>
        <p>$12,345</p>
      </div>
    </div>
  </div>
);

const UserSection = () => (
  <div className="user-section">
    <h3>Recent Users</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Joined</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alice Johnson</td>
          <td>alice@example.com</td>
          <td>2023-05-15</td>
        </tr>
        <tr>
          <td>Bob Smith</td>
          <td>bob@example.com</td>
          <td>2023-05-14</td>
        </tr>
        <tr>
          <td>Carol Williams</td>
          <td>carol@example.com</td>
          <td>2023-05-13</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ProductSection = () => (
  <div className="product-section">
    <h3>Top Products</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Premium White</td>
          <td>Interior</td>
          <td>$29.99</td>
          <td>150</td>
        </tr>
        <tr>
          <td>Exterior Blue</td>
          <td>Exterior</td>
          <td>$34.99</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Wood Stain</td>
          <td>Specialty</td>
          <td>$19.99</td>
          <td>75</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const AnalyticsSection = () => (
  <div className="analytics-section">
    <h3>Sales Analytics</h3>
    <div className="chart-placeholder">
      <p>Sales Chart Placeholder</p>
      {/* In a real application, you would integrate a charting library here */}
    </div>
  </div>
);

const StockSection = () => (
  <div className="stock-section">
    <h3>Low Stock Alert</h3>
    <table className="data-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Current Stock</th>
          <th>Reorder Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Primer</td>
          <td>10</td>
          <td>25</td>
        </tr>
        <tr>
          <td>Gloss Black</td>
          <td>5</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Ceiling White</td>
          <td>15</td>
          <td>30</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Dashboard;
