import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import type { CategoryType } from "../Interfaces/Interfaces";
import { Link } from "react-router-dom";
// import image from "../../assets/images/wooden-art-pieces-painting-process.jpg"
export default function Category() {
 const [category, setCategory] = useState([])
   
   
    // console.log("userToken", userToken);
    async function getCategory(){
    const {data} = await axios.get(`https://project1-kohl-iota.vercel.app/category`, {
      headers: { Authorization: localStorage.getItem("authorization") },
    })
    console.log( data.categories);
    setCategory(data.categories)
   } 




  useEffect(() => {
    getCategory()
  }, []);




  return (
    <>
      <div className="py-32 bg-[url('/src/assets/images/pin/category.jpg')]  hero bg-cover bg-center bg-slate-900 text-white text-center " >
        <h1>Cadiz Collection</h1>
        <p className="mt-2 " >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>

      <div className="mt-10 container mx-auto  " >
        <h2 className=" text-center" >Browse Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          
     {category.map((c:CategoryType) => (
      <div key={c._id} className="max-w-sm cardCategory bg-black/30 hover:scale-105 duration-150 text-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"> 
        <a href="#">
            <img src={c.image.secure_url} className="rounded-t-lg w-full max-h-[200px] object-cover" alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-white text-2xl font-bold tracking-tight  dark:text-white">{c.name.toUpperCase()}</h5>
            </a>
            <Link to={`/Subcategory/${c.name}`}className="inline-flex btn items-center w-full text-center  px-3 py-2 text-sm font-medium mx-auto text-white bg-amber-800 rounded-lg hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
