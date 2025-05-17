import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { Product } from '../Interfaces/Interfaces';



const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);


  async function gitWishList() {
    try {
        const {data}= await axios.get(`https://project1-kohl-iota.vercel.app/product/r/washlist`, {
            headers: {
                Authorization: localStorage.getItem("authorization") || "",
                "Content-Type": "application/json",
            },
        }) 
        console.log(data.user.washlist);
        setWishlist(data.user.washlist);
        
    } catch (error) {
      console.error("Error fetching wishlist:", error);
        
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
      console.log("Error adding to cart:", error);
    
    } 
   
    
  }

  async function removeFromWishlist(productId: string) {
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
      toast.success("Product removed from wishlist successfully!");
      gitWishList();
    } catch (error) {
      console.log("Error removing from wishlist:", error);
    }
  }
  useEffect(() => {
    gitWishList();
  }, []);


  return (
    <div className="bg-[#F2F0EF] mt-20 min-h-screen p-6">
        <ToastContainer />
      <h1 className=" font-bold mb-6 text-center text-yellow-800">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        
        <div className="text-center">
          <h2 className=" font-bold mb-4">Your wishlist is empty</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white hover:scale-102 duration-300 transition-all ease-in-out  border-amber-400 border-2 rounded-lg shadow-sm p-4 flex flex-col hover:shadow-md "
            >
              <img
                src={item.imageCover.secure_url}
                alt={item.name}
                className="h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.describtion}</p>
              <p className="text-md text-pink-700 font-bold mt-2">${item.price}</p>

              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => addToCart(item.id)}
                  className="bg-green-500 cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-green-600 text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 cursor-pointer text-white px-6 py-3 rounded-xl hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
