
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define Types for Category and Form values
interface Category {
  _id: string;
  name: string;
  image: {
    secure_url: string;
  };
}

interface FormValues {
  name: string;
  image: File | null;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters"),
  image: Yup.mixed().required("Category image is required"),
});

export default function CreateCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fetch all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("https://project1-kohl-iota.vercel.app/category", {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      });
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`https://project1-kohl-iota.vercel.app/category/delete/${id}`, {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      });
      getCategories(); // Refresh category list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Submit form data
  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image!); // Non-null assertion since image is required

    try {
      const response = await axios.post(
        "https://project1-kohl-iota.vercel.app/category/create",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Category created:", response.data);
      navigate("/categories"); // Redirect after successful creation
    } catch (error) {
      console.error("Error creating category:", error);
      setErrorMessage("Error creating category. Please try again.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {/* Create New Category Form */}
      <div className="max-w-xl mx-auto bg-white shadow-lg p-6 mt-32 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Category</h2>
        {errorMessage && <div className="text-red-500 text-sm mb-3">{errorMessage}</div>}

        <Formik
          initialValues={{
            name: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  onChange={(event) => setFieldValue("image", event.currentTarget.files![0])}
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
                {/* Preview placeholder */}
                <div className="mt-3 h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  {values.image ? values.image.name : "Image preview here"}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
              >
                Create Category
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* All Categories Section */}
      <div className="mt-10 container mx-auto">
        <h2 className="text-center">All Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {categories.map((category) => (
            <div
              key={category._id}
              className="max-w-sm cardCategory bg-black/30 hover:scale-105 duration-150 text-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  src={category.image.secure_url}
                  className="rounded-t-lg w-full max-h-[200px] object-cover"
                  alt={category.name}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-white text-2xl font-bold tracking-tight dark:text-white">
                    {category.name.toUpperCase()}
                  </h5>
                </a>
                <button
                  type="button"
                  onClick={() => deleteCategory(category._id)}
                  className="focus:outline-none w-full cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="focus:outline-none w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
