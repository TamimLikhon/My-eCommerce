"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import image1 from "@/app/public/25years.jpg"
// import image2 from '@/app/public/hny.jpg';
// import image3 from '@/app/public/sl.jpg';
// import image4 from '@/app/public/fd.jpg';
// import image5 from '@/app/public/md.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

export default function ImageSlider() {
  const settings = {
    dots: true,
    arrows: true,
    prevArrow: <div className="slick-prev">Prev</div>,
    nextArrow: <div className="slick-next">Next</div>,
    autoplay: true, 
    autoplaySpeed: 3000, 
  };

  return (
    <div className="w-screen bg-grey-400 p-5">
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-8">
        {/* Left section - Main slider (spans 2 columns) */}
        <div className="col-span-2 bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-5xl font-bold mb-8">
            <span className="text-blue-900">NEW YEAR</span>
            <br />
            <span className="text-yellow-500">MEGA</span>
            <span className="text-gray-800">DEALS</span>
          </h2>
          
          <Slider {...settings}>
            <div className="p-3">
              <Image 
                src={"/25years.jpg"}
                alt="Laptop Promotion 1"
                className="w-full h-auto rounded-lg"
                width={1200}
                height={700}
              />
            </div>
            <div className="p-3">
              <Image 
                src={"/hny.jpg"}
                alt="Laptop Promotion 2"
                className="w-full h-auto rounded-lg"
                width={1200}
                height={700}
              />
            </div>
            <div className="p-3">
              <Image 
                src={"/sl.jpg"}
                alt="Laptop Promotion 3"
                className="w-full h-auto rounded-lg"
                width={1200}
                height={700}
              />
            </div>
          </Slider>
        </div>

        {/* Right section - Stacked content */}
        <div className="flex flex-col gap-6">
          {/* Top promotional content */}
          <div className="bg-white rounded-lg shadow-xl p-6 flex-1">
            <Image 
              src={"/fd.jpg"}
              alt="Free Delivery"
              className="w-full h-auto rounded-lg"
              width={600}
              height={400}
            />
            <div className="text-center mt-4">
              <h3 className="text-2xl font-bold text-red-600">FREE DELIVERY</h3>
              <p className="text-lg">All Over Bangladesh!</p>
            </div>
          </div>

          {/* Bottom promotional content */}
          <div className="bg-white rounded-lg shadow-xl p-6 flex-1">
            <Image 
              src={"/md.jpg"}
              alt="Special Offers"
              className="w-full h-auto rounded-lg"
              width={600}
              height={400}
            />
            <div className="text-center mt-4">
              <h3 className="text-xl font-bold">GET DISCOUNTS ON ALL</h3>
              <p className="text-lg">DEMANDING PRODUCTS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
