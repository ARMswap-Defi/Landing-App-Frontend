"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const CoinSlider = ({ coins }: { coins: string[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 12,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 9,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const logos = coins;

  return (
    <div className="container  container-slider  w-[95%] m-auto max-[768px]:py-[15px]">
      <Slider {...settings} className="customer-logos">
        {logos.map((logo: any, index: number) => (
          <div key={index} className="icon-holder">
            <div key={index} className="coin-icon ">
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_IMAGE_URL}${logo.coin_image[0].url}`}
                alt={"image"}
                height={logo.coin_image[0].height}
                width={logo.coin_image[0].width}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CoinSlider;
