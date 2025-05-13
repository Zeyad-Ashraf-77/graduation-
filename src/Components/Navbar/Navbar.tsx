import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/61d71a78dd3eefe4e069187f4699af9e.jpg";
import { CiMenuBurger } from "react-icons/ci";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("authorization");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <>
      <div className="container mx-auto">
        <nav className="navbar  fixed top-3 z-50 w-[90%] rounded-3xl border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="#"
              className="flex  items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                className="h-10 w-10 rounded-full"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                Handova
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-dropdown"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-dropdown"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <CiMenuBurger className="text-3xl" />
            </button>
          <div className="flex items-center justify-between ">
              <div
              className={`${
                isDropdownOpen ? "block" : "hidden"
              } w-full md:block md:w-auto`}
              id="navbar-dropdown"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-100 md:bg-transparent dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
                {localStorage.getItem("authorization") ? (
                  <>
                    <li>
                      <NavLink
                        to="/"
                        className="block py-2 px-3 text-gray-900 font-medium  bg-amber-700 rounded-sm md:bg-transparent md:text-amber-700 md:p-0 md:dark:text-amber-500 dark:bg-amber-600 md:dark:bg-transparent"
                        aria-current="page"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/category"
                        className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Category
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/product"
                        className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/brand"
                        className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Brands
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/cart"
                        className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/wishList"
                        className="block py-0 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        wishlist
                      </NavLink>
                    </li>
                    {/* Dropdown for Profile, Admin, Logout */}
                    <li className="relative">
                      <button
                        onClick={() =>
                          setIsProfileDropdownOpen(!isProfileDropdownOpen)
                        }
                        className="flex items-center gap-2 py-2 px-3 text-gray-900 font-medium rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        <FaUserCircle className="text-2xl" />
                        
                      </button>
                      {isProfileDropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                          <li>
                            <NavLink
                              to="/profile"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              Profile
                            </NavLink>
                          </li>
                          {localStorage.getItem("role") === "admin" && (
                              <li>
                            <NavLink
                              to="/layoutAdmin"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              Admin
                            </NavLink>
                          </li>
                          )}
                        
                          <li>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              SignOut
                            </button>
                          </li>
                        </ul>
                      )}
                    </li>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="block py-0 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to="/register"
                      className="block py-0 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </ul>
            </div>

            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {isDarkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
            </button>
          </div>
            {/* زرار تبديل الوضع */}
          </div>
        </nav>
      </div>
    </>
  );
}
