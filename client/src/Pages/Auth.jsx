import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";

const AuthPages = () => {
  const { setIsLogin, setIsAdmin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone_number1: "",
    phone_number2: "",
    street_address: "",
    city: "",
    province: "",
    country: "",
    gmaplink: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return false;
    }
    if (!isLoginForm && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };
  const createShoppingCart = async (userId) => {
    try {
      const response = await fetch("/api/v1/createShoppingCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, admin_id: 1 }), // Admin ID can be 1 or dynamically assigned
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error creating shopping cart");
      }
      console.log("Shopping cart created:", data);
    } catch (error) {
      console.error("Error creating shopping cart:", error);
      setError("Failed to create shopping cart");
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    if (!validateForm()) return;
    try {
      const response = await fetch("/api/v1/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          first_name: "",
          last_name: "",
          phone_number1: "",
          phone_number2: "",
          street_address: "",
          city: "",
          province: "",
          country: "",
          gmaplink: "",
        });
        // After signup, navigate to the login page
        navigate("/login"); // Redirect to login after successful signup
      } else {
        setError(data.message || "An error occurred during sign-up");
      }
    } catch (error) {
      setError("An error occurred during the request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");

        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(data));

        const userId = data.user_id;

        if (userId) {
          // If the user ID is found, set isLogin to true
          setIsLogin(true);

          // Create a shopping cart for the user
          await createShoppingCart(userId);

          // Redirect to the home page
          navigate(`/home/${userId}`);
        } else {
          setError("User ID is missing");
        }
      } else {
        // If login fails for regular user, try admin login
        await loginAdmin();
      }
    } catch (error) {
      setError("An error occurred during the login request");
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async () => {
    try {
      const adminResponse = await fetch("/api/v1/loginAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const adminData = await adminResponse.json();

      if (adminResponse.ok) {
        // Set isAdmin to true as this user is an admin
        setIsAdmin(true);
        setIsLogin(true);

        // Save admin data to local storage
        localStorage.setItem("user", JSON.stringify(adminData));

        setSuccess("Admin login successful!");
        navigate("/admin/dashboard"); // Redirect to admin-specific page
      } else {
        setError(adminData.message || "Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred during admin login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-8">
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {success && <div className="mb-4 text-green-500">{success}</div>}
          {/* Common Fields */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Additional Fields for Signup */}
          {!isLoginForm && (
            <>
              <div className="mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="street_address"
                  placeholder="Street Address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.street_address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isLoginForm ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-500 underline"
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;

