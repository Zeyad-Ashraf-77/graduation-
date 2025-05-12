import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

interface Brand {
  _id: string;
  name: string;
  description?: string;
  image?: { secure_url: string };
}

export default function MainSlider() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://project1-kohl-iota.vercel.app/brand", {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      })
      .then((res) => setBrands(res.data.brands))
      .catch(() => setBrands([]))
      .finally(() => setIsLoading(false));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  if (isLoading) {
    return <div className="h-[350px] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center px-6 py-10">

  

      {/* السلايدر */}
      <div className="relative">
        <Slider {...settings}>
          {brands.map((brand) => (
            <div key={brand._id} className="h-[350px] flex items-center justify-center">
              <div className="flex w-full h-full bg-gradient-to-r from-yellow-100 via-amber-100 to-yellow-200 rounded-2xl shadow-2xl overflow-hidden">
                <div className="w-[100%] h-[350px] flex items-center justify-center bg-gradient-to-br from-amber-200 to-yellow-400">
                  {brand.image?.secure_url ? (
                    <img
                      src={brand.image.secure_url}
                      className=" w-full rounded-2xl h-full border-2 bg-center  border-yellow-900 shadow-xl object-cover  transition-transform duration-500 hover:scale-105"
                      alt={brand.name}
                    />
                  ) : (
                    <div className="w-80 h-80 flex items-center justify-center bg-gray-200 rounded-full text-7xl border-8 border-yellow-900 shadow-xl">
                      🏷️
                    </div>
                  )}
                </div>
             
              </div>
            </div>
          ))}
        </Slider>
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] rounded-2xl bg-yellow-200 opacity-30 blur-2xl z-0"></div>
      </div>
            {/* الصور الثابتة */}
          <div className="grid grid-cols-2 gap-4">
        <img
          src="/src/assets/images/static1.jpg"
          alt="Static 1"
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
        <img
          src="/src/assets/images/static2.jpg"
          alt="Static 2"
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
        <img
          src="/src/assets/images/static3.jpg"
          alt="Static 3"
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
        <img
          src="/src/assets/images/static4.jpg"
          alt="Static 4"
          className="w-full h-44 object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}