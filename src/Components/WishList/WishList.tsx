import React, { useState } from 'react';

type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
};

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([
    {
      id: '1',
      name: 'Handmade Necklace',
      image: 'https://via.placeholder.com/300x200?text=Handmade+Necklace',
      category: 'Jewelry',
      price: 25.99,
    },
    {
      id: '2',
      name: 'Knitted Scarf',
      image: 'https://via.placeholder.com/300x200?text=Knitted+Scarf',
      category: 'Accessories',
      price: 18.5,
    },
    {
      id: '3',
      name: 'Clay Mug',
      image: 'https://via.placeholder.com/300x200?text=Clay+Mug',
      category: 'Home Decor',
      price: 32,
    },
  ]);

  const addToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // هنا تحط منطق الإضافة للسلة
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div className="bg-[#F2F0EF] mt-20 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg shadow-sm p-4 flex flex-col hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-md text-pink-700 font-bold mt-2">${item.price}</p>

              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => addToCart(item.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
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
