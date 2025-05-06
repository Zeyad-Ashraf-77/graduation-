import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function SubCategory() {
  const [subCategory, setSubCategory] = useState([])
  const {id} = useParams()

  async function getSubCategory(id:string){
        const {data} = await axios.get(`https://project1-kohl-iota.vercel.app/sub-category/${id}`, {
          headers: { Authorization: localStorage.getItem("authorization") },
        })
        console.log( data.subCategories);
        setSubCategory(data.subCategories)
        
       } 





         useEffect(() => {
            if (id) {
              getSubCategory(id);
            }
         }, [id]);
       
  return (
    <>
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  "  > 
        {subCategory.map((subCategory: any) => (    
<figure key={subCategory._id} className="relative rounded-2xl shadow-2xl shadow-yellow-600 hover:scale-105 max-w-sm transition-all duration-300 cursor-pointer filter  hover:grayscale-0">
  <a href="#">
    <img className="rounded-lg min-w-[400px] min-h-[400px] max-w-[400px] max-h-[400px] object-cover " src={subCategory.image.secure_url} alt="image description" />
  </a>
  <figcaption className="absolute px-4 text-lg text-white bottom-6">
      <p className='font-bold text-center' >{subCategory.name}</p>
  </figcaption>
</figure>
        ))}
  
        
      </div>


    </>
  )
}
