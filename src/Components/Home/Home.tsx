// import React from 'react'
import image1 from '../../assets/images/download (14).jpeg'
import image2 from '../../assets/images/download (27).jpeg'
import image3 from '../../assets/images/download (31).jpeg'
import image4 from '../../assets/images/download (30).jpeg'
import image5 from '../../assets/images/download (29).jpeg'
// import image6 from '../../assets/images/images (42).jpeg'
// import { FaRegPaperPlane } from 'react-icons/fa'
// import Category from '../Category/Category'
// import CategorySlider from '../CategorySlider/CategorySlider'
// export default function Home() {
  //   return (
    //     <>
    //     <div className="container mx-auto">
    
    //     <div className='mt-10' >
    //       <MainSlider />
    //        <div className='mt-10 ' >
    //         <h1 className='text-3xl text-center font-bold'>Welcome to our website</h1>
    //         <p className='text-center mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
    
    //         <div className="flex justify-around mt-10 flex-wrap" >
    //           <div className="flex flex-col gap-2 items-center justify-center" >
    
    //           <div className='w-40 h-40 bg-red-800 rounded-full' >
    //            <img src={image1} className='w-40 h-40 object-center object-cover rounded-full' alt="" />
    //           </div> 
    //           <h4>hello</h4>
    
    //           </div>
    //           <div className="flex flex-col gap-2 items-center justify-center" >
    
    //           <div className='w-40 h-40 bg-red-800 rounded-full' >
    //           <img src={image2} className='w-40 h-40 object-center object-cover rounded-full' alt="" />
    
    //           </div> 
    //           <h4>hello</h4>
    
    //           </div>
    //           <div className="flex flex-col gap-2 items-center justify-center" >
    
    //           <div className='w-40 h-40 bg-red-800 rounded-full' >
    //           <img src={image3} className='w-40 h-40 object-center object-cover rounded-full' alt="" />
    
    //           </div> 
    //           <h4>hello</h4>
    
    //           </div>
    //           <div className="flex flex-col gap-2 items-center justify-center" >
    
    //           <div className='w-40 h-40 bg-red-800 rounded-full' >
    //           <img src={image4} className='w-40 h-40 object-center object-cover rounded-full' alt="" />
    
    //           </div> 
    //           <h4>hello</h4>
    
    //           </div>
    //           <div className="flex flex-col gap-2 items-center justify-center" >
    
    //           <div className='w-40 h-40 bg-red-800 rounded-full' >
    //           <img src={image5} className='w-40 h-40 object-center object-cover rounded-full' alt="" />
    
    //           </div> 
    //           <h4>hello</h4>
    
    //           </div>
    
    
    //         </div>
    
    //        </div>
    
    //         <div className='m-10  md:flex-row flex flex-col justify-around  ' >
    //            <div className='h-30 w-30 flex flex-col justify-between items-center   rounded-full bg-white border-amber-400 border-2' >
    //            <FaRegPaperPlane className='text-amber-400 m-auto text-3xl' />
    
    //            </div>
    //            <div className='h-30 w-30 flex justify-between items-center   rounded-full bg-white border-amber-400 border-2' >
    //            <FaRegPaperPlane className='text-amber-400 m-auto text-3xl' />
    
    //            </div>
    //            <div className='h-30 w-30 flex justify-between items-center   rounded-full bg-white border-amber-400 border-2' >
    //            <FaRegPaperPlane className='text-amber-400 m-auto text-3xl' />
    
    //            </div>
    //            <div className='h-30  w-30 flex justify-between items-center   rounded-full bg-white border-amber-400 border-2' >
    //            <FaRegPaperPlane className='text-amber-400 m-auto text-3xl' />
    
    //            </div>
    //         </div>
    
    //         <div className='my-20' >
    //           <h1 className='text-center' > Top Selling Products </h1>
    //         </div>
    //     </div>
    //     <CategorySlider />
    //     </div>
    //     </>
    //   )
    // }
    
    
    import MainSlider from '../MainSlider/MainSlider'
    import CategorySlider from "../CategorySlider/CategorySlider";
import imageAbout from "../../assets/images/pin/hero2.webp"
import { FaCartArrowDown, FaHeart } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="bg-[#f9f9f6] mt-20 text-gray-800 font-sans">
      {/* Header */}
      {/* <header className="flex items-center justify-between p-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-brown-800">Handmade Store</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:text-brown-600">Home</a>
          <a href="#" className="hover:text-brown-600">Products</a>
          <a href="#" className="hover:text-brown-600">About</a>
          <a href="#" className="hover:text-brown-600">Contact</a>
        </nav>
        <button className="bg-brown-500 text-white px-4 py-2 rounded hover:bg-brown-600">Login</button>
      </header> */}
      {/* slider */}
     

      {/* Hero Section */}
      <section className="bg-[url('/src/assets/images/pin/hero1.jpg')] hero bg-cover bg-center text-white py-60 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Unique Handmade Creations</h2>
        <p className="text-lg mb-6">Explore handcrafted items made with love.</p>
        <button className="bg-brown-600 hover:bg-brown-700 px-6 py-3 rounded text-white text-lg">Shop Now</button>
      </section>
      
    <div className="container mx-auto">
      <div className="mt-5">

    <MainSlider />
    
      </div>
      {/* Featured Products */}
      <section className="py-16  px-4">
        <h3 className="text-3xl font-bold text-center mb-10">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white hover:scale-105 duration-500 hover:shadow-yellow-300 p-4 rounded shadow hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <h4 className="text-xl font-semibold mb-2">Product Name</h4>
              <div className="flex justify-between items-center ">
              <p className="text-brown-600 font-bold mb-2">$25.00</p>
              <FaHeart className='text-2xl text-red-600 cursor-pointer' />


              </div>
              <button type="button" className="py-2.5 px-5 me-2 w-full text-white rounded-2xl mb-2 text-sm font-medium flex justify-center items-center focus:outline-none bg-[#a9690a] border border-gray-200 hover:bg-yellow-500 hover:text-black duration-300 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add To Cart <FaCartArrowDown className='ml-2 text-lg' />
              </button>
            </div>
          ))}
        </div>
      </section>
      </div>
      {/* Categories */}
      <section className="py-16 px-4 mb-4 bg-[#f0ece4]">
        <h3 className="text-3xl font-bold text-center mb-10">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[image1, image2, image3, image4,].map((cat) => (
            <div key={cat} className="text-center">
              <div className="h-32 w-32 mx-auto bg-gray-300 rounded-full mb-3">
                <img src={cat} className="w-full h-full object-cover rounded-full" alt="" />
              </div>
              <p className="text-lg font-medium">{cat.length}</p>
            </div>
          ))}
        </div>
      </section>
      <div className='container mx-auto' >
          <CategorySlider />

      {/* About */}
      <section className="py-16 px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 h-96 bg-gray-300 rounded">
          <img src={imageAbout} className="w-full rounded-2xl h-full object-cover" alt="" />
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-4">About Us</h3>
          <p className="text-lg">We believe in the beauty of handcrafted items. Our mission is to connect you with skilled artisans who put love into every piece they make.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-[#fdf9f4] p-6 rounded shadow">
              <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
              <p className="mb-2 italic">"Beautiful product and fast delivery! Highly recommend."</p>
              <p className="font-bold">Customer Name</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    
    </div>
  );
}
