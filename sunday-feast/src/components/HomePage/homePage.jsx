import React from "react";
import Image from "next/image";
import ImageSlider from "../ImageSlider/imageslider";
import ProductCard from "../Product/productCard";
import heroImg from "../../../public/hero-section.png"

function HomePage() {
  return (
    <>
      <div id="homepage-heroSection " className="relative">
        <ImageSlider />
        <div className="absolute top-1/2 flex flex-col text-black p-5 opacity-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-slate-50 xl:h-[70vh] mb:h-[28vh] xl:w-[60em] mb:w-[20em]">
          <div className="xl:border-4 mb:border-2 border-black border-solid w-full h-full">
            <div className="relative text-3xl w-full border-b-2 h-1/3 col-span-2  border-black border-solid flex items-center justify-center">
              <Image src={heroImg} alt="HeroSection Img" />
              {/* <span className="text-sm absolute bottom-[2rem] right-[7rem]">Where freshness leaps off the plate</span> */}
            </div>
            <div className="flex flex-row justify-between">
              <div className="border-r-2 border-black border-solid h">description</div>
              <div className="row-span-2 col-span-2">image</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div id="homepage-featureProduct" className="relative flex flex-col items-center mt-10  ">
          <div className="text-3xl tracking-wide font-bold underline underline-offset-8 " style={{textDecorationColor:"red"}}>Catch Of The Day</div>
          <div className="grid grid-cols-2 gap-4 mt-[5em] mb-10">
            <ProductCard />
            <ProductCard />
          </div>
          
      </div>
    </>
  );
}

export default HomePage;
