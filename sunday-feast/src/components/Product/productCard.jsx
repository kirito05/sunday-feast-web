"use client";
import React from "react";
import Image from "next/image";
import {useRouter,useSearchParams,usePathname} from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";






function ProductCard({ productImg, title, cost, baseWeight, productId }) {
  const router = useRouter();
  const [cardHovered, setCardHovered] = useState(false);
  const costPerWeight = (cost, baseWeight) => {
    const pw = (cost * baseWeight) / 1000;
    return `${pw} / ${baseWeight}gms `;
  };
  const handleMouseEnter = () => {
    setTimeout(() => setCardHovered(true), 50);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setCardHovered(false), 50);
  };

  

  const handleKnowMore = async () => {
    router.push(`/Category/mutton/${productId}`);
    

    
  }

  return (
    <Card className="xl:w-[30em] xl:h-[40em] mb:w-[15em] mb:h-[30em] relative">
      <CardHeader className="h-[40vh]">
        <Image
          src={productImg}
          alt={title}
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
      </CardContent>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h-[13.5em]"
      >
        {!cardHovered ? (
          <CardFooter className="flex flex-col items-start w-full gap-10 ml-4 absolute bottom-0">
            <p className="text-2xl">Price:{cost}</p>
            <div className="flex-grow"></div>
            <p className="self-center text-lg mb-5">
              {costPerWeight(cost, baseWeight)}
            </p>
          </CardFooter>
        ) : (
          <CardFooter className="w-full flex-col items-center gap-2">
            <Button className="self-center hover:bg-red-300 hover:scale-105 text-xl p-[1.2em]" onClick={handleKnowMore}>
              Know More
            </Button>
            <Button className="self-center hover:bg-red-300 hover:scale-105 text-xl p-[1.2em]">
              Add to Cart
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  );
}



export default ProductCard;
