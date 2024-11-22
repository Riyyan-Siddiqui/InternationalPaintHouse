import React from "react";

export const OverviewSection = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-blue-500 text-white p-6 rounded-lg">
      <h3 className="text-lg font-bold">Total Users</h3>
      <p className="text-2xl">{data.totalUsers}</p>
    </div>
    <div className="bg-green-500 text-white p-6 rounded-lg">
      <h3 className="text-lg font-bold">Products</h3>
      <p className="text-2xl">{data.totalProducts}</p>
    </div>
    <div className="bg-yellow-500 text-white p-6 rounded-lg">
      <h3 className="text-lg font-bold">Orders</h3>
      <p className="text-2xl">{data.totalOrders}</p>
    </div>
    <div className="bg-red-500 text-white p-6 rounded-lg">
      <h3 className="text-lg font-bold">Revenue</h3>
      <p className="text-2xl">${data.totalRevenue.toLocaleString()}</p>
    </div>
  </div>
);

