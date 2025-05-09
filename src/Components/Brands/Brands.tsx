import React from "react";

const brands = [
  {
    name: "Artisan Creations",
    description: "Handcrafted goods made with care",
    image: "🖐️",
  },
  {
    name: "Handmade Haven",
    description: "Unique handmade treasures",
    image: "🌸",
  },
  {
    name: "The Artisan Studio",
    description: "Handmade with love and skill",
    image: "🧶",
  },
  {
    name: "Rustic Crafts",
    description: "Rustic and charming handmade items",
    image: "❄️",
  },
  {
    name: "Creative Hands",
    description: "Creative and unique crafts",
    image: "✋",
  },
  {
    name: "Artisan Alley",
    description: "Handcrafted artisan products",
    image: "🏺",
  },
  {
    name: "Maker’s Market",
    description: "Handmade goods from local makers",
    image: "🧵",
  },
  {
    name: "Handcrafted Joy",
    description: "Bringing joy through handmade goods",
    image: "❤️",
  },
  {
    name: "Artistry Unlocked",
    description: "Unlocking creativity through crafts",
    image: "🌼",
  },
];

const Brands = () => {
  return (
    <div className="bg-beige min-h-screen mt-20 py-10 px-4 md:px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">البراندات</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-amber-400 shadow-md flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4">{brand.image}</div>
            <h2 className="text-xl font-semibold mb-2">{brand.name}</h2>
            <p className="text-gray-600 mb-4 text-sm">{brand.description}</p>
            <button className="bg-[#a9690a]  text-amber-50 border border-black font-medium px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">
              Visit Brand
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;