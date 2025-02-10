'use client'
import React from 'react'
import Image from 'next/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { IndianRupeeIcon } from 'lucide-react';
  import { useRouter } from 'next/navigation';

function ProductPageCard({productImg, title, description,price,weight,quantity, productId}) {
  const router = useRouter();
  const onAddToCart = () => {
    router.push("/Cart");
  }
  return (
    <>
    <Card className="border-2 p-3 border-black border-solid xl:w-[70em] xl:h-[30em] mb:w-[18em] mb:h-[20em] relative flex xl:flex-row">
        <CardHeader className="border-2 border-black border-solid xl:h-full  m-1 xl:w-1/2 mb:h-full mb:w-full">
            <Image src={productImg} alt={title} className="w-full h-full object-cover" />
        </CardHeader>
        <CardContent className="border-2 border-black border-solid h-full m-1 w-1/2 flex-col justify-between xl:flex mb:hidden">
            <CardTitle className="text-3xl mt-10">{title}</CardTitle>
            <CardDescription className="text-xl mb-3">{description}</CardDescription>
            <CardDescription className="flex flex-row items-center">Price:<IndianRupeeIcon className='size-3' />{price}</CardDescription>
            <CardDescription>weight</CardDescription>
            <CardDescription>Quantity</CardDescription>
            <CardFooter>
              <Button className="self-center hover:bg-red-300 hover:scale-105 text-xl p-[1.2em]" onclick={onAddToCart}> Add to Cart </Button>
            </CardFooter>
        </CardContent>
        
    </Card>
    </>
  )
}

export default ProductPageCard