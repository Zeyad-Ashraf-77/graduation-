import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function AddProduct() {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      stock: '',
      quantity: '',
      category: '',
      price: '',
      discount: '',
      rate: '',
      avgRating: '',
      brand: '',
      subCategory: '',
      imageCover: null,
      images: [],
    },
    // validationSchema: Yup.object({
    //   name: Yup.string().required('Required'),
    //   description: Yup.string().required('Required'),
    //   stock: Yup.number().required('Required'),
    //   quantity: Yup.number().required('Required'),
    //   category: Yup.string().required('Required'),
    //   price: Yup.number().required('Required'),
    //   discount: Yup.number().required('Required'),
    //   rate: Yup.number().required('Required'),
    //   avgRating: Yup.number().required('Required'),
    //   brand: Yup.string().required('Required'),
    //   subCategory: Yup.string().required('Required'),
    // }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('stock', values.stock);
        formData.append('quantity', values.quantity);
        formData.append('category', values.category);
        formData.append('price', values.price);
        formData.append('discount', values.discount);
        formData.append('rate', values.rate);
        formData.append('avgRating', values.avgRating);
        formData.append('brand', values.brand);
        formData.append('subCategory', values.subCategory);
        if (values.imageCover) {
          formData.append('imageCover', values.imageCover);
        }
        if (values.images && values.images.length > 0) {
          Array.from(values.images).forEach((image) => {
            formData.append('images', image);
          });
        }

        const token = localStorage.getItem('authorization');
        const response = await axios.post(
          'https://project1-kohl-iota.vercel.app/product/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token,
            },
          }
        );
        console.log('Product created successfully:', response.data);
        alert('Product created successfully!');
      } catch (error) {
        console.error('Error creating product:', error);
        alert('Failed to create product. Please try again.');
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-xl mt-32 mx-auto p-6 bg-[#f9f9f6] rounded-2xl shadow-lg space-y-5 border border-gray-300"
      >
        <h2 className=" font-bold mb-4 text-center text-[#a9690a]">Create New Product</h2>

        {/* Text Inputs */}
        {[
          ['name', 'Product Name'],
          ['description', 'Description'],
          ['stock', 'Stock'],
          ['quantity', 'Quantity'],
          ['category', 'Category ID'],
          ['price', 'Price'],
          ['discount', 'Discount'],
          ['rate', 'Rate'],
          ['avgRating', 'Average Rating'],
          ['brand', 'Brand ID'],
          ['subCategory', 'Subcategory ID'],
        ].map(([key, label]) => (
          <div key={key}>
            <label htmlFor={key} className="block font-medium text-[#6b4f4f] mb-1">
              {label}
            </label>
            <input
              id={key}
              name={key}
              type="text"
              placeholder={label}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a9690a] bg-[#f0ece4] text-gray-800"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[key]}
            />
            {formik.touched[key] && formik.errors[key] ? (
              <div className="text-red-500 text-sm">{formik.errors[key]}</div>
            ) : null}
          </div>
        ))}

        {/* Image Cover */}
        <div>
          <label className="block font-medium text-[#6b4f4f] mb-1">Image Cover</label>
          <input
            type="file"
            name="imageCover"
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-[#f0ece4] text-gray-800"
            onChange={(event) => {
              formik.setFieldValue('imageCover', event.currentTarget.files[0]);
            }}
          />
        </div>

        {/* Images */}
        <div>
          <label className="block font-medium text-[#6b4f4f] mb-1">Images (Multiple)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-[#f0ece4] text-gray-800"
            onChange={(event) => {
              formik.setFieldValue('images', event.currentTarget.files);
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#a9690a] text-white py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
        >
          Submit
        </button>
      </form>
    </>
  );
}
