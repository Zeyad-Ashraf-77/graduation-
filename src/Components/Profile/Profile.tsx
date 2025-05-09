import React, { useEffect, useState } from "react";
import axios from "axios";
import { log } from "console";

const Profile = () => {
  interface User {
    name: string;
    lastName: string;
    email: string;
    role?: string;
    address?: string;
  }
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
        <div className="text-6xl">🧑🏻</div>
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
        <button className="flex-1 bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition">
          Edit Profile
        </button>
        <button className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-100 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
