import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import type { CategoryType } from "../Interfaces/Interfaces";
import { Link } from "react-router-dom";

export default function Category() {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true); // حالة اللودينج

  async function getCategory() {
    try {
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/category`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      console.log(data.categories);
      setCategory(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false); // إيقاف اللودينج بعد جلب البيانات
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="py-32 bg-[url('/src/assets/images/pin/category.jpg')] hero bg-cover bg-center bg-slate-900 text-white text-center dark:bg-gray-900">
        <h1 className="text-4xl font-bold dark:text-amber-500">Cadiz Collection</h1>
        <p className="mt-2 text-lg dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      {/* Categories Section */}
      <div className="mt-10 container mx-auto light:bg-yellow-500 p-10 rounded-2xl dark:bg-gray-800 ">
        <h2 className="text-center text-3xl font-bold mb-6 dark:text-amber-500">
          Browse Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {isLoading
            ? // عرض كروت Placeholder أثناء اللودينج
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="max-w-sm bg-gray-300 animate-pulse rounded-lg shadow-sm dark:bg-gray-800"
                >
                  <div className="h-48 bg-gray-400 rounded-t-lg dark:bg-gray-700"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-400 rounded mb-4 dark:bg-gray-700"></div>
                    <div className="h-10 bg-gray-400 rounded dark:bg-gray-700"></div>
                  </div>
                </div>
              ))
            : // عرض الكروت الفعلية بعد تحميل البيانات
              category.map((c: CategoryType) => (
                <div
                  key={c._id}
                  className="max-w-sm cardCategory bg-white hover:scale-105 duration-150 text-gray-800 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <a href="#">
                    <img
                      src={c.image.secure_url}
                      className="rounded-t-lg w-full max-h-[200px] object-cover"
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-gray-800 text-2xl font-bold tracking-tight dark:text-amber-500">
                        {c.name.toUpperCase()}
                      </h5>
                    </a>
                    <Link
                      to={`/Subcategory/${c.name}`}
                      className="inline-flex btn items-center w-full text-center px-3 py-2 text-sm font-medium mx-auto text-white bg-amber-800 rounded-lg hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600 dark:focus:ring-amber-800"
                    >
                      Browse
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
