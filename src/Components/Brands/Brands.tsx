import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Brand {
  _id: string;
  name: string;
  description?: string;
  image?: { secure_url: string };
}

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://project1-kohl-iota.vercel.app/brand", {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      })
      .then((res) => setBrands(res.data.brands))
      .catch(() => setBrands([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="bg-beige container  mx-auto min-h-screen mt-20 py-10 px-4 md:px-10">
      <h1 className="text-3xl dark:text-amber-500 md:text-4xl font-bold text-center mb-10">Brands</h1>
      {isLoading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* Placeholder أثناء اللودينج */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 animate-pulse p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4 w-80 h-44 bg-gray-400 rounded"></div>
              <div className="h-6 bg-gray-400 rounded w-32 mb-2"></div>
              <div className="h-10 bg-gray-400 rounded w-24"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white p-6 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500 shadow-amber-400 shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {brand.image?.secure_url ? (
                  <img
                    src={brand.image.secure_url}
                    alt={brand.name}
                    className="w-80 h-44 object-cover border-2 border-amber-400 mx-auto"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full text-4xl">
                    🏷️
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">{brand.name}</h2>
              <button
                onClick={() => navigate(`/category`)}
                className="bg-[#a9690a] text-amber-50 border font-medium px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
              >
                Visit Brand
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brands;