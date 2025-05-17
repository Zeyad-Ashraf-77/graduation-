import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaStar, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../Interfaces/Interfaces";
import { MdEditSquare } from "react-icons/md";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // حالة اللودينج
  const [isLoading1, setIsLoading1] = useState(false); // حالة اللودينج للزر
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
        toast.error("Error fetching products!");
      })
      .finally(() => {
        setIsLoading(false); // إيقاف اللودينج بعد جلب البيانات
      });
  }

  async function addToCart(productId: string) {
    try {
      setIsLoading1(true);
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
      toast.error("Error adding product to cart!");
    } finally {
      setIsLoading1(false);
    }
  }
  async function addToWishlist(productId: string) {
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
      toast.success("Product added to wishlist successfully!");
    } catch (error) {
      console.log("Error adding to wishlist:", error);
      toast.error("Error adding product to wishlist!");
    }
  }

  async function deleteProduct(productId: string) {
    try {
      const { data } = await axios.delete(
        `https://project1-kohl-iota.vercel.app/product/delete/${productId}`,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error("Error deleted product to wishlist!");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getProducts();
  }, [products]);

  return (
    <div className="bg-[#f9f9f6] container mx-auto dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-16 font-sans min-h-screen">
      <ToastContainer />
      {/* Products Grid */}
      <section className="py-12 px-4 md:px-12 lg:px-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className=" font-bold text-center mb-10 dark:text-amber-500">
          All Products
        </h1>

        {/* Placeholder for adding a new product */}
        {localStorage.getItem("role") === "crafter" && (
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
        )}

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
                className="bg-white  dark:bg-gray-800 rounded shadow-lg hover:shadow-2xl duration-500 hover:shadow-yellow-500 p-4 transition"
                >
                  <div className="h-48 bg-gray-200 rounded mb-4 dark:bg-gray-700">
                    <img
                  onClick={() => navigate(`/productDetails/${product._id}`)}
                      src={product.imageCover.secure_url}
                      className="w-full h-full object-cover rounded-md bg-center"
                      alt={product.name}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-amber-500">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {product.describtion}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-brown-600 dark:text-amber-400 font-bold mb-2">
                      ${product.price}
                    </p>
                    <p className="text-brown-600 dark:text-amber-400 font-bold mb-2 flex items-center gap-1">
                      <FaStar className="text-yellow-500" /> {product.rate}
                    </p>
                  </div>
                  <div className="flex justify-between   gap-1 items-center">
                    <button
                      onClick={() => addToCart(product._id)}
                      type="button"
                      className="py-2.5 w-full px-5 me-2 mb-2 text-sm font-bold focus:outline-none bg-[#a9690a] text-white rounded-lg border border-gray-200 hover:bg-yellow-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-amber-700 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-amber-600"
                    >
                      {isLoading1 ? "Loading..." : "Add To Cart"}
                    </button>
                    <FaHeart
                      onClick={() => addToWishlist(product.id)}
                      className="text-3xl   text-red-600 cursor-pointer"
                    />
                       {localStorage.getItem('role')==='admin'&&  <div onClick={()=>deleteProduct(product._id)} className="text-white flex hover:scale-110 transition-all hover:text-yellow-600 items-center gap-1 rounded-2xl hover:bg-red-800  cursor-pointer px-3 py-3 bg-red-700 " >
                     <FaTrash/>
                    </div>}
                    </div>
                    <div className="flex gap-1 items-center justify-evenly " >
                   
                    {localStorage.getItem('id')==product.userId&& 
                    <>
                    <div onClick={()=>deleteProduct(product._id)} className="text-white flex items-center gap-1 rounded-2xl hover:bg-red-800  cursor-pointer px-2 py-2 bg-red-600 " >
                      Delete <FaTrash/>
                    </div>
                    <div onClick={()=>navigate(`/updateProduct/${product._id}`)} className="text-white flex items-center gap-1 rounded-2xl hover:bg-green-800  cursor-pointer px-2 py-2 bg-green-800 " >
                     Update <MdEditSquare />

                    </div> </> }
                  
                  </div>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}
