import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const UserSection = ({ showNotification }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number1: "",
    street_address: "",
    city: "",
    province: "",
    country: "",
  });

  const { id } = useParams(); // Get the 'id' param from the URL
  const navigate = useNavigate(); // For navigation between routes

  useEffect(() => {
    if (id) {
      fetchUserById(id); // Fetch a single user if 'id' is present
    } else {
      fetchUsers(); // Fetch all users otherwise
    }
  }, [id]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/get_users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification(
        "Failed to fetch users. Please try again later.",
        "error"
      );
    }
  };

  const fetchUserById = async (userId) => {
    try {
      const response = await fetch(`/api/v1/get_user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      setUsers([data]); // Show only the specific user
    } catch (error) {
      console.error("Error fetching user:", error);
      showNotification(
        "Failed to fetch user. Please try again later.",
        "error"
      );
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/create_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const addedUser = await response.json();
        fetchUsers(); // Refresh the user list
        setNewUser({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          phone_number1: "",
          street_address: "",
          city: "",
          province: "",
          country: "",
        });
        showNotification(
          `${addedUser.first_name} ${addedUser.last_name} has been added successfully.`,
          "info"
        );
      } else {
        const errorData = await response.json();
        showNotification(
          errorData.message || "Failed to add user. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error adding user:", error);
      showNotification(
        "An unexpected error occurred. Please try again.",
        "error"
      );
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/v1/delete_user/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.user_id !== userId));
        showNotification("User deleted successfully.", "info");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showNotification(
        error.message || "Failed to delete user. Please try again.",
        "error"
      );
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Users</h3>
      {id && (
        <p className="text-gray-600 mb-4">
          Viewing details for user ID: <strong>{id}</strong>
        </p>
      )}
      <form onSubmit={addUser} className="mb-4 grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={(e) =>
            setNewUser({ ...newUser, first_name: e.target.value })
          }
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={(e) =>
            setNewUser({ ...newUser, last_name: e.target.value })
          }
          required
          className="border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
          className="border p-2"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={newUser.phone_number1}
          onChange={(e) =>
            setNewUser({ ...newUser, phone_number1: e.target.value })
          }
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Street Address"
          value={newUser.street_address}
          onChange={(e) =>
            setNewUser({ ...newUser, street_address: e.target.value })
          }
          required
          className="border p-2"
        />
        <input
          type="text"
          placeholder="City"
          value={newUser.city}
          onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
          required
          className="border p-2"
        />
        <select
          value={newUser.province}
          onChange={(e) => setNewUser({ ...newUser, province: e.target.value })}
          required
          className="border p-2"
        >
          <option value="">Select Province</option>
          <option value="Sindh">Sindh</option>
          <option value="Balochistan">Balochistan</option>
          <option value="Punjab">Punjab</option>
          <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
          <option value="Kashmir">Kashmir</option>
        </select>
        <input
          type="text"
          placeholder="Country"
          value={newUser.country}
          onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
          required
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded col-span-2"
        >
          Add User
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Phone</th>
            <th className="text-left">Address</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.email}</td>
              <td>{user.phone_number1}</td>
              <td>{`${user.city}, ${user.province}, ${user.country}`}</td>
              <td>
                <button
                  onClick={() => deleteUser(user.user_id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/users/${user.user_id}`)}
                  className="bg-blue-500 text-white p-1 rounded ml-2"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
