import React, { useState, useEffect } from "react";
import { UserSection } from "../Components/UserSection";
import { ProductSection } from "../Components/ProductSection";
import { AnalyticsSection } from "../Components/AnalyticsSection";
import { StockSection } from "../Components/StockSection";
import { OverviewSection } from "../Components/OverviewSection";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [overviewData, setOverviewData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      const response = await fetch("/api/overview");
      if (!response.ok) {
        throw new Error("Failed to fetch overview data");
      }
      const data = await response.json();
      setOverviewData(data);
    } catch (error) {
      console.error("Error fetching overview data:", error);
      showNotification(
        "Error fetching overview data. Please try again later.",
        "error"
      );
    }
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserSection showNotification={showNotification} />;
      case "products":
        return <ProductSection showNotification={showNotification} />;
      case "analytics":
        return <AnalyticsSection />;
      case "stock":
        return <StockSection showNotification={showNotification} />;
      default:
        return <OverviewSection data={overviewData} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Paint Pro</h1>
        <nav>
          {["overview", "users", "products", "analytics", "stock"].map(
            (tab) => (
              <button
                key={tab}
                className={`w-full text-left p-2 mb-2 ${
                  activeTab === tab ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
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
        {notification && (
          <div
            className={`mb-4 p-4 rounded ${
              notification.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            <p>{notification.message}</p>
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
