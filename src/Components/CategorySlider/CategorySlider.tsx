import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, useEffect } from "react";

export default function CategorySlider() {
 const [categorySlider, setCategorySlider] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
 function fetchCategorySlider() {
      setIsLoading(true)
    axios.get("https://project1-kohl-iota.vercel.app/category", {
      headers: { Authorization: localStorage.getItem("authorization") },
    }).then(response => {
      console.log(response.data.categories);
      setCategorySlider(response.data.categories);
      setIsLoading(false)
    }).catch(error => {
      console.error("Error fetching category slider:", error);
    });
 }

 useEffect(()=>{
    fetchCategorySlider()
 },[])

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <div className="  flex justify-center items-center mb-32">
          <div className="loader2"></div>
        </div>
      ) : (
        <Slider {...settings}>
          {categorySlider.map((c: { _id: Key | null | undefined; image: string | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <div key={c._id}>
              <img src={c.image.secure_url} className="w-full h-60 object-cover " alt="" />
              <span className="flex justify-center items-center   shadow-lg rounded-xl m-2">
                <h2 className=" font-bold text-sm text-slate-600 mt-3">
                  {c.name}
                </h2>
              </span>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
