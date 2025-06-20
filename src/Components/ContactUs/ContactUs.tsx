import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Your message has been sent!");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F2F0EF] p-6">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-yellow-800 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your Message"
              rows={4}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-700 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-800 transition disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs; 