import React from 'react'

export default function Footer() {
  return (
    <>
        {/* Footer */}
        <footer className="bg-[#daa60a]  text-center text-sm py-10 mt-10">
        <p>&copy; 2025 Handmade Store. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </footer>
    </>
  )
}
