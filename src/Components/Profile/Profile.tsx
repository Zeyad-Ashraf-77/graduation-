import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../Interfaces/Interfaces";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  
  const [user, setUser] = useState<User | null>(null);

  function getUserProfile() {
    axios
    .get("https://project1-kohl-iota.vercel.app/users/profile",{
        headers: { Authorization: localStorage.getItem("authorization") },
    })
    .then((res) => {
      setUser(res.data.user);
       console.log(res.data.user);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
      setLoading(false);
    });
  }

  useEffect(() => {
   getUserProfile();
  }, []);

  if (loading) {
    return  <div className="flex items-center justify-center h-screen">
    <div className="loader"></div>
    </div>;
  }

  if (!user) {
    return <div className="text-center text-red-500 mt-10">Failed to load profile.</div>;
  }

  return (
    <div className="min-w-2xl  shadow-amber-400 container mx-auto p-6 bg-white rounded-2xl shadow-md mt-32 space-y-6">
      <div className="flex items-center gap-6">
        <div className="text-6xl">
          {user.image ? (
            <img
              src={user.image.secure_url}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">🧑🏻</span>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name }</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-t pt-4">
          <label className="text-gray-700 font-medium block mb-1">Role</label>
          <p className="text-gray-600">{user.role || "N/A"}</p>
        </div>
        <div>
          <label className="text-gray-700 font-medium block mb-1">Address</label>
          <p className="text-gray-600">{user.address || "N/A"}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={() => navigate("/updatePassword")} className="flex-1 bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition">
          Update Password
        </button>
        <button onClick={() => navigate("/allOrder")} className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-100 transition">
          My Orders
        </button>
      </div>
    </div>
  );
};

export default Profile;
