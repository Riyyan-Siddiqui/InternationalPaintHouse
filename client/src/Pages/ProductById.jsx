import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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
                <div className="flex items-center">
                  <select
                    id="size"
                    name="size"
                    value={size}
                    onChange={handleSizeChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Choose an option">Choose an option</option>
                    {product.sizes?.map((sizeOption) => (
                      <option key={sizeOption} value={sizeOption}>
                        {sizeOption}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setSize("Choose an option")}
                    className="ml-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="shade" className="block text-sm font-medium text-gray-700 mb-2">Shade:</label>
                <input
                  type="text"
                  id="shade"
                  placeholder="Write shade name or number from shade card"
                  value={shade}
                  onChange={(e) => setShade(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center border rounded-md">
                  <button onClick={decrement} className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">-</button>
                  <span className="py-2 px-4 bg-white text-gray-800 font-medium">{counter}</span>
                  <button onClick={increment} className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">+</button>
                </div>
                <Link to={`/shop/shoppingcart/`}><button className="ml-4 py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300">ADD TO CART</button></Link>
                
              </div>
              
              <hr className="my-6" />
              
              <div className="text-sm text-gray-600">
                <p className="mb-2"><span className="font-semibold">SKU:</span> {product.sku}</p>
                <p className="mb-2"><span className="font-semibold">Categories:</span> {category.category_name}</p>
                <p className="mb-2"><span className="font-semibold">Tag:</span> {product.tag}</p>
                <p><span className="font-semibold">Share:</span> 
                  {/* Add social sharing buttons here */}
                  <button className="ml-2 text-blue-500 hover:text-blue-600">Facebook</button>
                  <button className="ml-2 text-blue-400 hover:text-blue-500">Twitter</button>
                  <button className="ml-2 text-red-500 hover:text-red-600">Pinterest</button>
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <a href="#description" className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
                DESCRIPTION
              </a>
              <a href="#additional-info" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 ml-8">
                ADDITIONAL INFORMATION
              </a>
              <a href="#reviews" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 ml-8">
                REVIEWS ({product.reviews?.length || 0})
              </a>
            </nav>
          </div>
          <div className="mt-6 prose max-w-none">
            <h3 id="description" className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-4 text-gray-500">{product.description}</p>
            {/* Add more content for description, additional information, and reviews as needed */}
          </div>
        </section>
        
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          {/* Add related products here */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Example related product card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="/placeholder.svg?height=200&width=200" alt="Related Product" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Related Product</h3>
                <p className="text-gray-600">₨1000</p>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Product
                </button>
              </div>
            </div>
            {/* Repeat for other related products */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductById;

