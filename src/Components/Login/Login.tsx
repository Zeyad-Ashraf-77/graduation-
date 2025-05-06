import { useContext, useState } from "react";
import image1 from "../../assets/images/pin/This teak and leather hanging clock is the perfect….jpeg";
import { useFormik } from "formik";
import axios from "axios";
import { FormValues } from "../Interfaces/Interfaces";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Register() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate ();





  async function handleSubmit(values: FormValues) {
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/users/signin/`,
        values
      );
      console.log(data);
      if (data.msg== "done"){
        const bearerToken = `Bearer ${data.access_token}`;
        localStorage.setItem("authorization", bearerToken);
        localStorage.setItem("role", data.user.role);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("An error occurred");
      }
    }finally {  
      setIsLoading(false)
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required(" password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-gray-100/10 rounded-2xl h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen login flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="bg-gray-100 p-12 rounded-2xl w-full max-w-md">
            <h2 className="font-bold text-center mb-5">Login Now</h2>
  
            {apiError ? (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {apiError}
              </div>
            ) : null}
  
            <form onSubmit={formik.handleSubmit} className="w-full">
              {/* Email */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  {formik.errors.email}
                </div>
              )}
  
              {/* Password */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  {formik.errors.password}
                </div>
              )}
  
              <span className="text-md text-gray-500 mb-5 dark:text-gray-400 block mb-4">
                <Link to="/forgetPassword" className="font-medium text-amber-600 hover:underline dark:text-amber-500">
                  Forgot password?
                </Link>
              </span>
  
              <button
                type="submit"
                className="text-white my-2 w-full bg-yellow-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
              >
                Login
              </button>
            </form>
  
            <span className="text-sm text-gray-500 dark:text-gray-400 block text-center mt-4">
              Don't have an account yet?{" "}
              <Link to="/register" className="font-medium text-amber-600 hover:underline dark:text-amber-500">
                Register here
              </Link>
            </span>
          </div>
        </div>
  
        {/* الصورة - النصف الأيمن */}
        {/* <div className="hidden md:block w-1/2 h-full">
          <img
            src={image1}
            className="w-full  h-full object-cover rounded-l-2xl"
            alt=""
          />
        </div> */}
      </div>
    </>
  );
  
}
