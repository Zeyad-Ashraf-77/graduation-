import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Product } from "../Interfaces/Interfaces";
import { motion } from "framer-motion"; // ← تمت الإضافة
import { FaSpinner, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [removingFromWishlist, setRemovingFromWishlist] = useState<
    string | null
  >(null);
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  async function gitWishList() {
    try {
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/product/r/washlist`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data.user.washlist);
      setWishlist(data.user.washlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  async function addToCart(productId: string) {
    try {
      setAddingToCart(productId);
      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/cart/create`,
        {
          productId,
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
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log("Error adding to cart:", error);
      toast.error("Error Product already in cart!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setAddingToCart(null);
    }
  }

  async function removeFromWishlist(productId: string) {
    try {
      setRemovingFromWishlist(productId);
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
      toast.success("Product removed from wishlist successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      gitWishList();
    } catch (error) {
      console.log("Error removing from wishlist:", error);
      toast.error("Error  removing from wishlist!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setRemovingFromWishlist(null);
    }
  }

  useEffect(() => {
    gitWishList();
  }, []);

  return (
    <div className="bg-[#F2F0EF] mt-20 min-h-screen p-6">
      <ToastContainer />
      <h1 className="font-bold mb-6 text-center text-yellow-800">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <h2 className="font-bold mb-4">Your wishlist is empty</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border-amber-400 border-2 rounded-lg shadow-sm p-4 flex flex-col hover:shadow-md"
            >
              <img
                onClick={() => navigate(`/productDetails/${item.id}`)}
                src={item.imageCover.secure_url}
                alt={item.name}
                className="h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600">{item.describtion}</p>
              <div className="flex items-center  justify-between">
                {item.subPrice ? (
                  <div>
                    <p className="text-md text-pink-700 font-bold mt-2">
                      {" "}
                      <span className=" line-through text-red-500">
                        Old Price:
                      </span>
                      ${item.price}
                    </p>
                    <p className="text-md text-pink-700 font-bold mt-2">
                      {" "}
                      <span className="text-green-500">New Price:</span>$
                      {item.subPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-md text-pink-700 font-bold mt-2">
                    ${item.price}
                  </p>
                )}
                <p className="text-md flex items-center gap-1 text-green-700 font-bold mt-2">
                  Rate: {item.rate} <FaStar className="text-yellow-400" />{" "}
                </p>
              </div>

              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => addToCart(item.id)}
                  disabled={!!addingToCart}
                  className="bg-green-500 cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-green-600 text-sm flex items-center justify-center gap-2 min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {addingToCart === item.id ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  disabled={!!removingFromWishlist}
                  className="bg-red-500 cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-red-600 text-sm flex items-center justify-center gap-2 min-w-[100px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {removingFromWishlist === item.id ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Removing...</span>
                    </>
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
