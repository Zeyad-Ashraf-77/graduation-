import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartItem } from "../Interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productLength, setProductLength] = useState(0);
  const navigate = useNavigate();

  async function getCart() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/cart`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      setCart(data.cart[0].products);
      setProductLength(data.cart[0].products.length);
      console.log(data.cart[0].products);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Error fetching cart!");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    try {
      setIsLoading(true);
      const { data } = await axios.patch(
        `https://project1-kohl-iota.vercel.app/cart/update`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Quantity updated:", data);
      getCart();
      toast.success("Quantity updated successfully!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error updating quantity!");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteItem(productId: string) {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        "https://project1-kohl-iota.vercel.app/cart/remove",
        {
          data: { productId },
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Item deleted:", data);
      getCart();
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error("Error deleting item!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function clearCart() {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        `https://project1-kohl-iota.vercel.app/cart/clear`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Cart cleared:", data);
      getCart();
      toast.success("Cart cleared successfully!");
    } catch (error) {
      toast.error("Error clearing cart!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );

  useEffect(() => {
    getCart();
  }, []);

  // تأكد من تحويل القيم الرقمية بشكل صحيح
  const totalInt = Number(total);
  useEffect(() => {
    if (isNaN(totalInt)) {
      toast.error("Total is not a valid number!");
    }
  }, [totalInt]);
  if (isNaN(totalInt)) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="h-screen bg-amber-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* إذا كانت السلة فارغة */}
      {productLength === 0 ? (
        <div className="h-screen bg-amber-50 flex items-center justify-center">
          <ToastContainer />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl container mx-auto p-6 bg-white shadow-amber-300 rounded-2xl shadow-lg mt-28 mb-20 space-y-6">
          <h1 className="font-bold text-center text-gray-800 mb-6">Cart 🛒</h1>

          {cart.map((item) =>
            item.productId ? (
              <div
                key={item.productId._id}
                className="relative flex flex-col sm:flex-row justify-between items-center bg-gray-200 p-4 rounded-xl shadow-sm gap-4 group"
              >
                {/* صورة المنتج */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-4xl">
                    <img
                      src={
                        item.productId?.imageCover?.secure_url ||
                        "../assets/images/download.png"
                      }
                      className="sm:w-44 h-28 rounded-2xl object-cover"
                      alt=""
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.productId.name}
                    </h2>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>

                {/* التحكم في الكمية */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity - 1)
                      }
                      className="px-3 py-1 text-lg bg-red-700 font-bold text-white duration-150 cursor-pointer"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity + 1)
                      }
                      className="px-3 py-1 text-lg bg-lime-500 text-white font-bold duration-150 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xl flex items-center gap-2 flex-col font-bold bg-lime-400 text-gray-700 px-4 py-2 rounded-md">
                    <span className="line-through bg-red-600 text-white">
                      Before discount: ${item.productId.price}
                    </span>
                    <span>After discount: ${item.finalPrice}</span>
                  </div>
                </div>

                {/* زر الحذف */}
                <div
                  onClick={() => deleteItem(item.productId._id)}
                  className="absolute w-20 bg-red-600 bg-opacity-80 text-white flex items-center justify-center text-xl font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  Delete
                </div>
              </div>
            ) : null
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-4">
            <h3 className="text-xl font-bold text-gray-800">Total</h3>
            <span className="text-xl font-bold text-black">
              ${Math.round(total)}
            </span>
          </div>

          <button
            onClick={() => navigate("/orderForm")}
            className="w-full mt-4 font-bold bg-yellow-700 text-white py-3 rounded-xl text-lg hover:bg-yellow-500 transition"
          >
            Checkout
          </button>
          <button
            onClick={clearCart}
            className="w-full mt-4 font-bold bg-red-700 text-white py-3 rounded-xl text-lg hover:bg-red-500 transition"
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
