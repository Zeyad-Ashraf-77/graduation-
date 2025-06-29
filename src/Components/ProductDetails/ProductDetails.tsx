import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCartArrowDown, FaHeart, FaSpinner, FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { ProductDetailsProps } from "../Interfaces/Interfaces";
import { motion } from "framer-motion";
import { useCart } from "../Context/CartContext";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { refreshCart } = useCart();

  // Function to handle image click
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Get current image to display
  const getCurrentImage = () => {
    if (!product) return "";

    if (currentImageIndex === 0) {
      return product.imageCover.secure_url;
    } else {
      return product.images[currentImageIndex - 1].secure_url;
    }
  };

  async function addToWishlist(productId: string) {
    try {
      setIsLoadingWishlist(true);
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
    } finally {
      setIsLoadingWishlist(false);
    }
  }
  async function addToCart(productId: string) {
    try {
      setIsLoadingCart(true);
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
      refreshCart();
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsLoadingCart(false);
    }
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
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
      <div className="h-screen light:bg-amber-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
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
    <div className="dark:bg-gray-900 light:bg-white text-gray-800 dark:text-gray-200 py-8 sm:pt-6 font-sans min-h-screen">
      <h1 className=" mt-20 dark:text-white  font-bold text-center">
        Product Details
      </h1>
      <motion.div
        className="max-w-7xl  mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
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
              src={getCurrentImage()}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {/* Main cover image thumbnail */}
            <motion.img
              src={product.imageCover.secure_url}
              alt="Main Image"
              className={`w-20 h-20 object-cover border rounded-md cursor-pointer hover:ring-2 hover:ring-[#6B4E35] ${
                currentImageIndex === 0 ? "ring-2 ring-[#6B4E35]" : ""
              }`}
              variants={fadeUpVariant}
              onClick={() => handleImageClick(0)}
            />
            {/* Additional images thumbnails */}
            {product.images.map((img, i) => (
              <motion.img
                key={i}
                src={img.secure_url}
                alt={`Thumbnail ${i + 1}`}
                className={`w-20 h-20 object-cover border rounded-md cursor-pointer hover:ring-2 hover:ring-[#6B4E35] ${
                  currentImageIndex === i + 1 ? "ring-2 ring-[#6B4E35]" : ""
                }`}
                variants={fadeUpVariant}
                onClick={() => handleImageClick(i + 1)}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side - Product Details */}
        <motion.div
          className="space-y-4 text-gray-800"
          variants={fadeUpVariant}
        >
          <h2 className="text-3xl font-bold dark:text-white">{product.name}</h2>
          <p className="light:text-gray-600 dark:text-white">
            {product?.describtion}
          </p>

          <p className="text-2xl font-semibold text-red-700 line-through ">
            ${product.price.toFixed(2)} No Discount
          </p>
          <p className="text-2xl font-semibold text-green-700">
            ${product.subPrice.toFixed(2)} With Discount{" "}
          </p>

          <p className="text-sm dark:text-white">
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

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            variants={fadeUpVariant}
          >
            <button
              disabled={isLoadingCart}
              onClick={() => addToCart(product._id)}
              className="bg-[#6B4E35] hover:bg-[#543e2a] flex items-center justify-center transition text-white px-6 py-2 rounded-md font-medium"
            >
              {isLoadingCart ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <span className="flex items-center gap-1">
                  {" "}
                  Add to Cart <FaCartArrowDown />{" "}
                </span>
              )}
            </button>
            <button
              disabled={isLoadingWishlist}
              onClick={() => addToWishlist(product._id)}
              className="border border-gray-400 hover:bg-black flex items-center justify-center transition px-6 py-2 rounded-md font-medium text-gray-800"
            >
              {isLoadingWishlist ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <span className="flex items-center gap-1 dark:text-white">
                  {" "}
                  Add to Wishlist <FaHeart />{" "}
                </span>
              )}
            </button>
          </motion.div>

          <motion.div
            className="text-sm mt-6 space-y-1 text-gray-700"
            variants={fadeUpVariant}
          >
            <p className="flex items-center gap-1 dark:text-white">
              <span className="font-medium dark:text-white">Rate:</span>{" "}
              {product.avgRating || "N/A"} <FaStar className="text-amber-400" />
            </p>
            <p className="dark:text-white">
              <span className="font-medium dark:text-white">Brand:</span>{" "}
              {product.brand.name || "N/A"}
            </p>
            <p className="dark:text-white">
              <span className="font-medium dark:text-white">Category:</span>{" "}
              {product.category.name || "N/A"}
            </p>
            <p className="dark:text-white">
              <span className="font-medium dark:text-white ">Handmade:</span>{" "}
              Yes
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
