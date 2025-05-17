import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { ProductDetailsProps } from "../Interfaces/Interfaces";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function addToWishlist(productId: string) {
    try {
      const { data } = await axios.patch(
        `https://project1-kohl-iota.vercel.app/product/washlist/${productId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success("Product added to wishlist successfully!");
    } catch (error) {
      console.log("Error adding to wishlist:", error);
      toast.error("Error adding product to wishlist!");
    }
  }
  async function addToCart(productId: string) {
    try {
      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/cart/create`,
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.log("Error adding to cart:");
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred");
      }
    }
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://project1-kohl-iota.vercel.app/product/${id}`,
          { headers: { Authorization: localStorage.getItem("authorization") } }
        );
        setProduct(data.product);
        console.log(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Product not found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-32 mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        {/* Left Side - Product Images */} <ToastContainer />
        <div className="w-full h-[350px] sm:h-[400px] rounded-lg overflow-hidden">
          <img
            src={product.imageCover.secure_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img.secure_url}
              alt={`Thumbnail ${i + 1}`}
              className="w-20 h-20 object-cover border rounded-md cursor-pointer hover:ring-2 hover:ring-[#6B4E35]"
            />
          ))}
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="space-y-4 text-gray-800">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.describtion}</p>

        <p className="text-2xl font-semibold text-red-700 line-through ">
          ${product.price.toFixed(2)} No Discount
        </p>
        <p className="text-2xl font-semibold text-green-700">
          ${product.subPrice.toFixed(2)} With Discount{" "}
        </p>

        <p className="text-sm">
          Availability:{" "}
          <span
            className={
              product.isAvailable
                ? "text-green-600 font-bold "
                : "text-red-600 font-bold "
            }
          >
            {product.stock !== 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => addToCart(product._id)}
            className="bg-[#6B4E35] hover:bg-[#543e2a] transition text-white px-6 py-2 rounded-md font-medium"
          >
            Add to Cart
          </button>
          <button
            onClick={() => addToWishlist(product._id)}
            className="border border-gray-400 hover:bg-gray-100 transition px-6 py-2 rounded-md font-medium text-gray-800"
          >
            Add to Wishlist
          </button>
        </div>

        <div className="text-sm mt-6 space-y-1 text-gray-700">
          <p className="flex items-center gap-1 ">
            <span className="font-medium ">Rate:</span>{" "}
            {product.avgRating || "N/A"} <FaStar className="text-amber-400" />
          </p>
          <p>
            <span className="font-medium">Brand:</span>{" "}
            {product.brand.name || "N/A"}
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {product.category.name || "N/A"}
          </p>
          <p>
            <span className="font-medium">Handmade:</span> Yes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
