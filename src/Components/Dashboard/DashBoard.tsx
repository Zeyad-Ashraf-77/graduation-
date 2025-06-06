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
  const [ordersDs, setOrdersDs] = useState<{ _id: string; orderId: string; date: string; customer: string }[]>([]);
  const [productsDs, setProductsDs] = useState<{ _id: string; name: string; price: number }[]>([]);
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
  async function getOrders() {
    const{data}= await axios.get(`https://project1-kohl-iota.vercel.app/order`, {
      headers: { Authorization: localStorage.getItem("authorization") },
    });
    console.log(data.orders);
    setOrdersDs(data.orders);
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
    getOrders();
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
          <p className="text-4xl  text-[#4e342e] dark:text-amber-500 font-bold">12</p>
          <p className='dark:text-white' >Products</p>
        </div>
        <div className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl  text-[#4e342e] dark:text-amber-500 font-bold">{categoryNum}</p>
          <p className='dark:text-white' >Categories</p>
        </div>
        <div className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl  text-[#4e342e] dark:text-amber-500 font-bold">{ordersDs.length}</p>
          <p className='dark:text-white' >Orders</p>
        </div>
        <div className="rounded-2xl hover:scale-105 transition-all shadow-lg shadow-yellow-500 bg-stone-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-4xl  text-[#4e342e] dark:text-amber-500 font-bold">{userNum}</p>
          <p className='dark:text-white' >Users</p>
        </div>
      </div>

      {/* Recent Orders & Manage Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-stone-100 dark:bg-gray-800 rounded-2xl overflow-x-auto">
          <h2 className="text-lg bg-[#432d0c] dark:bg-amber-700 text-white p-4 rounded-t-2xl font-semibold mb-4">
            Recent Orders
          </h2>
          <div className="max-h-[400px] overflow-y-auto">
          <table onClick={()=>navigate('/orders')} className="min-w-full cursor-pointer text-sm">
            <thead className="border-b sticky top-0 bg-stone-100 dark:bg-gray-800">
              <tr>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Order ID</th>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Date</th>
                <th className="text-left text-[#4e342e] dark:text-amber-500 py-2 px-2">Customer</th>
              </tr>
            </thead>
            <tbody>
              {ordersDs.slice(0, 10).map((order, index) => (
                <tr key={index}>
                  <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">{order.id}</td>
                  <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">{order.updatedAt}</td>
                  <td className="py-2 text-[#4e342e] dark:text-gray-200 px-2">{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Manage Categories */}
        <div className="bg-stone-100 dark:bg-gray-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-amber-500">Manage Categories</h2>
          <ul className="space-y-2">
            {categoryDs.map((category) => (
              <li
                key={category._id}
                className="bg-[#efebd9] dark:text-white dark:bg-gray-700 flex items-center justify-between rounded-xl px-3 py-2"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
      
        {/* Manage Categories */}
        <div className="bg-stone-100 dark:bg-gray-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-amber-500">Manage Brands</h2>
          <ul className="space-y-2">
            {brandsDs.map((brand) => (
              <li
                key={brand._id}
                className="bg-[#efebd9] dark:bg-gray-700 dark:text-white flex items-center justify-between rounded-xl px-3 py-2"
              >
                <span>{brand.name}</span>
                <FaTrash className="text-red-600 cursor-pointer text-xl" />
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/layoutAdmin/createBrand")}
                className="mt-2 bg-yellow-800 dark:bg-amber-700 font-bold text-white w-full border rounded-lg px-3 py-2 text-center"
              >
                + Add Brand
              </button>
            </li>
          </ul>
        </div>
        <div className="bg-stone-100 dark:bg-gray-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-amber-500">Manage Categories</h2>
          <ul className="space-y-2">
            {userDs.map((category) => (
              <li
                key={category._id}
                className="bg-[#efebd9] dark:bg-gray-700 dark:text-white flex items-center justify-between rounded-xl px-3 py-2"
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
        <div className="border  dark:border-green-50 rounded-lg p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold dark:text-white mb-4">Users</h2>
        <table className="min-w-full text-sm">
          <thead className="border-b dark:border-green-50 ">
            <tr>
              <th className="px-4 dark:text-white  py-2">ID</th>
              <th className="px-4 dark:text-white  py-2">Name</th>
              <th className="px-4 dark:text-white  py-2">Email</th>
              <th className="px-4 dark:text-white  py-2">Role</th>
              <th className="px-4 dark:text-white  py-2">Status</th>
              <th className="px-4 dark:text-white  py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userDs.map((user) => (
              <tr key={user._id} className="border-b hover:bg-amber-100 dark:border-green-50 ">
                <td className="px-4  dark:text-white  py-2">{user._id}</td>
                <td className="px-4  dark:text-white  py-2">{user.name}</td>
                <td className="px-4  dark:text-white  py-2">{user.email}</td>
                <td className="px-4  dark:text-white  py-2">{user.role}</td>
                <td className="px-4  dark:text-white  py-2">
                  <span className={user.isBlocked ? 'text-red-500' : 'text-green-500'}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleBlockStatus(user.id)}
                    className={`px-3 py-1 rounded text-white ${
                      user.isBlocked ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
