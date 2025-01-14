"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { ArrowRightCircle, ArrowLeftCircle } from "lucide-react";

function ImageSlider() {
  const images = ["/curry.jpg", "/chops.jpg", "steak.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const AutoPlayImage = () => {
    stopAutoPlayImage();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
  };

  const stopAutoPlayImage = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    stopAutoPlayImage();
  };

  const handleMouseLeave = () => {
    AutoPlayImage();
  };

  const handleNext = () => {
    stopAutoPlayImage();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    AutoPlayImage();
  };

  const handlePrev = () => {
    stopAutoPlayImage();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    AutoPlayImage();
  };

  useEffect(() => {
    AutoPlayImage();
    return () => {
      stopAutoPlayImage();
    };
  }, []);

  return (
    <div
      className="xl:h-[780px] mb:h-[300px] w-full max-w-[1400] relative group"
      onMouseEnter={stopAutoPlayImage}
      onMouseLeave={AutoPlayImage}
    >
      <div
        className="w-full h-full bg-center bg-cover transition-all ease-in-out border-2 border-black border-solid"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <div className="">
        <ArrowLeftCircle
          className="absolute top-[50%]  left-5 size-10 cursor-pointer hidden group-hover:inline-block bg-slate-200 rounded-full"
          onClick={handlePrev}
        />
      </div>
      <div >
        <ArrowRightCircle
          className="absolute top-[50%] right-5 size-10 cursor-pointer hidden group-hover:inline-block bg-slate-200 rounded-full "
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default ImageSlider;
