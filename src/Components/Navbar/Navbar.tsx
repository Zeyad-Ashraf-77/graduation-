
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/61d71a78dd3eefe4e069187f4699af9e.jpg";
import { CiMenuBurger } from "react-icons/ci";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";



export default function Navbar() {
  const navigate = useNavigate();

  const { userToken } =   useContext(UserContext);


  function handleLogout() {
    localStorage.removeItem("authorization");
    localStorage.removeItem("role");
    // setIsAdmin(false);
    // setIsUser(false);
    // setIsCrafter(false);
    navigate("/login");
    // isLogin = false;
    
  }
  
  return (
    <>
      <nav className=" navbar fixed top-0 z-50 w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className="h-10 w-10 rounded-full "
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
              Handova
            </span>
          </a>
          {/* <ThemeToggle /> */}
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <CiMenuBurger className="text-3xl" />
          </button>
          <div
            className="hidden w-full  md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-100 md:bg-transparent dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">

          
          
           {localStorage.getItem("authorization")?
           <>
            <li className="" >
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-white bg-amber-700 rounded-sm md:bg-transparent md:text-amber-700 md:p-0 md:dark:text-amber-500 dark:bg-amber-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
            <li>
                <NavLink
                  to="/category"
                  className="block py-0 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  category
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-0 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-0 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Brands
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-0 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Cart
                </a>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-amber-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Dropdown{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  ></svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdownNavbar"
                  className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    {localStorage.getItem("role") === "admin"?  <li>
                      <NavLink
                        to="/layoutAdmin"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Admin
                      </NavLink>
                    </li>  : <>
                    <li className="" >
              
              </li>
                    </>}
                               
                  </ul>
                  <div className="py-1">
                    <a
                      onClick={handleLogout}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </li>
           
           
           </>: <>
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
        
           
           </>}
         
        
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
