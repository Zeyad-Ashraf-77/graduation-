// import React from 'react'
import image1 from "../../assets/images/download (14).jpeg";
import image2 from "../../assets/images/download (27).jpeg";
import image3 from "../../assets/images/download (31).jpeg";
import image4 from "../../assets/images/download (30).jpeg";
import image5 from "../../assets/images/pin/2.jpg";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import imageAbout from "../../assets/images/pin/hero2.webp";
import { useNavigate } from "react-router-dom";
import ProductListPage from "../Product/Product";

export default function HomePage() {
  const navigate = useNavigate();

  return (
     <>
    
    
    <div className="bg-[#f9f9f6] dark:bg-black text-gray-800 dark:text-white font-sans">
      {/* Hero Section */}
      <section className="bg-[url('/src/assets/images/pin/hero1.jpg')] hero h-screen bg-cover bg-center text-white py-60 px-4 text-center dark:bg-black dark:bg-blend-overlay">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Unique Handmade Creations
        </h2>
        <p className="text-lg mb-6">
          Explore handcrafted items made with love.
        </p>
        <button
          onClick={() => navigate("/product")}
          className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-2xl font-medium text-white text-lg"
        >
          Shop Now
        </button>
      </section>

      <div className="container mx-auto">
        <div className="mt-5">
          <MainSlider />
        </div>

        {/* Featured Products */}
        <ProductListPage />
      </div>

      {/* Categories */}
      <section className="py-16 px-4 mb-4 bg-[#cfc0a2] dark:bg-gray-900">
        <h2 className=" font-bold text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[image1, image2, image3, image4].map((cat) => (
            <div key={cat} className="text-center">
              <div className="h-32 w-32 mx-auto bg-gray-300 rounded-full mb-3 dark:bg-gray-600">
                <img
                  src={cat}
                  className="w-full h-full object-cover rounded-full"
                  alt=""
                />
              </div>
              <p className="text-lg font-medium">Welcome</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto">
        <CategorySlider />

        {/* About */}
        <section className="py-16 px-4 flex flex-col md:flex-row items-center gap-8 dark:bg-gray-800 text-gray-800 dark:text-white">
          <div className="flex-1 h-96 bg-gray-300 rounded dark:bg-gray-700">
            <img
              src={imageAbout}
              className="w-full rounded-2xl h-full object-cover"
              alt=""
              />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-4">About Us</h3>
            <p className="text-lg">
              We believe in the beauty of handcrafted items. Our mission is to
              connect you with skilled artisans who put love into every piece
              they make.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
          <h3 className="text-3xl font-bold text-center mb-10">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="bg-[#fdf9f4] dark:bg-gray-800 p-6 rounded shadow"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 dark:bg-gray-600">
                  <img
                    src={image5}
                    className="w-full h-full object-cover rounded-full"
                    alt=""
                    />
                </div>
                <p className="mb-2 italic">
                  "Beautiful product and fast delivery! Highly recommend."
                </p>
                <p className="font-bold">Customer Name</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
            </>
  );
}
