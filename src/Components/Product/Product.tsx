import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // حالة اللودينج
  const navigate = useNavigate();

  function getProducts() {
    axios
      .get(`https://project1-kohl-iota.vercel.app/product`)
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // إيقاف اللودينج بعد جلب البيانات
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-[#f9f9f6] dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-16 font-sans min-h-screen">
      {/* Products Grid */}
      <section className="py-12 px-4 md:px-12 lg:px-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-amber-500">
          All Products
        </h2>

        {/* Placeholder for adding a new product */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          <div
            onClick={() => navigate("/addProduct")}
            className="bg-gray-200 dark:bg-gray-700 rounded shadow hover:shadow-2xl duration-500 hover:shadow-yellow-500 p-4 cursor-pointer flex items-center justify-center text-center text-brown-600 dark:text-amber-500 font-bold"
          >
            <p className="text-lg flex items-center justify-center">
              Add New Product <IoIosAddCircle className="ml-1 text-2xl" />
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? // عرض كروت Placeholder أثناء اللودينج
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 animate-pulse rounded shadow p-4 dark:bg-gray-800"
                >
                  <div className="h-48 bg-gray-400 rounded mb-4 dark:bg-gray-700"></div>
                  <div className="h-6 bg-gray-400 rounded mb-2 dark:bg-gray-700"></div>
                  <div className="h-6 bg-gray-400 rounded mb-2 dark:bg-gray-700"></div>
                  <div className="h-10 bg-gray-400 rounded dark:bg-gray-700"></div>
                </div>
              ))
            : // عرض الكروت الفعلية بعد تحميل البيانات
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-800 rounded shadow hover:shadow-2xl duration-500 hover:shadow-yellow-500 p-4 transition"
                >
                  <div className="h-48 bg-gray-200 rounded mb-4 dark:bg-gray-700">
                    <img
                      src={product.imageCover.secure_url}
                      className="w-full h-full object-cover rounded-md bg-center"
                      alt={product.name}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-amber-500">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-brown-600 dark:text-amber-400 font-bold mb-2">
                      ${product.price}
                    </p>
                    <p className="text-brown-600 dark:text-amber-400 font-bold mb-2 flex items-center gap-1">
                      <FaStar className="text-yellow-500" /> {product.rate}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="py-2.5 w-full px-5 me-2 mb-2 text-sm font-bold focus:outline-none bg-[#a9690a] text-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-amber-700 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-amber-600"
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}
