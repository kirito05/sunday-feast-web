import React, {Suspense} from "react";
import Image from "next/image";
import ImageSlider from "../ImageSlider/imageslider";
import ProductCard from "../Product/productCard";
import heroImg from "../../../public/hero-section.png";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

const getProductDetails = async () => {
  const response = await fetch(
    "http://localhost:5000/v1/products/all-products",
    {
      cache: "no-store",
    }
  )
  const data = await response.json();
  console.log(data);
  return data;
};

export default async function HomePage() {
  const products = await getProductDetails();

  return (
    <>
      <div id="homepage-heroSection " className="relative">
        <ImageSlider />
        <div className="absolute top-1/2 flex flex-col text-black p-5 opacity-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-slate-50 xl:h-[70vh] mb:h-[28vh] xl:w-[60em] mb:w-[20em]">
          <div className="xl:border-4 mb:border-2 border-black border-solid w-full h-full">
            <div className="relative text-3xl w-full border-b-2 h-1/3 col-span-2  border-black border-solid flex items-center justify-center">
              <Image
                src={heroImg}
                alt="HeroSection Img"
                className="w-full h-full object-cover"
              />
              {/* <span className="text-sm absolute bottom-[2rem] right-[7rem]">Where freshness leaps off the plate</span> */}
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <div className="mb:text-lg xl:text-3xl">
                  Freshly Tender Mutton, Delivered from Farm to Your Home in
                  Just 6 Hours!
                </div>
                <div className="mb:text-[10px] xl:text-2xl">
                  Experience unmatched freshness with our swift farm-to-home
                  delivery service. From selecting premium quality to ensuring
                  timely delivery, we prioritize your satisfaction every step of
                  the way!"
                </div>
              </div>
              {/* <div className="row-span-2 col-span-2">image</div>
              <div></div> */}
            </div>
          </div>
        </div>
      </div>
      <div
        id="homepage-featureProduct"
        className="relative flex flex-col items-center mt-10  "
      >
        <div
          className="text-3xl tracking-wide font-bold underline underline-offset-8 "
          style={{ textDecorationColor: "red" }}
        >
          Catch Of The Day
        </div>
        <div className={`mb:hidden ${products.length === 1?"xl:flex":"xl:grid grid-cols-2 gap-4"} mt-[5em] mb-10`}>
          {/* <ProductCard title={products[0].name} />
          <ProductCard /> */}
          <Suspense fallback={<Skeleton />}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                title={product.name}
                productImg={product.image}
                cost={product.price}
                baseWeight={product.baseWeight}
                productId= {product.ProductId}
              />
            ))}

          </Suspense>
        </div>
        <div className="mb:inline-block xl:hidden">
          <ScrollArea className="w-[20em]">
            <div className={`flex w-max space-x-4 ${products.length===1?"ml-5":""} p-4`}>
              {products.map((product)=>(
                <ProductCard
                key={product._id}
                title={product.name}
                productImg={product.image}
                cost={product.price}
                baseWeight={product.baseWeight}
                productId= {product.ProductId}
              />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
