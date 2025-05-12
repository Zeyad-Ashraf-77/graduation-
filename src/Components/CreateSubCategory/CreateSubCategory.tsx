import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
  image: { secure_url: string };
  category: string;
}

interface FormValues {
  name: string;
  image: File | null;
  category: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("SubCategory name is required").min(3, "Name must be at least 3 characters"),
  image: Yup.mixed().required("SubCategory image is required"),
  category: Yup.string().required("Category is required"),
});

export default function CreateSubCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://project1-kohl-iota.vercel.app/category", {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      })
      .then((res) => setCategories(res.data.categories))
      .catch(() => setErrorMessage("Error fetching categories"));
  }, []);

  // Fetch subcategories
  const fetchSubCategories = (categoryId: string) => {
    axios
      .get(`https://project1-kohl-iota.vercel.app/sub-category/${categoryId}`, {
        headers: { Authorization: localStorage.getItem("authorization") || "" },
      })
      .then((res) => setSubCategories(res.data.subCategories || []))
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error fetching subcategories");
      });
  };

  // Handle form submit
  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category); // اسم الكاتيجوري
    formData.append("file", values.image!);

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://project1-kohl-iota.vercel.app/sub-category/create",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);

      // إظهار إشعار النجاح باستخدام التوستر في أسفل اليمين
      toast.success("SubCategory created successfully!", {
        position: "bottom-right", // تعديل الموقع إلى أسفل اليمين
        autoClose: 3000, // يغلق الإشعار تلقائيًا بعد 3 ثوانٍ
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setErrorMessage("");
      fetchSubCategories(values.category); // استدعاء الفنكشن مع id الكاتيجوري
      resetForm();
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Error creating subcategory. Please try again."
      );

      // إظهار إشعار الخطأ باستخدام التوستر في أسفل اليمين
      toast.error(
        error.response?.data?.message || "Error creating subcategory. Please try again.",
        {
          position: "bottom-right", // تعديل الموقع إلى أسفل اليمين
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 bg-[#efebd9] py-8">
      <ToastContainer
        position="bottom-right" // تحديد الموقع في أسفل اليمين
        autoClose={3000} // يغلق الإشعار تلقائيًا بعد 3 ثوانٍ
        hideProgressBar={false} // إظهار شريط التقدم
        newestOnTop={false} // الإشعارات الأحدث ليست في الأعلى
        closeOnClick // يغلق الإشعار عند النقر عليه
        rtl={false} // اتجاه النص من اليسار إلى اليمين
        pauseOnFocusLoss // إيقاف الإشعار عند فقدان التركيز
        draggable // السماح بسحب الإشعار
        pauseOnHover // إيقاف العد التنازلي عند تمرير الماوس
        theme="colored" // استخدام الثيم الملون
      />
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#efebd9] shadow-xl shadow-amber-400 rounded-2xl p-8 mb-12">
          <h2 className="font-bold mb-6 text-[#4e342e] text-center">Create New SubCategory</h2>
          {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMessage}</div>}

          <Formik
            initialValues={{ name: "", image: null, category: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-[#4e342e] mb-2">
                    SubCategory Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border-2 border-[#4e342e] rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                    placeholder="Enter subcategory name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#4e342e] mb-2">Category</label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full border-2 border-[#4e342e] rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#4e342e] mb-2">SubCategory Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-[#4e342e] border-2 border-[#4e342e] rounded-lg p-3 file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:bg-[#4e342e] file:text-white hover:file:bg-[#6d4c41] transition"
                    onChange={(event) => {
                      const file = event.currentTarget.files![0];
                      setFieldValue("image", file);
                    }}
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                  <div className="mt-4 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-[#4e342e]">
                    {values.image ? (
                      <div className="text-center">
                        <p className="text-[#4e342e]">Selected: {(values.image as File).name}</p>
                      </div>
                    ) : (
                      <p className="text-[#4e342e]">Image preview will appear here</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4e342e] hover:bg-[#6d4c41] text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-[1.02]"
                >
                  Create SubCategory
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
