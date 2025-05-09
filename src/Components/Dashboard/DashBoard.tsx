
import axios from 'axios';
import { get } from 'http';
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
  const [categoryNum, setCategoryNum] = useState(0)
  const [userNum, setUserNum] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const navigate =  useNavigate(); 

  async function getCategory() {

    try {
      setIsLoading(true)
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/category`,
        {
          headers: { Authorization: localStorage.getItem("authorization") },
        }
      );
      // console.log(data.categories);
      setCategoryDs(data.categories);
      setCategoryNum(data.categories.length)
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
   
   
  }
  async function getDashBoard() {

    try {
      setIsLoading(true)
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/users/dashboard`,
        {
          headers: { Authorization: localStorage.getItem("authorization") },
        }
      );
      console.log(data.data[1].value);
      setUserDs(data.data[1].value);
      setUserNum(data.data[0].value.length)
    
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
   
   
  }
  async function getBrands() {

    try {
      setIsLoading(true)
      const { data } = await axios.get(
        `https://project1-kohl-iota.vercel.app/brand`,
        {
          headers: { Authorization: localStorage.getItem("authorization") },
        }
      );
      // console.log(data.brands);
      setBrandsDs(data.brands);
     
    
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
   
   
  }
  async function delateBrands(id: string) {

    try {
      setIsLoading(true)
      const { data } = await axios.delete(
        `https://project1-kohl-iota.vercel.app/brand/delete/${id}`,
        {
          headers: { Authorization: localStorage.getItem("authorization") },
        }
      );
      // console.log(data);
    
     
    
      
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
   
   
  }

  useEffect(() => {
    // const dummyUsers: User[] = [
    //   { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin', isBlocked: false },
    //   { id: 2, name: 'Sara Youssef', email: 'sara@example.com', role: 'User', isBlocked: false },
    //   { id: 3, name: 'Mohamed Nabil', email: 'mohamed@example.com', role: 'User', isBlocked: true },
    // ];
    // setUsers(dummyUsers);
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
    <div className="p-4 sm:p-6 space-y-8">
      <h1 className=" mt-20 text-[#4e342e] font-bold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl  hover:scale-108 transition-all duration-150  shadow-lg shadow-yellow-500  bg-stone-100 p-4 text-center">
          <p className="text-4xl text-[#4e342e] font-bold">12</p>
          <p>Products</p>
        </div>
        <div className="rounded-2xl  hover:scale-105 transition-all shadow-lg shadow-yellow-500  bg-stone-100 p-4 text-center">
          <p className="text-4xl text-[#4e342e] font-bold">{categoryNum}</p>
          <p>Categories</p>
        </div>
        <div className="rounded-2xl  hover:scale-105 transition-all shadow-lg shadow-yellow-500  bg-stone-100 p-4 text-center">
          <p className="text-4xl text-[#4e342e] font-bold">20</p>
          <p>Orders</p>
        </div>
        <div className="rounded-2xl  hover:scale-105 transition-all shadow-lg shadow-yellow-500  bg-stone-100 p-4 text-center">
          <p className="text-4xl text-[#4e342e] font-bold">{userNum}</p>
          <p>Users</p>
        </div>
      </div>

      {/* Recent Orders & Manage Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="  bg-stone-100 rounded-2xl lg  overflow-x-auto">
          <h2 className="text-lg  bg-[#432d0c] text-white p-4 rounded-t-2xl font-semibold mb-4">Recent Orders</h2>
          <table className="min-w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left text-[#4e342e]  py-2 px-2">Order ID</th>
                <th className="text-left text-[#4e342e]  py-2 px-2">Date</th>
                <th className="text-left text-[#4e342e]  py-2 px-2">Customer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2  text-[#4e342e]  px-2">#1001</td>
                <td className="py-2  text-[#4e342e]  px-2">04/22/2024</td>
                <td className="py-2  text-[#4e342e]  px-2">John Doe</td>
              </tr>
              <tr>
                <td className="py-2  text-[#4e342e]  px-2">#1000</td>
                <td className="py-2  text-[#4e342e]  px-2">04/21/2024</td>
                <td className="py-2  text-[#4e342e]  px-2">Jane Smith</td>
              </tr>
              <tr>
                <td className="py-2  text-[#4e342e]  px-2">#0999</td>
                <td className="py-2  text-[#4e342e]  px-2">04/21/2024</td>
                <td className="py-2  text-[#4e342e]  px-2">Alice Johnson</td>
              </tr>
              <tr>
                <td className="py-2  text-[#4e342e]  px-2">#0998</td>
                <td className="py-2  text-[#4e342e]  px-2">04/20/2024</td>
                <td className="py-2  text-[#4e342e]  px-2">Michael Brown</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Manage Categories */}
        <div className="   bg-stone-100 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Manage Categories</h2>
          <ul className="space-y-2">
            {categoryDs.map((category) => (
            
            
             <li key={category._id} className=" bg-[#efebd9] li-trash flex items-center justify-between rounded-xl px-3 py-2">
             <span>{category.name}</span> <FaTrash className='text-red-600 trash cursor-pointer text-xl' />  </li>
            ))
           

            }
           
            <li>
              <button  onClick={() => navigate("/layoutAdmin/createCategory")} className="mt-2 bg-yellow-800 font-bold text-white w-full border rounded-lg px-3 py-2 text-center">
                + Add Category
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className=" bg-stone-100 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Manage SubCategories</h2>
          <ul className="space-y-2">
            <li className=" bg-[#efebd9] rounded-xl px-3 py-2">Jewelry</li>
            <li className=" bg-[#efebd9] rounded-xl px-3 py-2">Home Decor</li>
            <li className=" bg-[#efebd9] rounded-xl px-3 py-2">Accessories</li>
            <li className=" bg-[#efebd9] rounded-xl px-3 py-2">Artwork</li>
            <li>
              <button className="mt-2 bg-yellow-800 font-bold text-white w-full border rounded-lg px-3 py-2 text-center">
                + Add SubCategory
              </button>
            </li>
          </ul>
        </div>

        {/* Manage Categories */}
        <div className=" bg-stone-100 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Manage Brands</h2>
          <ul className="space-y-2">

            {brandsDs.map((brand) => ( 
              <li key={brand._id} className=" bg-[#efebd9]  li-trash flex  items-center justify-between rounded-xl px-3 py-2">
                <span>{brand.name}</span> <FaTrash onClick={() => delateBrands(brand._id)} className='text-red-600 trash  cursor-pointer text-xl' /></li>
            ))
              
            }
       
            
            <li>
              <button onClick={() => navigate("/layoutAdmin/createBrand")} className="mt-2 bg-yellow-800 font-bold text-white w-full border rounded-lg px-3 py-2 text-center">
                + Add Brand
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Users Table */}
      <div className=" rounded-2xl bg-stone-100 p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <table className="min-w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userDs.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user._id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <span className={user.isBlocked ? 'text-red-500' : 'text-green-500'}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleBlockStatus(user._id)}
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
