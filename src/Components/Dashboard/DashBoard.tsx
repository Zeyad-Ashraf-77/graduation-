import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [categoryDs, setCategoryDs] = useState<{ _id: string; name: string }[]>([]);
  const [brandsDs, setBrandsDs] = useState<{ _id: string; name: string }[]>([]);
  const [userDs, setUserDs] = useState<{ _id: string; name: string; email: string; role: string; isBlocked: boolean }[]>([]);
  const [categoryNum, setCategoryNum] = useState(0);
  const [userNum, setUserNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function getCategory() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/category`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      setCategoryDs(data.categories);
      setCategoryNum(data.categories.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getDashBoard() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/users/dashboard`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      setUserDs(data.data[1].value);
      setUserNum(data.data[0].value.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getBrands() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://project1-kohl-iota.vercel.app/brand`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
      setBrandsDs(data.brands);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function delateBrands(id: string) {
    try {
      setIsLoading(true);
      await axios.delete(`https://project1-kohl-iota.vercel.app/brand/delete/${id}`, {
        headers: { Authorization: localStorage.getItem("authorization") },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
    getBrands();
    getDashBoard();
  }, []);

  const toggleBlockStatus = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-8 bg-[#f9f9f6] dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <h1 className="mt-20 text-[#4e342e] dark:text-amber-500 font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl hover:scale-108 transition-all duration-150 shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl text-[#4e342e] dark:text-amber-500 font-bold">12</p>
          <p>Products</p>
        </div>
        <div className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl text-[#4e342e] dark:text-amber-500 font-bold">{categoryNum}</p>
          <p>Categories</p>
        </div>
        <div className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl text-[#4e342e] dark:text-amber-500 font-bold">20</p>
          <p>Orders</p>
        </div>
        <div className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl text-[#4e342e] dark:text-amber-500 font-bold">{userNum}</p>
          <p>Users</p>
        </div>
      </div>

      {/* Recent Orders & Manage Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-stone-100 dark:bg-gray-800 rounded-2xl overflow-x-auto">
          <h2 className="text-lg bg-[#432d0c] dark:bg-amber-700 text-white p-4 rounded-t-2xl font-semibold mb-4">
            Recent Orders
          </h2>
          <table className="min-w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Order ID</th>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Date</th>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Customer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">#1001</td>
                <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">04/22/2024</td>
                <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">John Doe</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>

        {/* Manage Categories */}
        <div className="bg-stone-100 dark:bg-gray-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-amber-500">Manage Categories</h2>
          <ul className="space-y-2">
            {categoryDs.map((category) => (
              <li
                key={category._id}
                className="bg-[#efebd9] dark:bg-gray-700 flex items-center justify-between rounded-xl px-3 py-2"
              >
                <span>{category.name}</span>
                <FaTrash className="text-red-600 cursor-pointer text-xl" />
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/layoutAdmin/createCategory")}
                className="mt-2 bg-yellow-800 dark:bg-amber-700 font-bold text-white w-full border rounded-lg px-3 py-2 text-center"
              >
                + Add Category
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
