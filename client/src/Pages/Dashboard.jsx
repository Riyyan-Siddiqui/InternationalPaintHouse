import React, { useState } from "react";
import {
  FaUsers,
  FaPaintBrush,
  FaChartBar,
  FaBoxes,
  FaShoppingCart,
  FaTags,
} from "react-icons/fa";

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
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Paint Pro</h1>
        <nav className="flex flex-col space-y-4">
          <button
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              activeTab === "overview" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <FaChartBar className="mr-2" /> Overview
          </button>
          <button
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              activeTab === "users" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers className="mr-2" /> Users
          </button>
          <button
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              activeTab === "products" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            <FaPaintBrush className="mr-2" /> Products
          </button>
          <button
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              activeTab === "analytics" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <FaChartBar className="mr-2" /> Analytics
          </button>
          <button
            className={`flex items-center p-3 hover:bg-gray-700 rounded ${
              activeTab === "stock" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab("stock")}
          >
            <FaBoxes className="mr-2" /> Stock
          </button>
        </nav>
      </aside>
      <main className="flex-grow p-6 bg-gray-100">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src="https://placehold.co/40x40"
              alt="User Avatar"
              className="rounded-full"
            />
            <span>John Doe</span>
          </div>
        </header>
        <div className="bg-white p-6 rounded-lg shadow">{renderContent()}</div>
      </main>
    </div>
  );
};

const OverviewSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-blue-500 text-white p-6 rounded-lg flex items-center">
      <FaUsers className="text-5xl mr-4" />
      <div>
        <h3 className="text-lg font-bold">Total Users</h3>
        <p className="text-2xl">1,234</p>
      </div>
    </div>
    <div className="bg-green-500 text-white p-6 rounded-lg flex items-center">
      <FaPaintBrush className="text-5xl mr-4" />
      <div>
        <h3 className="text-lg font-bold">Products</h3>
        <p className="text-2xl">56</p>
      </div>
    </div>
    <div className="bg-yellow-500 text-white p-6 rounded-lg flex items-center">
      <FaShoppingCart className="text-5xl mr-4" />
      <div>
        <h3 className="text-lg font-bold">Orders</h3>
        <p className="text-2xl">89</p>
      </div>
    </div>
    <div className="bg-red-500 text-white p-6 rounded-lg flex items-center">
      <FaTags className="text-5xl mr-4" />
      <div>
        <h3 className="text-lg font-bold">Revenue</h3>
        <p className="text-2xl">$12,345</p>
      </div>
    </div>
  </div>
);

const UserSection = () => (
  <div>
    <h3 className="text-lg font-bold mb-4">Recent Users</h3>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-3 text-left">Name</th>
          <th className="border p-3 text-left">Email</th>
          <th className="border p-3 text-left">Joined</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-3">Alice Johnson</td>
          <td className="border p-3">alice@example.com</td>
          <td className="border p-3">2023-05-15</td>
        </tr>
        <tr>
          <td className="border p-3">Bob Smith</td>
          <td className="border p-3">bob@example.com</td>
          <td className="border p-3">2023-05-14</td>
        </tr>
        <tr>
          <td className="border p-3">Carol Williams</td>
          <td className="border p-3">carol@example.com</td>
          <td className="border p-3">2023-05-13</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ProductSection = () => (
  <div>
    <h3 className="text-lg font-bold mb-4">Top Products</h3>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-3 text-left">Name</th>
          <th className="border p-3 text-left">Category</th>
          <th className="border p-3 text-left">Price</th>
          <th className="border p-3 text-left">Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-3">Premium White</td>
          <td className="border p-3">Interior</td>
          <td className="border p-3">$29.99</td>
          <td className="border p-3">150</td>
        </tr>
        <tr>
          <td className="border p-3">Exterior Blue</td>
          <td className="border p-3">Exterior</td>
          <td className="border p-3">$34.99</td>
          <td className="border p-3">100</td>
        </tr>
        <tr>
          <td className="border p-3">Wood Stain</td>
          <td className="border p-3">Specialty</td>
          <td className="border p-3">$19.99</td>
          <td className="border p-3">75</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const AnalyticsSection = () => (
  <div>
    <h3 className="text-lg font-bold mb-4">Sales Analytics</h3>
    <div className="bg-gray-200 h-72 flex justify-center items-center rounded-lg">
      <p>Sales Chart Placeholder</p>
    </div>
  </div>
);

const StockSection = () => (
  <div>
    <h3 className="text-lg font-bold mb-4">Low Stock Alert</h3>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-3 text-left">Product</th>
          <th className="border p-3 text-left">Current Stock</th>
          <th className="border p-3 text-left">Reorder Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-3">Premium White</td>
          <td className="border p-3">10</td>
          <td className="border p-3">50</td>
        </tr>
        <tr>
          <td className="border p-3">Exterior Blue</td>
          <td className="border p-3">15</td>
          <td className="border p-3">30</td>
        </tr>
        <tr>
          <td className="border p-3">Wood Stain</td>
          <td className="border p-3">5</td>
          <td className="border p-3">20</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Dashboard;
