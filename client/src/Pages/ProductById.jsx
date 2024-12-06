import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

const ProductById = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1);
  const [size, setSize] = useState("Choose an option");
  const [shade, setShade] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/api/v1/getProductById/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const productData = await response.json();
        setProduct(productData);

        const brandResponse = await fetch(`/api/v1/getBrandsById/${productData.brand_id}`);
        const categoryResponse = await fetch(`/api/v1/get_single_category/${productData.category_id}`);
        if (!brandResponse.ok || !categoryResponse.ok) {
          throw new Error("Failed to fetch brand or category data");
        }
        const brandData = await brandResponse.json();
        const categoryData = await categoryResponse.json();
        setBrand(brandData);
        setCategory(categoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter > 1 ? counter - 1 : 1);
  const handleSizeChange = (e) => setSize(e.target.value);

  const addToCart = async () => {
    // if (size === "Choose an option") {
    //   // Proceed to the cart directly if size isn't selected, no notification
    // }

    window.location.href = '/shop/shoppingcart/';
  
    // try {
    //   const response = await fetch(`/api/v1/addCartItem`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       productId: product.id,
    //       quantity: counter,
    //       size, // Will be passed as "Choose an option" if not selected
    //       shade,
    //     }),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error("Failed to add product to cart.");
    //   }
  
    //   const data = await response.json();
    //   setNotification({ message: data.message || "Product added to cart!", type: "success" });
  
    //   // Redirect to the shopping cart page
    //   window.location.href = '/shop/shoppingcart/'; // Redirect immediately to cart
  
    // } catch (err) {
    //   setNotification({ message: err.message || "Failed to add to cart.", type: "error" });
    // }
  };
  

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  if (!product) return <div className="flex justify-center items-center h-screen">Product not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <section className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src={product.image_url} alt={product.product_name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-6">
              <p className="text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:underline">Home</Link> / 
                <Link to="/shop" className="hover:underline">Shop</Link> / 
                <Link to={`/category/${category.id}`} className="hover:underline">{category.category_name}</Link> / 
                {product.product_name}
              </p>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-2xl font-semibold text-blue-600 mb-4">₨{product.price}</p>
              <p className="text-gray-700 mb-4">Brand: {brand.brand_name}</p>
              <p className="text-gray-600 mb-6">{product.disclaimer}</p>

              <div className="mb-6">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">Size:</label>
                <select
                  id="size"
                  name="size"
                  value={size}
                  onChange={handleSizeChange}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Choose an option">Choose an option</option>
                  {product.sizes?.map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="shade" className="block text-sm font-medium text-gray-700 mb-2">Shade:</label>
                <input
                  type="text"
                  id="shade"
                  placeholder="Write shade name or number from shade card"
                  value={shade}
                  onChange={(e) => setShade(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center mb-6">
                <div className="flex items-center border rounded-md">
                  <button onClick={decrement} className="py-2 px-4 bg-gray-100 hover:bg-gray-200">-</button>
                  <span className="py-2 px-4 bg-white">{counter}</span>
                  <button onClick={increment} className="py-2 px-4 bg-gray-100 hover:bg-gray-200">+</button>
                </div>
                <button
                  onClick={addToCart}
                  className="ml-4 py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md"
                >
                  ADD TO CART
                </button>
              </div>

              {notification && (
                <div
                  className={`mt-4 p-4 rounded ${
                    notification.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {notification.message}
                </div>
              )}

              <hr className="my-6" />
              {/* Additional product details */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductById;
