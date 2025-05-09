// import React from "react";

// export default function ProductListPage() {
//   return (
//     <div className="bg-[#f9f9f6] text-gray-800 font-sans min-h-screen">
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 shadow bg-white">
//         <h1 className="text-2xl font-bold text-brown-800">Handmade Store</h1>
//         <nav className="space-x-4 hidden md:block">
//           <a href="#" className="hover:text-brown-600">Home</a>
//           <a href="#" className="hover:text-brown-600 font-semibold">Products</a>
//           <a href="#" className="hover:text-brown-600">About</a>
//           <a href="#" className="hover:text-brown-600">Contact</a>
//         </nav>
//         <button className="bg-brown-500 text-white px-4 py-2 rounded hover:bg-brown-600">Login</button>
//       </header>

//       {/* Products Grid */}
//       <section className="py-12 px-4 md:px-12 lg:px-20">
//         <h2 className="text-3xl font-bold text-center mb-10">All Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, i) => (
//             <div key={i} className="bg-white rounded shadow hover:shadow-2xl duration-500 hover:shadow-yellow-500 p-4 transition">
//               <div className="h-48 bg-gray-200 rounded mb-4"></div>
//               <h3 className="text-lg font-semibold mb-2">Handmade Product {i + 1}</h3>
//               <p className="text-brown-600 font-bold mb-2">$30.00</p>
//               <button type="button" className="py-2.5 w-full px-5 me-2 mb-2 text-sm  font-bold focus:outline-none bg-[#a9690a] text-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>
//             </div>
//           ))}
//         </div>
//       </section>

  
//     </div>
//   );
// }

import React, { useState } from "react";

export default function ProductListPage() {
  const [showForm, setShowForm] = useState(false);

  // Toggle form visibility
  const handleAddProductClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="bg-[#f9f9f6] text-gray-800 font-sans min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-brown-800">Handmade Store</h1>
        <nav className="space-x-4 hidden md:block">
          <a href="#" className="hover:text-brown-600">Home</a>
          <a href="#" className="hover:text-brown-600 font-semibold">Products</a>
          <a href="#" className="hover:text-brown-600">About</a>
          <a href="#" className="hover:text-brown-600">Contact</a>
        </nav>
        <button className="bg-brown-500 text-white px-4 py-2 rounded hover:bg-brown-600">Login</button>
      </header>

      {/* Products Grid */}
      <section className="py-12 px-4 md:px-12 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">All Products</h2>
        
        {/* Placeholder for adding a new product */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          <div
            onClick={handleAddProductClick}
            className="bg-gray-200 rounded shadow hover:shadow-2xl duration-500 hover:shadow-yellow-500 p-4 cursor-pointer flex items-center justify-center text-center text-brown-600 font-bold"
          >
            <p>Add New Product</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded shadow hover:shadow-2xl duration-500 hover:shadow-yellow-500 p-4 transition">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Handmade Product {i + 1}</h3>
              <p className="text-brown-600 font-bold mb-2">$30.00</p>
              <button type="button" className="py-2.5 w-full px-5 me-2 mb-2 text-sm  font-bold focus:outline-none bg-[#a9690a] text-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Alternative</button>
            </div>
          ))}
        </div>

        {/* Form for adding new product */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h3 className="text-2xl font-bold mb-4">Add New Product</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" id="productName" className="w-full border border-gray-300 rounded-md p-2" placeholder="Enter product name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="number" id="productPrice" className="w-full border border-gray-300 rounded-md p-2" placeholder="Enter price" />
                </div>
                <div className="mb-4">
                  <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <input type="file" id="productImage" className="w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddProductClick}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
