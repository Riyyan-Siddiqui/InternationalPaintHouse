import React, { useState } from "react";

const HomePage = () => {

  return (
    <div>
      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative h-[600px] bg-cover bg-center"
          style={{ backgroundImage: "url('')" }}
        >
          <div className="flex items-center justify-center h-full bg-black bg-opacity-60">
            <div className="text-center text-white p-8 rounded-lg">
              <h1 className="text-5xl md:text-6xl mb-4 font-extrabold">
                Transform Your Space with Color
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Discover premium paints and expert advice at ColorCraft
              </p>
              <a
                href="/products"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-500 transition duration-200"
              >
                Explore Our Collection
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="p-16 bg-gray-100">
          <h2 className="text-center text-4xl mb-8 font-semibold">
            Our Features
          </h2>
          <div className="flex flex-wrap justify-center">
            {[
              {
                title: "High-Quality Products",
                description:
                  "We use only the best materials to ensure long-lasting results.",
              },
              {
                title: "Affordable Pricing",
                description:
                  "Our competitive pricing ensures you get the best value for your money.",
              },
              {
                title: "Customer Satisfaction",
                description:
                  "We prioritize our customers and strive for complete satisfaction with every project.",
              },
              {
                title: "Fast Delivery",
                description:
                  "We offer quick turnaround times to get your projects moving.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center bg-white m-4 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-72 h-72"
              >
                <h3 className="font-bold text-xl text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="p-16">
          <h2 className="text-center text-4xl mb-8 font-semibold">
            Our Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                imgSrc: "https://placehold.co/300x300",
                title: "Signature Interior",
                description:
                  "Premium interior paint with a smooth, durable finish",
              },
              {
                imgSrc: "https://placehold.co/300x300",
                title: "Weather Shield Exterior",
                description:
                  "Long-lasting exterior paint that withstands the elements",
              },
              {
                imgSrc: "https://placehold.co/300x300",
                title: "Artistic Effects",
                description:
                  "Create unique textures and finishes with our specialty paints",
              },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <h3 className="p-4 font-bold text-xl">{product.title}</h3>
                <p className="px-4 pb-4 text-gray-600">{product.description}</p>
                <a
                  href="#"
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="p-16 bg-gray-50">
          <h2 className="text-center text-4xl mb-8 font-semibold">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Color Consultation",
                description:
                  "Get personalized advice from our expert color consultants to find the perfect palette for your space.",
              },
              {
                title: "Paint Mixing",
                description:
                  "We can mix custom colors to match your exact specifications or create the perfect shade you envision.",
              },
              {
                title: "Project Planning",
                description:
                  "Our team can help you plan your painting project, estimate materials, and provide application tips.",
              },
              {
                title: "Contractor Referrals",
                description:
                  "Need professional help? We can connect you with trusted local painting contractors.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <h3 className="font-bold text-xl">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="p-16">
          <h2 className="text-center text-4xl mb-8 font-semibold">
            About ColorCraft
          </h2>
          <p className="max-w-2xl mx-auto text-center text-lg text-gray-700">
            At ColorCraft, we believe in the transformative power of color. With
            over 20 years of experience, we've been helping homeowners,
            designers, and contractors bring their visions to life. Our
            commitment to quality, sustainability, and customer satisfaction
            sets us apart in the industry.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="p-16 bg-gray-50">
          <h2 className="text-center text-4xl mb-8 font-semibold">
            Contact Us
          </h2>
          <form className="max-w-xl mx-auto grid gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
