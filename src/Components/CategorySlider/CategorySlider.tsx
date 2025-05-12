// import Slider from "react-slick";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, useEffect } from "react";

// export default function CategorySlider() {
//  const [categorySlider, setCategorySlider] = useState([]);
//   const [isLoading, setIsLoading] = useState(false)
//  function fetchCategorySlider() {
//       setIsLoading(true)
//     axios.get("https://project1-kohl-iota.vercel.app/category", {
//       headers: { Authorization: localStorage.getItem("authorization") },
//     }).then(response => {
//       console.log(response.data.categories);
//       setCategorySlider(response.data.categories);
//       setIsLoading(false)
//     }).catch(error => {
//       console.error("Error fetching category slider:", error);
//     });
//  }

//  useEffect(()=>{
//     fetchCategorySlider()
//  },[])

//   const settings = {
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 4000,
//     slidesToShow: 7,
//     slidesToScroll: 2,
//     autoplay: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//           autoplay: true,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           autoplay: true,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       {isLoading ? (
//         <div className="  flex justify-center items-center mb-32">
//           <div className="loader2"></div>
//         </div>
//       ) : (
//         <Slider {...settings}>
//           {categorySlider.map((c: { _id: Key | null | undefined; image: string | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
//             <div key={c._id}>
//               <img src={c.image.secure_url} className="w-full h-60 object-cover " alt="" />
//               <span className="flex justify-center items-center   shadow-lg rounded-xl m-2">
//                 <h2 className=" font-bold text-sm text-slate-600 mt-3">
//                   {c.name}
//                 </h2>
//               </span>
//             </div>
//           ))}
//         </Slider>
//       )}
//     </>
//   );
// }
import {  useEffect, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';



export default function Categories() {
  const [images, setimages] = useState([])



  async function getBrand() {
      try {
        const {data} = await axios.get("https://project1-kohl-iota.vercel.app/brand", { headers: { Authorization: localStorage.getItem("authorization") } });
        // console.log(response.data.brands);
        setimages(data.brands)  
    

      } catch (error) {
        console.error("Error fetching brand:", error);
        setLoder(false)

      }
    }

    useEffect(() => {
      getBrand();
    }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };
return (
   <>
   <div className=" py-5 transition-colors duration-500 bg-white dark:bg-gray-900  px-4">
      <div className="container mx-auto">
        <Slider {...settings}>
          {images.map((img: any) => (
            <div key={img._id} className="px-2">
              <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl shadow-lg group transition-all duration-300 hover:shadow-2xl">
                <img
                  src={img.image?.secure_url}
                  alt={img.name}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
   </>
  );
}