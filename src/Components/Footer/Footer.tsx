import React from 'react'

export default function Footer() {
  return (
    <>
        {/* Footer */}
        <footer className="bg-[#000000]  text-center text-sm py-10 mt-10">
        <p className="text-white" >&copy; 2025 Handmade Store. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className=" text-white hover:underline">About</a>
          <a href="#" className=" text-white hover:underline">Contact</a>
          <a href="#" className=" text-white hover:underline">Terms</a>
        </div>
      </footer>
    </>
  )
}
