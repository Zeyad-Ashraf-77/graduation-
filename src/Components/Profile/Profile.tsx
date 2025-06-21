import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../Interfaces/Interfaces";
import { motion } from "framer-motion";
  
const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  function getUserProfile() {
    axios
      .get("https://project1-kohl-iota.vercel.app/users/profile", {
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
    return (
      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-amber-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center text-red-500">
          <p className="text-lg">Failed to load profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 pt-24 sm:pt-32 px-4 sm:px-6">
      <div className="max-w-md sm:max-w-2xl mx-auto">
        <h1 className=" font-bold dark:text-white text-center mb-6 sm:mb-8">
          Profile
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900/90 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6"
        >
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div className="flex-shrink-0">
              {user.image ? (
                <img
                  src={user.image.secure_url}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-200 dark:border-amber-600"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-amber-200 dark:border-amber-600">
                  <span className="text-3xl sm:text-4xl">🧑🏻</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-all">
                {user.email}
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4 sm:space-y-6">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
              <div className="space-y-2">
                <label className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                  Role:
                </label>
                <p className="text-gray-600 dark:text-gray-100 text-sm sm:text-base bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  {user.role || "N/A"}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                Address:
              </label>
              <p className="text-gray-600 dark:text-gray-100 text-sm sm:text-base bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg min-h-[2.5rem] flex items-center">
                {user.address || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                Created At:
              </label>
              <p className="text-gray-600 dark:text-gray-100 text-sm sm:text-base bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg min-h-[2.5rem] flex items-center">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
            
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
            <button
              onClick={() => navigate("/updatePassword")}
              className="flex-1 bg-indigo-600 dark:bg-indigo-700 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors duration-200 text-sm sm:text-base font-medium"
            >
              Update Password
            </button>
            <button
              onClick={() => navigate("/allOrder")}
              className="flex-1 border-2 border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 py-3 px-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-sm sm:text-base font-medium"
            >
              My Orders
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
