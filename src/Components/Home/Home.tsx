import React from 'react'
import MainSlider from '../MainSlider/MainSlider'
import image1 from '../../assets/images/download (14).jpeg'
import image2 from '../../assets/images/download (27).jpeg'
import image3 from '../../assets/images/download (31).jpeg'
import image4 from '../../assets/images/download (30).jpeg'
import image5 from '../../assets/images/download (29).jpeg'
import image6 from '../../assets/images/images (42).jpeg'
import { FaRegPaperPlane } from 'react-icons/fa'
import Category from '../Category/Category'
import CategorySlider from '../CategorySlider/CategorySlider'
export default function Home() {
  return (
    <>
    <div className="container mx-auto">

    <div className='mt-10' >
      <MainSlider />
       <div className='mt-10 ' >
        <h1 className='text-3xl text-center font-bold'>Welcome to our website</h1>
        <p className='text-center mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
        
        <div className="flex justify-around mt-10 flex-wrap" >
          <div className="flex flex-col gap-2 items-center justify-center" >

          <div className='w-40 h-40 bg-red-800 rounded-full' >
           <img src={image1} className='w-40 h-40 object-center object-cover rounded-full' alt="" />
          </div> 
          <h4>hello</h4>

          </div>
          <div className="flex flex-col gap-2 items-center justify-center" >

          <div className='w-40 h-40 bg-red-800 rounded-full' >
          <img src={image2} className='w-40 h-40 object-center object-cover rounded-full' alt="" />

          </div> 
          <h4>hello</h4>

          </div>
          <div className="flex flex-col gap-2 items-center justify-center" >

          <div className='w-40 h-40 bg-red-800 rounded-full' >
          <img src={image3} className='w-40 h-40 object-center object-cover rounded-full' alt="" />

          </div> 
          <h4>hello</h4>

          </div>
          <div className="flex flex-col gap-2 items-center justify-center" >

          <div className='w-40 h-40 bg-red-800 rounded-full' >
          <img src={image4} className='w-40 h-40 object-center object-cover rounded-full' alt="" />

          </div> 
          <h4>hello</h4>

          </div>
          <div className="flex flex-col gap-2 items-center justify-center" >

          <div className='w-40 h-40 bg-red-800 rounded-full' >
          <img src={image5} className='w-40 h-40 object-center object-cover rounded-full' alt="" />

          </div> 
          <h4>hello</h4>

          </div>
         
        
        </div>
       
       </div>
        
        <div className='m-10  md:flex-row flex flex-col justify-around  ' >
           <div className='h-30 w-30 flex flex-col justify-between items-center   rounded-full bg-white border-amber-400 border-2' >
           <FaRegPaperPlane className='text-amber-400 m-auto text-3xl' />
           
           </div>
           <div className='h-30 w-30 flex justify-between items-center   rounded-full bg-white border-amber-400 border-2' >
           <FaRegPaperPlane className='text-amber-400 m-auto text-3xl' />

           </div>
           <div className='h-30 w-30 flex justify-between items-center   rounded-full bg-white border-amber-400 border-2' >
           <FaRegPaperPlane className='text-amber-400 m-auto text-3xl' />

           </div>
           <div className='h-30  w-30 flex justify-between items-center   rounded-full bg-white border-amber-400 border-2' >
           <FaRegPaperPlane className='text-amber-400 m-auto text-3xl' />

           </div>
        </div>

        <div className='my-20' >
          <h1 className='text-center' > Top Selling Products </h1>
        </div>
    </div>
    <CategorySlider />
    </div>
    </>
  )
}
