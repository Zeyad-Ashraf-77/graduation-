import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../Interfaces/Interfaces';

const CartWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/cart`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      setCartItems(data.cart[0].products);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart items.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) {
    return (
      <button
        onClick={toggleOpen}
        className="fixed bottom-5 right-5 flex items-center bg-amber-500 text-white shadow-lg rounded-full px-8 py-2"
      >
        <FiShoppingCart className="w-6 h-6 mr-2" />
        <span className="font-semibold">View Cart</span>
        {totalItems > 0 && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {totalItems}
          </div>
        )}
      </button>
    );
  }

  const renderCartContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-8">
          <FaSpinner className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      );
    }

    if (error) {
      return <p className="text-center p-4 text-red-500">{error}</p>;
    }

    if (cartItems.length === 0) {
      return (
        <div className="text-center p-8">
          <FiShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="font-semibold text-lg">Your cart is empty</h3>
          <p className="text-sm text-gray-500">
            Add items to your cart to see them here.
          </p>
        </div>
      );
    }

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.finalPrice * item.quantity,
      0
    );

    return (
      <>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.productId._id} 
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              onClick={() => {
                navigate(`/productDetails/${item.productId._id}`);
                setIsOpen(false);
              }}
            >
              <img
                src={item.productId?.imageCover?.secure_url || "../assets/images/download.png"}
                alt={item.productId.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{item.productId.name}</h4>
                <p className="text-xs text-gray-500">
                  {item.quantity} x ${item.finalPrice.toFixed(2)}
                </p>
              </div>
              <p className="font-semibold text-sm">
                ${(item.finalPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="w-full bg-amber-500 text-white text-center font-bold py-2 px-4 rounded-lg hover:bg-amber-600"
          >
            Go to Cart
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 h-[500px]">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-lg">Your Cart</h2>
        <button
          onClick={toggleOpen}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FiX />
        </button>
      </div>
      {renderCartContent()}
    </div>
  );
};

export default CartWidget; 