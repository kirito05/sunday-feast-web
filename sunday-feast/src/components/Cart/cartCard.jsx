import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RxPlus, RxMinus } from "react-icons/rx";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";

const ProductCartCard = ({ photo, title, quantity, price }) => {
  return (
    <>
      <div className="flex flex-row justify-between p-2 shadow-xl bg-white rounded-md">
        <div>
          <Image
            src={photo}
            alt={title}
            className="w-[10em] h-[10em] object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-between relative w-[20em]">
          <h1>{title}</h1>
          <div className="flex flex-row items-center absolute bottom-0 right-0">
            <Button>
              <RxMinus />
            </Button>
            <span className="w-[2em] bg-white">{quantity}</span>
            <Button>
              <RxPlus />
            </Button>
          </div>
        </div>
        <div className="relative flex flex-col items-center w-[15em]">
          <Button className="hover:bg-red-300 hover:scale-105 text-xl p-[1.2em] absolute right-0 top-0 ">
            {" "}
            <RiDeleteBin6Fill />{" "}
          </Button>
          <h1>{price}</h1>
        </div>
      </div>
    </>
  );
};

const MobileCartCard = ({ photo, title, quantity, price, description }) => {
  return (
    <div className="flex flex-row justify-between p-2 gap-10 shadow-xl bg-white rounded-md h-fit w-full">
      <div>
        <Image
          src={photo}
          alt={title}
          className="w-[6em] h-full object-cover shadow-xl"
        />
      </div>
      <div className="flex-1 flex-row relative">
        <div className="flex flex-col items-start justify-center gap-1">
          <span className="text-2xl">{title}</span>
          <span>{description}</span>
          <span className="flex flex-row gap-0 items-center">
            {" "}
            <MdCurrencyRupee />
            {price * quantity}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center w-[5em] border-2 border-solid border-black rounded-md">
          {quantity === 1 ? (
            <RiDeleteBin6Fill className="size-3" />
          ) : (
            <RxMinus />
          )}
          <span className=" bg-white text-center">{quantity}</span>
          <RxPlus />
        </div>
      </div>
      {/* <div className="relative flex flex-col items-center">
  
          <RiDeleteBin6Fill className="size-3 absolute right-1 top-2" />


      </div> */}
      {/* <div className="flex flex-1 border-2 border-solid border-black flex-col items-center justify-between relative">
        <div className="flex flex-col items-center justify-between w-full ml-[5em]">
          <span className="text-2xl">{title}</span>
          <span>{description}</span>
          <span className="mt-10 ml-[14em] text-2xl">{price*quantity}</span>

        </div>
        <div className="flex flex-row items-center absolute bottom-0 right-0">
          <Button>
            <RxMinus />
          </Button>
          <span className="w-[2em] bg-white text-center">{quantity}</span>
          <Button>
            <RxPlus />
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col items-center w-[15em]">
        <Button className="hover:bg-red-300 hover:scale-105 text-xl p-[1em] size-2 absolute right-0 top-0 ">
          {" "}
          <RiDeleteBin6Fill className="size-2" />{" "}
        </Button>
        
      </div> */}
    </div>
  );
};

export { ProductCartCard, MobileCartCard };
