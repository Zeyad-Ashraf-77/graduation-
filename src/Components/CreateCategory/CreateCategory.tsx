// import { useState } from 'react';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { log } from 'console';

// export default function CreateCategory() {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       image: null as File | null,
//     },
//     onSubmit: async (values, { resetForm }) => {
//       if (!values.image) {
//         setMessage('Please upload an image.');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('name', values.name);
//       formData.append('image', values.image);

//       try {
//         setLoading(true);
//         const res = await axios.post('https://project1-kohl-iota.vercel.app/category/create', formData, 
//             {headers: { Authorization: localStorage.getItem('authorization') } }
//         );
//         log(res.data);
//         setMessage('Category created successfully!');
//         resetForm();
//         setPreview(null);
//       } catch (err) {
//         setMessage('Something went wrong.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.currentTarget.files?.[0];
//     if (file) {
//       formik.setFieldValue('image', file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto  bg-white shadow-lg p-6 mt-32 rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Category</h2>
      
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//             Category Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             onChange={formik.handleChange}
//             value={formik.values.name}
//             className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
//             required
//           />
//           {preview && (
//             <img src={preview} alt="Preview" className="mt-3 h-32 object-cover rounded" />
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50"
//         >
//           {loading ? 'Creating...' : 'Create Category'}
//         </button>

//         {message && <p className="text-center mt-2 text-sm text-gray-700">{message}</p>}
//       </form>
//     </div>
//   );
// }

import React from 'react'

export default function CreateCategory() {
  return (
    <>
     <div className="max-w-xl mx-auto bg-white shadow-lg p-6 mt-32 rounded-lg">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Category</h2>
  
  <form className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Category Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter category name"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
      <input
        type="file"
        accept="image/*"
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />
      {/* Preview placeholder */}
      <div className="mt-3 h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
        Image preview here
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
    >
      Create Category
    </button>
  </form>
</div>
 
    </>
  )
}

