
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
      setError("Email and password are required.");
      return false;
    }
    if (!isLoginForm && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const createShoppingCart = async (userId) => {
    try {
      const response = await fetch(`/api/v1/createShoppingCart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, admin_id: 1 }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create shopping cart.");
      }

      const data = await response.json();
      console.log("Shopping cart created:", data);
      return data.cart_id;
    } catch (error) {
      console.error("Error creating shopping cart:", error);
      throw error;
    }
  };

  const handleSignup = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/v1/create_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "An error occurred during sign-up.");
      }

      const data = await response.json();
      setSuccess("Signup successful!");

      // Reset form fields
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

      // Create shopping cart for the new user
      if (data.user_id) {
        try {
          await createShoppingCart(data.user_id);
        } catch (error) {
          console.error("Shopping cart creation failed:", error.message);
        }
      }

      // Redirect to login after a short delay
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        await loginAdmin(); // Attempt admin login if user login fails
        return;
      }

      const data = await response.json();
      setSuccess("Login successful!");
      setIsLogin(true);

      // Create a shopping cart or retrieve it for the user
      if (data.user_id) {
        try {
          const cartId = await createShoppingCart(data.user_id);
          data.cart_id = cartId; // Attach cart ID to user data
        } catch (cartError) {
          console.error("Error retrieving/creating shopping cart:", cartError.message);
        }
      }

      localStorage.setItem("user", JSON.stringify(data));
      navigate(`/home/${data.user_id}`);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async () => {
    try {
      const response = await fetch("/api/v1/loginAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Invalid credentials.");
      }

      const data = await response.json();
      setIsAdmin(true);
      setIsLogin(true);

      localStorage.setItem("user", JSON.stringify(data));
      setSuccess("Admin login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoginForm ? handleLogin() : handleSignup();
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}
          {success && <div className="text-green-500 text-center">{success}</div>}
          <div>
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
          <div>
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
          {!isLoginForm && (
            <>
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
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
              className="text-blue-500 underline focus:outline-none"
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

