import React, { useState, useEffect } from "react";

export const StockSection = ({ showNotification }) => {
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    fetchStockItems();
  }, []);

  const fetchStockItems = async () => {
    try {
      const response = await fetch('/api/stock');
      if (!response.ok) {
        throw new Error('Failed to fetch stock items');
      }
      const data = await response.json();
      setStockItems(data);
    } catch (error) {
      console.error("Error fetching stock items:", error);
      showNotification("Failed to fetch stock items. Please try again later.", "error");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Low Stock Alert</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Product</th>
            <th className="text-left">Current Stock</th>
            <th className="text-left">Reorder Level</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item) => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.currentStock}</td>
              <td>{item.reorderLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

