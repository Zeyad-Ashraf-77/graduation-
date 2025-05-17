import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="p-2 text-white hover:scale-110 transition-all duration-300  flex gap-3 flex-col bg-black fixed top-1/4 z-50 right-0 rounded-lg ">
        <FaTiktok />
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaLinkedin />
        <FaYoutube />
      </div>
      {/* <div className="home h-screen "></div> */}
      <div className=" mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
