// import React, { useState } from "react";
// import image1 from "../../assets/images/close-up-person-cutting-lace-with-knife-wooden-desk.jpg";
// import { useFormik } from "formik";
// import axios from "axios";
// import { FormValues, RegisterRole } from "../Interfaces/Interfaces";
// import ConfirmForm from "../ConfirmForm/ConfirmForm";
// import * as Yup from "yup";
// export default function Register() {
//   const [toConfirm, setToConfirm] = useState(false);
//   const [apiError, setApiError] = useState("");
//   async function handleSubmit(values: FormValues, role: RegisterRole) {
//     try {
//       setToConfirm(false);
//       const { data } = await axios.post(
//         `https://project1-kohl-iota.vercel.app/users/signup/${role}`,
//         values
//       );
//       console.log(data);
//       if (data.confirmed == false) {
//         setToConfirm(true);
//       } else {
//         setToConfirm(false);
//       }
//     } catch (error) {
//       console.log(error);
//       if (axios.isAxiosError(error) && error.response?.data?.message) {
//         setApiError(error.response.data.message);
//       } else {
//         setApiError("An error occurred");
//       }
//     }
//   }

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("email is Required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required(" password is Required"),
//     cPassword: Yup.string()
//       .oneOf([Yup.ref("password"), undefined], "Passwords must match")
//       .required(" cPassword is Required"),
//     firstName: Yup.string().required(" firstName is Required"),
//     lastName: Yup.string().required(" lastName is Required"),
//     phone: Yup.string().required(" phone is Required"),
//     DOB: Yup.date().required(" DOB is Required"),
//     gender: Yup.string().required(" gender is Required"),
//     address: Yup.string().required(" address is Required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//       cPassword: "",
//       firstName: "",
//       lastName: "",
//       phone: "",
//       DOB: "",
//       gender: "",
//       address: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       // Default role handling can be added here if needed
//       console.log("Form submitted:", values);
//     },
//   });

//   return (
//     <>
//       {toConfirm ? (
//         <>
//           <ConfirmForm email={formik.values.email} />
//         </>
//       ) : (
//         <div className=" mx-auto  register h-screen flex    gap-10 justify-between items-center mb-6  ">
//           <div className=" bg-red-100 p-20 mt-10 md:mt-28 mx-auto   max-w-[700px] rounded-2xl">
//             <h2 className=" font-bold text-center mb-5">Register Now</h2>
//             {apiError ? (
//               <div
//                 className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                 role="alert"
//               >
//                 {apiError}
//               </div>
//             ) : null}
//             <form onSubmit={formik.handleSubmit} className="min-w-md mx-auto">
//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   {...formik.getFieldProps("email")}
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                   placeholder=" "
//                 />
//                 <label
//                   htmlFor="email"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Email address
//                 </label>
//               </div>
//               {formik.errors.email && formik.touched.email && (
//                 <div
//                   className="p-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                   role="alert"
//                 >
//                   {formik.errors.email}
//                 </div>
//               )}

//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   {...formik.getFieldProps("password")}
//                   type="password"
//                   name="password"
//                   id="password"
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                   placeholder=" "
//                 />
//                 <label
//                   htmlFor="password"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Password
//                 </label>
//               </div>
//               {formik.errors.password && formik.touched.password && (
//                 <div
//                   className="p-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                   role="alert"
//                 >
//                   {formik.errors.password}
//                 </div>
//               )}

//               <div className="relative z-0 w-full mb-5 group">
//                 <input
//                   {...formik.getFieldProps("cPassword")}
//                   type="password"
//                   name="cPassword"
//                   id="cPassword"
//                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                   placeholder=" "
//                 />
//                 <label
//                   htmlFor="cPassword"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                   Confirm password
//                 </label>
//               </div>
//               {formik.errors.cPassword && formik.touched.cPassword && (
//                 <div
//                   className="p-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                   role="alert"
//                 >
//                   {formik.errors.cPassword}
//                 </div>
//               )}
//               <div className="grid md:grid-cols-2 md:gap-6">
//                 <div className="relative z-0 w-full mb-5 group">
//                   <input
//                     {...formik.getFieldProps("firstName")}
//                     type="text"
//                     name="firstName"
//                     id="firstName"
//                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="firstName"
//                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                   >
//                     First name
//                   </label>
//                   {formik.errors.firstName && formik.touched.firstName && (
//                     <div
//                       className="p-1 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                       role="alert"
//                     >
//                       {formik.errors.firstName}
//                     </div>
//                   )}
//                 </div>

//                 <div className="relative z-0 w-full mb-5 group">
//                   <input
//                     {...formik.getFieldProps("lastName")}
//                     type="text"
//                     name="lastName"
//                     id="lastName"
//                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="lastName"
//                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                   >
//                     Last name
//                   </label>
//                   {formik.errors.lastName && formik.touched.lastName && (
//                     <div
//                       className="p-1 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                       role="alert"
//                     >
//                       {formik.errors.lastName}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="grid md:grid-cols-2 md:gap-6">
//                 <div className="relative z-0 w-full mb-5 group">
//                   <input
//                     {...formik.getFieldProps("phone")}
//                     type="tel"
//                     name="phone"
//                     id="phone"
//                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="phone"
//                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                   >
//                     Phone number (01065767412)
//                   </label>
//                   {formik.errors.phone && formik.touched.phone && (
//                     <div
//                       className="p-1 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                       role="alert"
//                     >
//                       {formik.errors.phone}
//                     </div>
//                   )}
//                 </div>
//                 <div className="relative z-0 w-full mb-5 group">
//                   <input
//                     {...formik.getFieldProps("DOB")}
//                     type="date"
//                     name="DOB"
//                     id="date"
//                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="date"
//                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                   >
//                     Date
//                   </label>
//                   {formik.errors.DOB && formik.touched.DOB && (
//                     <div
//                       className="p-1 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                       role="alert"
//                     >
//                       {formik.errors.DOB}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="grid md:grid-cols-2 md:gap-6">
//                 <div className="relative z-0 w-full mb-5 group">
//                   <input
//                     {...formik.getFieldProps("address")}
//                     type="text"
//                     name="address"
//                     id="address"
//                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="address"
//                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                   >
//                     Address
//                   </label>
//                   {formik.errors.address && formik.touched.address && (
//                     <div
//                       className="p-1 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                       role="alert"
//                     >
//                       {formik.errors.address}
//                     </div>
//                   )}
//                 </div>

//                 <div className="relative z-0 w-full mb-5 group">
//                   <input
//                     {...formik.getFieldProps("gender")}
//                     type="text"
//                     name="gender"
//                     id="gender"
//                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer"
//                     placeholder=" "
//                   />
//                   <label
//                     htmlFor="gender"
//                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                   >
//                     Gender
//                   </label>
//                   {formik.errors.gender && formik.touched.gender && (
//                     <div
//                       className="p-1 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                       role="alert"
//                     >
//                       {formik.errors.gender}
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex justify-around  min-w-[300px] gap-5 items-center ">
//                   <button
//                     type="button"
//                     onClick={() =>
//                       handleSubmit(
//                         formik.values as unknown as FormValues,
//                         "user" as unknown as RegisterRole
//                       )
//                     }
//                     className="text-white min-w-[200px] bg-yellow-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
//                   >
//                     Register as User
//                   </button>
//                   <span className="text-gray-500 font-bold text-2xl mx-auto">
//                     or
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       handleSubmit(
//                         formik.values as unknown as FormValues,
//                         "crafter" as unknown as RegisterRole
//                       )
//                     }
//                     className="text-white min-w-[200px] bg-yellow-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
//                   >
//                     Register as Crafter
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//           {/* <div className="image">
//             <img
//               src={image1}
//               className="w-full max-w-[800px] min-h-[500px] rounded-2xl"
//               alt=""
//             />
//           </div> */}
//         </div>
//       )}
//     </>
//   );
// }
import React, { useState } from "react";
import image1 from "../../assets/images/close-up-person-cutting-lace-with-knife-wooden-desk.jpg";
import { useFormik } from "formik";
import axios from "axios";
import { FormValues, RegisterRole } from "../Interfaces/Interfaces";
import ConfirmForm from "../ConfirmForm/ConfirmForm";
import * as Yup from "yup";

export default function Register() {
  const [toConfirm, setToConfirm] = useState(false);
  const [apiError, setApiError] = useState("");

  async function handleSubmit(values: FormValues, role: RegisterRole) {
    try {
      setToConfirm(false);
      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/users/signup/${role}`,
        values
      );
      console.log(data);
      if (data.confirmed == false) {
        setToConfirm(true);
      } else {
        setToConfirm(false);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("An error occurred");
      }
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("password is Required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("cPassword is Required"),
    firstName: Yup.string().required("firstName is Required"),
    lastName: Yup.string().required("lastName is Required"),
    phone: Yup.string().required("phone is Required"),
    DOB: Yup.date().required("DOB is Required"),
    gender: Yup.string().required("gender is Required"),
    address: Yup.string().required("address is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      DOB: "",
      gender: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <>
      {toConfirm ? (
        <ConfirmForm email={formik.values.email} />
      ) : (
        <div className="min-h-screen mt-28 flex items-center justify-center  px-4">
          <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-xl w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center text-amber-700 mb-8">
              Register Now
            </h2>

            {apiError && (
              <div
                className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {apiError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Email address
                </label>
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  {...formik.getFieldProps("password")}
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="cPassword"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Confirm password
                </label>
                <input
                  {...formik.getFieldProps("cPassword")}
                  type="password"
                  id="cPassword"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
                {formik.errors.cPassword && formik.touched.cPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.cPassword}
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block mb-1 text-sm font-medium text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    {...formik.getFieldProps("firstName")}
                    type="text"
                    id="firstName"
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                  />
                  {formik.errors.firstName && formik.touched.firstName && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block mb-1 text-sm font-medium text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    {...formik.getFieldProps("lastName")}
                    type="text"
                    id="lastName"
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                  />
                  {formik.errors.lastName && formik.touched.lastName && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <input
                  {...formik.getFieldProps("gender")}
                  type="text"
                  id="gender"
                  name="gender"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="gender"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:top-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-2 peer-focus:text-amber-600"
                >
                  Gender
                </label>

                {formik.errors.gender && formik.touched.gender && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.gender}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Phone number
                </label>
                <input
                  {...formik.getFieldProps("phone")}
                  type="tel"
                  id="phone"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.phone}
                  </div>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="DOB"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Date of Birth
                </label>
                <input
                  {...formik.getFieldProps("DOB")}
                  type="date"
                  id="DOB"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block mb-1 text-sm font-medium text-gray-600"
                >
                  Address
                </label>
                <input
                  {...formik.getFieldProps("address")}
                  type="text"
                  id="address"
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    handleSubmit(
                      formik.values as unknown as FormValues,
                      "user" as RegisterRole
                    )
                  }
                  className="w-1/2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md"
                >
                  Register as User
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSubmit(
                      formik.values as unknown as FormValues,
                      "crafter" as RegisterRole
                    )
                  }
                  className="w-1/2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md"
                >
                  Register as Crafter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
