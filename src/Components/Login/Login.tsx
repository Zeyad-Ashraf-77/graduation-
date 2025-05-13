// import { useContext, useState } from "react";
// import { useFormik } from "formik";
// import axios from "axios";
// import { FormValues } from "../Interfaces/Interfaces";
// import * as Yup from "yup";
// import { Link, useNavigate } from "react-router-dom";


// export default function Register() {
//   const [apiError, setApiError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   async function handleSubmit(values: FormValues) {
//     setIsLoading(true);
//     try {
//       const { data } = await axios.post(
//         `https://project1-kohl-iota.vercel.app/users/signin/`,
//         values
//       );
//       console.log(data);
//       if (data.msg == "done") {
//         const bearerToken = `Bearer ${data.access_token}`;
//         localStorage.setItem("authorization", bearerToken);
//         localStorage.setItem("role", data.user.role);
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//       if (axios.isAxiosError(error) && error.response?.data?.message) {
//         setApiError(error.response.data.message);
//       } else {
//         setApiError("An error occurred");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("email is Required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required(" password is Required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: handleSubmit,
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center bg-gray-100/10 rounded-2xl h-screen">
//         <div className="loader"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex h-screen items-center justify-center bg-[#f9f9f6]">
//         <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-bold text-center mb-6 text-[#4e342e]">
//             Login Now
//           </h2>

//           {apiError ? (
//             <div
//               className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//               role="alert"
//             >
//               {apiError}
//             </div>
//           ) : null}

//           <form onSubmit={formik.handleSubmit} className="w-full">
//             {/* Email */}
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 {...formik.getFieldProps("email")}
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a9690a] peer"
//                 placeholder=" "
//               />
//               <label
//                 htmlFor="email"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#a9690a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Email address
//               </label>
//             </div>
//             {formik.errors.email && formik.touched.email && (
//               <div
//                 className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                 role="alert"
//               >
//                 {formik.errors.email}
//               </div>
//             )}

//             {/* Password */}
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 {...formik.getFieldProps("password")}
//                 type="password"
//                 name="password"
//                 id="password"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#a9690a] peer"
//                 placeholder=" "
//               />
//               <label
//                 htmlFor="password"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#a9690a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Password
//               </label>
//             </div>
//             {formik.errors.password && formik.touched.password && (
//               <div
//                 className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                 role="alert"
//               >
//                 {formik.errors.password}
//               </div>
//             )}

//             <span className="text-md text-gray-500 mb-5 block">
//               <Link
//                 to="/forgetPassword"
//                 className="font-medium text-[#a9690a] hover:underline"
//               >
//                 Forgot password?
//               </Link>
//             </span>

//             <button
//               type="submit"
//               className="text-white my-2 w-full bg-[#a9690a] hover:bg-[#6d4c41] focus:ring-4 focus:outline-none focus:ring-[#a9690a] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//             >
//               Login
//             </button>
//           </form>

//           <span className="text-sm text-gray-500 block text-center mt-4">
//             Don't have an account yet?{" "}
//             <Link
//               to="/register"
//               className="font-medium text-[#a9690a] hover:underline"
//             >
//               Register here
//             </Link>
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }

import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { FormValues } from "../Interfaces/Interfaces";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/users/signin/`,
        values
      );
      console.log(data);
      if (data.msg == "done") {
        const bearerToken = ` Bearer ${data.access_token}`;
        localStorage.setItem("authorization", bearerToken);
        localStorage.setItem("role", data.user.role);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("An error occurred");
      }
    } finally {
      setIsLoading(false);
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
      <div className="flex justify-center items-center bg-[#fdf8f3] h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8f3] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-[32px] shadow-xl">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-8 text-center">Welcome Back</h2>

        {apiError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#4e342e]">
              Email Address
            </label>
            <input
              {...formik.getFieldProps("email")}
              type="email"
              id="email"
              className="bg-[#fff8f1] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#a9690a] focus:border-[#a9690a] block w-full p-2.5"
              placeholder="name@company.com"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#4e342e]">
              Password
            </label>
            <input
              {...formik.getFieldProps("password")}
              type="password"
              id="password"
              className="bg-[#fff8f1] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#a9690a] focus:border-[#a9690a] block w-full p-2.5"
              placeholder="••••••••"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Link to="/forgetPassword" className="text-sm text-[#a9690a] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#a9690a] hover:bg-[#6d4c41] focus:ring-4 focus:outline-none focus:ring-[#a9690a] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{' '}
            <Link to="/register" className="text-[#a9690a] hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}