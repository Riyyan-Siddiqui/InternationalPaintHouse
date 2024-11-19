import React, { useState } from "react";

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
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
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const simulateApiCall = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          data.email === "test@example.com" &&
          data.password === "password123"
        ) {
          resolve({ success: true, message: "Authentication successful" });
        } else {
          reject({ success: false, message: "Invalid credentials" });
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await simulateApiCall(formData);
      setSuccess(response.message);
      console.log("User authenticated:", formData.email);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex w-full text-center">
          <div
            className={`w-1/2 text-2xl font-semibold transition-all ${
              isLogin ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Login
          </div>
          <div
            className={`w-1/2 text-2xl font-semibold transition-all ${
              !isLogin ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Signup
          </div>
        </div>
        <div className="relative flex justify-between mt-4 border border-gray-300 rounded-lg overflow-hidden">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
            hidden
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
            hidden
          />
          <label
            className="flex-1 text-center py-2 cursor-pointer z-10 text-white"
            htmlFor="login"
            onClick={() => setIsLogin(true)}
          >
            Login
          </label>
          <label
            className="flex-1 text-center py-2 cursor-pointer z-10 text-white"
            htmlFor="signup"
            onClick={() => setIsLogin(false)}
          >
            Signup
          </label>
          <div
            className={`absolute h-full w-1/2 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 transition-all duration-300`}
            style={{
              transform: isLogin ? "translateX(0)" : "translateX(100%)",
            }}
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}

          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="first_name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="last_name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone_number1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Primary Phone Number"
                  value={formData.phone_number1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone_number2"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Secondary Phone Number"
                  value={formData.phone_number2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="street_address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Street Address"
                  value={formData.street_address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="city"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="province"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Province</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Kashmir">Kashmir</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="country"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="url"
                  name="gmaplink"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Google Maps Link"
                  value={formData.gmaplink}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          {isLogin && (
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <div>
                <a href="#" className="text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`w-full p-3 bg-blue-600 text-white rounded-lg ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isLogin ? "Login" : "Signup"}
          </button>

          <div className="mt-4 text-center">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-500 ml-2"
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPages;
