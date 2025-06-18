import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email('البريد الإلكتروني غير صالح')
    .required('مطلوب'),
  otp: Yup.string()
    .required('مطلوب')
   
});

interface EmailConfirmationProps {
  email?: string;
}

export default function EmailConfirmation({ email = '' }: EmailConfirmationProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleSubmit = async (values: { email: string; otp: string }) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const { data } = await axios.patch(
        'https://project1-kohl-iota.vercel.app/users/confirmMail',
        {
          email: values.email.trim(),
          otp: values.otp.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('API Response:', data);
      
      if (data.confirmed === true) {
        setSuccess('تم تأكيد البريد الإلكتروني بنجاح! سيتم تحويلك إلى صفحة تسجيل الدخول...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('خطأ في تأكيد البريد الإلكتروني. يرجى المحاولة مرة أخرى.');
      }
    } catch (error: any) {
      console.error('Error confirming email:', error);
      const errorMessage = error.response?.data?.message || 'حدث خطأ أثناء محاولة التأكيد. يرجى المحاولة مرة أخرى.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: email,
      otp: ''
    },
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: true
  });

  return (
    <div className="min-h-screen flex items-center justify-center light:bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={formik.handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
          dir="rtl"
        >
          <h2 className=" font-bold text-center mb-8 text-gray-800 dark:text-white">
            Confirm Email
          </h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                Email
            </label>
            <input
              {...formik.getFieldProps('email')}
              name="email"
              type="email"
              id="email"
              readOnly
              disabled={!!email}
              className={`bg-gray-50 border ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
              placeholder="example@email.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>
          
          <div className="mb-8">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                OTP
            </label>
            <input
              {...formik.getFieldProps('otp')}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              id="otp"
              name="otp"
              maxLength={4}
              className={`bg-gray-50 border ${
                formik.touched.otp && formik.errors.otp
                  ? 'border-red-500'
                  : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
              placeholder="أدخل الكود"
            />
            {formik.touched.otp && formik.errors.otp && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.otp}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Loading...
              </>
            ) : 'Confirm Email'}
          </button>
        </form>
      </div>
    </div>
  );
}
