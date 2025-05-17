// import React, { useState } from "react";
// import axios from "axios";

// const OrderForm: React.FC = () => {
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage("");

//     try {
//       const { data } = await axios.post(
//         "https://project1-kohl-iota.vercel.app/order/create",
//         {
//           phone,
//           address,
//           paymentMethod,
//         },
//         {
//           headers: {
//             Authorization: localStorage.getItem("authorization") || "",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setMessage("Order placed successfully!");
//       console.log(data);
//     } catch (error: any) {
//       console.error("Order creation failed:", error);
//       setMessage("Failed to place order.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md  mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Phone</label>
//           <input
//             type="text"
//             className="w-full mt-1 p-2 border rounded-md"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Address</label>
//           <input
//             type="text"
//             className="w-full mt-1 p-2 border rounded-md"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Payment Method</label>
//           <select
//             className="w-full mt-1 p-2 border rounded-md"
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           >
//             <option value="card">Card</option>
//             <option value="cash">Cash</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-[#6B4E35] text-white py-2 rounded-md hover:bg-[#543e2a] transition"
//         >
//           {isSubmitting ? "Submitting..." : "Place Order"}
//         </button>

//         {message && (
//           <p className="text-sm text-center mt-2 text-gray-700">{message}</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default OrderForm;

import React, { useState } from "react";
import axios from "axios";

const OrderAndPaymentForm: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [code, setCode] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // handle order creation
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        "https://project1-kohl-iota.vercel.app/order/create",
        { phone, address, paymentMethod },
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );

      setOrderId(data?.order?._id); // تأكد أن هذا هو المسار الصحيح للـ ID
      setMessage("Order placed successfully!");
    } catch (error: any) {
      console.error("Order creation failed:", error);
      setMessage("Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // handle payment creation
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const { data } = await axios.post(
        "https://project1-kohl-iota.vercel.app/order/create-payment",
        { orderId, code },
        {
          headers: {
            Authorization: localStorage.getItem("authorization") || "",
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Payment created successfully!");
      console.log(data.data.url);
      window.location.href = data.data.url;
    } catch (error: any) {
      console.error("Payment creation failed:", error);
      setMessage("Failed to create payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28 p-6 bg-white rounded-lg shadow-md">
      {!orderId ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Payment Method</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="card">Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#6B4E35] text-white py-2 rounded-md hover:bg-[#543e2a] transition"
            >
              {isSubmitting ? "Submitting..." : "Place Order"}
            </button>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Create Payment</h2>
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <input type="hidden" value={orderId} />

            <div>
              <label className="block text-sm font-medium">Code (Optional)</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-md"
              
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code if you have one"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#6B4E35] text-white py-2 rounded-md hover:bg-[#543e2a] transition"
            >
              {isSubmitting ? "Submitting..." : "Create Payment"}
            </button>
          </form>
        </>
      )}

      {message && (
        <p className="text-sm text-center mt-4 text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default OrderAndPaymentForm;
