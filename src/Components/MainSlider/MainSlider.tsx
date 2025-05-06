import React from "react";
import Slider from "react-slick";
import image1 from "../../assets/images/shopping.webp";
// import image2 from "../../assets/images/slider2.jpg";   
export default function SimpleSlider() {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div className=" h-[500px]">
        <div className="flex">
            <div className="w-1/2 h-[500px] flex items-center justify-center">
               <img src={image1} className="w-full shadow-2xl rounded-l-2xl object-fill object-center max-h-[500px] max-w-[700px] "  alt="" />
            </div>
            <div className="w-1/2 h-[500px] p-10 my-auto  shadow-2xl rounded-r-2xl bg-yellow-900 flex items-center justify-center">
                <h5 className="text-white" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nemo obcaecati, sunt praesentium architecto aliquid consectetur inventore fugit dolorem ut  architecto eum, sed neque veniam libero illum maiores, praesentium laboriosam?</h5>
            </div>
        </div>
     
      </div>
      <div className=" h-[500px]">
      <div className="flex">
            <div className="w-1/2 h-[500px] flex items-center justify-center">
               <img src={image1} className="w-full shadow-2xl rounded-l-2xl object-fill object-center max-h-[500px] max-w-[700px] "  alt="" />
            </div>
            <div className="w-1/2 h-[500px] p-10 my-auto  shadow-2xl rounded-r-2xl bg-yellow-900 flex items-center justify-center">
                <h5 className="text-white" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nemo obcaecati, sunt praesentium architecto aliquid consectetur inventore fugit dolorem ut  architecto eum, sed neque veniam libero illum maiores, praesentium laboriosam?</h5>
            </div>
        </div>
      </div>
      <div className=" h-[500px]">
      <div className="flex">
            <div className="w-1/2 h-[500px] flex items-center justify-center">
               <img src={image1} className="w-full shadow-2xl rounded-l-2xl object-fill object-center max-h-[500px] max-w-[700px] "  alt="" />
            </div>
            <div className="w-1/2 h-[500px] p-10 my-auto  shadow-2xl rounded-r-2xl bg-yellow-900 flex items-center justify-center">
                <h5 className="text-white" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nemo obcaecati, sunt praesentium architecto aliquid consectetur inventore fugit dolorem ut  architecto eum, sed neque veniam libero illum maiores, praesentium laboriosam?</h5>
            </div>
        </div>
      </div>
      <div className=" h-[500px]">
         <div className="flex">
            <div className="w-1/2 h-[500px] flex items-center justify-center">
               <img src={image1} className="w-full shadow-2xl rounded-l-2xl object-fill object-center max-h-[500px] max-w-[700px] "  alt="" />
            </div>
            <div className="w-1/2 h-[500px] p-10 my-auto  shadow-2xl rounded-r-2xl bg-yellow-900 flex items-center justify-center">
                <h5 className="text-white" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nemo obcaecati, sunt praesentium architecto aliquid consectetur inventore fugit dolorem ut  architecto eum, sed neque veniam libero illum maiores, praesentium laboriosam?</h5>
            </div>
        </div>
      </div>
      <div className=" h-[500px]">
      <div className="flex">
            <div className="w-1/2 h-[500px] flex items-center justify-center">
               <img src={image1} className="w-full shadow-2xl rounded-l-2xl object-fill object-center max-h-[500px] max-w-[700px] "  alt="" />
            </div>
            <div className="w-1/2 h-[500px] p-10 my-auto  shadow-2xl rounded-r-2xl bg-yellow-900 flex items-center justify-center">
                <h5 className="text-white" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nemo obcaecati, sunt praesentium architecto aliquid consectetur inventore fugit dolorem ut  architecto eum, sed neque veniam libero illum maiores, praesentium laboriosam?</h5>
            </div>
        </div>
      </div>
      <div className=" h-[500px]">
      <div className="flex">
            <div className="w-1/2 h-[500px] flex items-center justify-center">
               <img src={image1} className="w-full shadow-2xl rounded-l-2xl object-fill object-center max-h-[500px] max-w-[700px] "  alt="" />
            </div>
            <div className="w-1/2 h-[500px] p-10 my-auto  shadow-2xl rounded-r-2xl bg-yellow-900 flex items-center justify-center">
                <h5 className="text-white" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis nemo obcaecati, sunt praesentium architecto aliquid consectetur inventore fugit dolorem ut  architecto eum, sed neque veniam libero illum maiores, praesentium laboriosam?</h5>
            </div>
        </div>
      </div>
    </Slider>
  );
}