import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { FormValuesRegister, RegisterRole } from "../Interfaces/Interfaces";
import ConfirmForm from "../ConfirmForm/ConfirmForm";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import image1 from "../../assets/images/pin/hero2.webp";

export default function Register() {
  const [toConfirm, setToConfirm] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  async function handleSubmit(values: FormValuesRegister, role: RegisterRole) {
    try {
      setLoading(true);
      setToConfirm(false);

      // Create FormData to handle file upload
      const formData = new FormData();

      // Add all text form values to FormData
      Object.keys(values).forEach((key) => {
        if (key !== "file") {
          // Skip file as we'll handle it separately
          formData.append(key, values[key as keyof FormValuesRegister]);
        }
      });

      // Add image from state (required)
      if (selectedImage) {
        formData.append("file", selectedImage);
      } else {
        setApiError("Profile image is required");
        toast.error("Profile image is required");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        `https://project1-kohl-iota.vercel.app/users/signup/${role}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
   
      if (data.confirmed == false) {
        setToConfirm(true);
      } else {
        setToConfirm(false);
      }
      toast.success("User registered successfully");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setApiError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setApiError("An error occurred");
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("email is Required"),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters")
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
    file: Yup.mixed().required("Profile Image is Required"),
  });

  const formik = useFormik<FormValuesRegister>({
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
      image: undefined as unknown as File,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-[#fdf8f3] h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-[#fdf8f3] dark:bg-gray-900">
      <ToastContainer />
      {toConfirm ? (
        <ConfirmForm email={formik.values.email} />
      ) : (
        <div className="flex items-center justify-center px-4">
          <div className="flex w-full mx-20 max-w-6xl h-auto min-h-[700px] shadow-amber-500 bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Left: Image */}
            <div className="md:w-1/2 w-full hidden md:block h-full">
              <img
                src={image1}
                alt="register background"
                className="object-cover object-center w-full h-full"
                style={{ minHeight: 1200 }}
              />
            </div>
            
            {/* Right: Register Form */}
            <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-12">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-center mb-6">
                    <span className="inline-block w-4 h-4 bg-[#4caf50] rounded-full mr-2"></span>
                    <span className="text-lg font-semibold text-[#222]">Register</span>
                  </div>
                  <h2 className="text-3xl font-bold text-[#222] mb-2">Hello,</h2>
                  <h2 className="text-3xl font-bold text-[#222] mb-6">
                    Create Account
                  </h2>
                  <p className="text-sm text-gray-500 mb-8">
                    Join us to start your journey.
                  </p>

                  {apiError && (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                      role="alert"
                    >
                      {apiError}
                    </div>
                  )}

                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                      <input
                        {...formik.getFieldProps("email")}
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                      />
                      {formik.errors.email && formik.touched.email && (
                        <p className="mt-2 text-sm text-red-600">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <input
                        {...formik.getFieldProps("password")}
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                      />
                      {formik.errors.password && formik.touched.password && (
                        <p className="mt-2 text-sm text-red-600">
                          {formik.errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <input
                        {...formik.getFieldProps("cPassword")}
                        type="password"
                        id="cPassword"
                        placeholder="Confirm Password"
                        className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                      />
                      {formik.errors.cPassword && formik.touched.cPassword && (
                        <p className="mt-2 text-sm text-red-600">
                          {formik.errors.cPassword}
                        </p>
                      )}
                    </div>

                    {/* Name Fields */}
                    <div className="flex space-x-3">
                      <div className="w-1/2">
                        <input
                          {...formik.getFieldProps("firstName")}
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                        />
                        {formik.errors.firstName && formik.touched.firstName && (
                          <p className="mt-2 text-sm text-red-600">
                            {formik.errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <input
                          {...formik.getFieldProps("lastName")}
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                        />
                        {formik.errors.lastName && formik.touched.lastName && (
                          <p className="mt-2 text-sm text-red-600">
                            {formik.errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <input
                        {...formik.getFieldProps("gender")}
                        type="text"
                        id="gender"
                        placeholder="Gender"
                        className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                      />
                      {formik.errors.gender && formik.touched.gender && (
                        <p className="mt-2 text-sm text-red-600">
                          {formik.errors.gender}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        {...formik.getFieldProps("phone")}
                        type="tel"
                        id="phone"
                        placeholder="Phone Number"
                        className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <p className="mt-2 text-sm text-red-600">
                          {formik.errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <input
                        {...formik.getFieldProps("DOB")}
                        type="date"
                        id="DOB"
                        className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                      />
                      {formik.errors.DOB && formik.touched.DOB && (
                        <p className="mt-2 text-sm text-red-600">
                          {formik.errors.DOB}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <input
                        {...formik.getFieldProps("address")}
                        type="text"
                        id="address"
                        placeholder="Address"
                        className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5"
                      />
                      {formik.errors.address && formik.touched.address && (
                        <p className="mt-2 text-sm text-red-600">
                          {formik.errors.address}
                        </p>
                      )}
                    </div>

                    {/* Profile Image */}
                    <div>
                      <label
                        htmlFor="profileImage"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Profile Image
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        className="bg-[#f9f9f6] border border-[#e0c8b1] text-gray-900 text-sm rounded-lg focus:ring-[#4caf50] focus:border-[#4caf50] block w-full p-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4caf50] file:text-white hover:file:bg-[#388e3c]"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setSelectedImage(file);

                          // Update formik value for validation
                          if (file) {
                            formik.setFieldValue("file", file);

                            // Create preview URL for the selected image
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            formik.setFieldValue("file", undefined);
                            setPreviewImage(null);
                          }
                        }}
                      />

                      {/* Image Preview */}
                      {previewImage && (
                        <div className="mt-3 flex justify-center">
                          <img
                            src={previewImage}
                            alt="Profile Preview"
                            className="w-20 h-20 object-cover rounded-full border-2 border-[#4caf50]"
                          />
                        </div>
                      )}
                      {formik.errors.image && formik.touched.image && (
                        <p className="mt-2 text-sm text-red-600">
                          {formik.errors.image as string}
                        </p>
                      )}
                    </div>

                    {/* Register Buttons */}
                    <div className="flex space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() =>
                          handleSubmit(
                            formik.values as unknown as FormValuesRegister,
                            "user" as RegisterRole
                          )
                        }
                        className="w-1/2 text-white bg-[#4caf50] hover:bg-[#388e3c] focus:ring-4 focus:outline-none focus:ring-[#4caf50] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        {loading ? (
                          <FaSpinner className="animate-spin mx-auto" />
                        ) : (
                          "Register as User"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleSubmit(
                            formik.values as unknown as FormValuesRegister,
                            "crafter" as RegisterRole
                          )
                        }
                        className="w-1/2 text-white bg-[#4caf50] hover:bg-[#388e3c] focus:ring-4 focus:outline-none focus:ring-[#4caf50] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        {loading ? (
                          <FaSpinner className="animate-spin mx-auto" />
                        ) : (
                          "Register as Crafter"
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-6">
                      <span className="text-gray-400">Or</span>
                      <button
                        type="button"
                        className="rounded-full border border-gray-200 p-2 hover:bg-gray-50"
                      >
                        <i className="fab fa-facebook-f text-[#4caf50]"></i>
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-gray-200 p-2 hover:bg-gray-50"
                      >
                        <i className="fab fa-google text-[#4caf50]"></i>
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-gray-200 p-2 hover:bg-gray-50"
                      >
                        <i className="fab fa-instagram text-[#4caf50]"></i>
                      </button>
                    </div>

                    <p className="text-sm text-center text-gray-500 mt-6">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-[#4caf50] hover:underline font-semibold"
                      >
                        Login
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
