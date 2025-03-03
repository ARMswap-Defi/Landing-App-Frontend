"use client";
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { imgPath } from '../blog-card/blogCard';

const IconSlider = ({ icons }: { icons: string[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: Math.min(6, icons.length),
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 4000,
    centerMode: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(5, icons.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, icons.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(2, icons.length),
        },
      },
    ],
}

  const logos = icons

  return (
    <div className='bg-shaded'>
         <div className="container icon-slider  w-[95%] m-auto pt-[30px] pb-[50px]">

<Slider {...settings} className="customer-logos">
  {logos?.map((logo: any, index: number) => (
    <div key={index} className='icon-holder' >
             <div
      key={index}
    
     
    >
      <Image
                            key={index}
                            className="px-[10px]"
                            src={imgPath(logo?.image.url)}
                            alt={logo.title}
                            width={
                              logo?.image.width > 300
                                ? 170
                                : logo?.image.width < 100
                                ? 100
                                : logo?.image.width
                            }
                            height={
                              logo?.image.height > 300
                                ? 170
                                : logo?.image.height
                            }
                          />
    </div>
    </div>
  ))}
</Slider>
</div>
    </div>

 

  );
};

export default IconSlider;