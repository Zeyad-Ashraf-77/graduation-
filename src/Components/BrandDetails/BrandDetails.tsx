import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaCartArrowDown, FaSpinner, FaStar } from "react-icons/fa";
import { useCart } from "../Context/CartContext";

// Define proper types
interface ProductImage {
  secure_url: string;
}

interface Product {
  _id: string;
  name: string;
  describtion: string;
  price: number;
  subPrice: number;
  isAvailable: boolean;
  stock: number;
  avgRating: number;
  imageCover: ProductImage;
  images: ProductImage[];
  brand?: { name: string };
  category?: { name: string };
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BrandDetails() {
  const [brand, setBrand] = useState<Product[]>([]);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { refreshCart } = useCart();

  // Function to handle image click for specific product
  const handleImageClick = (productId: string, index: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  // Get current image to display for specific product
  const getCurrentImage = (product: Product) => {
    const currentIndex = currentImageIndices[product._id] || 0;
    
    if (currentIndex === 0) {
      return product.imageCover.secure_url;
    } else {
      return product.images[currentIndex - 1].secure_url;
    }
  };

  async function addToWishlist(productId: string) {
    try {
      setIsLoadingButton(true);
      await axios.patch(
        `https://project1-kohl-iota.vercel.app/product/washlist/${productId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
   
      toast.success("Product added to wishlist successfully!");
    } catch (error) {
      console.log("Error adding to wishlist:", error);
      toast.error("Error adding product to wishlist!");
    } finally {
      setIsLoadingButton(false);
    }
  }

  async function addToCart(productId: string) {
    try {
      setIsLoadingButton(true);
      await axios.post(
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
      refreshCart();
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.log("Error adding to cart:");
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoadingButton(false);
    }
  }

  async function getBrandDetails() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/brand/SpecificBrand/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
          },
        }
      );
      setBrand(data.products);
   
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrandDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen light:bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!brand) {
    return (
      <div className="h-screen light:bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className=" dark:bg-gray-900 light:bg-white  light:text-gray-800 dark:text-white py-8 sm:pt-6 font-sans min-h-screen ">
      <h1 className="mt-28 font-bold text-center">Brand Details</h1>
      {brand?.map((item: Product, index: number) => (
        <motion.div
          key={index}
          className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Left Side - Product Images */}
          <motion.div variants={fadeUpVariant}>
            <ToastContainer />
            <div className="w-full h-[350px] sm:h-[400px] rounded-lg overflow-hidden">
              <img
                onClick={() => {
                  navigate(`/productDetails/${item._id}`);
                }}
                src={getCurrentImage(item)}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {/* Main cover image thumbnail */}
              <motion.img
                src={item.imageCover.secure_url}
                alt="Main Image"
                className={`w-20 h-20 object-cover border rounded-md cursor-pointer hover:ring-2 hover:ring-[#6B4E35] ${
                  (currentImageIndices[item._id] || 0) === 0 ? 'ring-2 ring-[#6B4E35]' : ''
                }`}
                variants={fadeUpVariant}
                onClick={() => handleImageClick(item._id, 0)}
              />
              {/* Additional images thumbnails */}
              {item.images.map((img: ProductImage, i: number) => (
                <motion.img
                  key={i}
                  src={img.secure_url}
                  alt={`Thumbnail ${i + 1}`}
                  className={`w-20 h-20 object-cover border rounded-md cursor-pointer hover:ring-2 hover:ring-[#6B4E35] ${
                    (currentImageIndices[item._id] || 0) === i + 1 ? 'ring-2 ring-[#6B4E35]' : ''
                  }`}
                  variants={fadeUpVariant}
                  onClick={() => handleImageClick(item._id, i + 1)}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Side - Product Details */}
          <motion.div
            className="space-y-4 text-gray-800"
            variants={fadeUpVariant}
          >
            <h2 className="text-3xl dark:text-white font-bold">{item.name}</h2>
            <p className="light:text-gray-600 dark:text-white">{item.describtion}</p>

            <p className="text-2xl dark:text-white font-semibold text-red-700 line-through ">
              ${item.price.toFixed(2)} No Discount
            </p>
            <p className="text-2xl dark:text-white font-semibold text-green-700">
              ${item.subPrice.toFixed(2)} With Discount
            </p>

            <p className="text-sm">
              Availability:{" "}
              <span
                className={
                  item.isAvailable
                    ? "text-green-600 font-bold "
                    : "text-red-600 font-bold "
                }
              >
                {item.stock !== 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              variants={fadeUpVariant}
            >
              <button
                onClick={() => addToCart(item._id)}
                className="bg-[#6B4E35] hover:bg-[#543e2a] transition text-white px-6 py-2 rounded-md font-medium"
              >
                {isLoadingButton ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-1">
                    Add to Cart <FaCartArrowDown />
                  </span>
                )}
              </button>
              <button
                onClick={() => addToWishlist(item._id)}
                className="border border-gray-400 hover:bg-black  transition px-6 py-2 rounded-md font-medium text-gray-800"
              >
                {isLoadingButton ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <span className="flex items-center dark:text-white gap-1">
                    Add to Wishlist <FaCartArrowDown />
                  </span>
                )}
              </button>
            </motion.div>

            <motion.div
              className="text-sm mt-6 space-y-1 text-gray-700"
              variants={fadeUpVariant}
            >
              <p className="flex dark:text-white items-center gap-1">
                <span className="font-medium">Rate:</span>{" "}
                {item.avgRating || "N/A"} <FaStar className="text-amber-400" />
              </p>
              <p className="dark:text-white">
                <span className="font-medium">Brand:</span>{" "}
                {item.brand?.name || "N/A"}
              </p>
              <p className="dark:text-white" >
                <span className="font-medium">Category:</span>{" "}
                {item.category?.name || "N/A"}
              </p>
              <p className="dark:text-white" >
                <span className="font-medium">Handmade:</span> Yes
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
