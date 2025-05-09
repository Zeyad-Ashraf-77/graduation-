import React from "react";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Handmade Crafts",
      desc: "Crafted items made by skilled artisans.",
      emoji: "🧺",
      price: 25,
      quantity: 1,
    },
    {
      id: 2,
      name: "Ceramic Bowl",
      desc: "Hand-painted pottery piece",
      emoji: "🥣",
      price: 40,
      quantity: 2,
    },
    {
      id: 3,
      name: "Macrame Bracelet",
      desc: "Woven cord bracelet",
      emoji: "🧵",
      price: 15,
      quantity: 1,
    },
    {
      id: 4,
      name: "Soy Candle",
      desc: "Eco-friendly wax candle",
      emoji: "🕯️",
      price: 30,
      quantity: 3,
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className=" max-w-6xl container mx-auto p-6 bg-white shadow-amber-300  rounded-2xl shadow-lg mt-28 mb-20 space-y-6">
      <h1 className=" font-bold text-center text-gray-800 mb-6"> Cart 🛒</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center bg-gray-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{item.emoji}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button className="px-3 py-1 text-lg bg-red-700 font-bold text-white  duration-150 cursor-pointer ">-</button>
              <span className="px-4">{item.quantity}</span>
              <button className="px-3 py-1 text-lg bg-lime-500  text-white font-bold duration-150 cursor-pointer">+</button>
            </div>
            <div className="text-xl font-bold bg-lime-400 text-gray-700">${item.price}</div>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center border-t pt-4">
        <h3 className="text-xl font-bold text-gray-800">Total</h3>
        <span className="text-xl font-bold text-black">${total}</span>
      </div>

      <button className="w-full mt-4 font-bold bg-yellow-700 text-white py-3 rounded-xl text-lg  hover:bg-yellow-500 transition">
        Checkout
      </button>
    </div>
  );
};

export default Cart;
