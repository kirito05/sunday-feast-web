"use client";
import React, { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ProductCartCard, MobileCartCard } from "./cartCard";
import { MdRemoveShoppingCart } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { Button } from "../ui/button";

function Cart({cart}) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Mutton", price: 500, quantity: 2 },
    { id: 2, name: "Chicken", price: 200, quantity: 1 },
    { id: 3, name: "Fish", price: 300, quantity: 1 },
    { id: 4, name: "Prawns", price: 400, quantity: 1 },
    { id: 5, name: "Mutton", price: 500, quantity: 2 },
    { id: 6, name: "Chicken", price: 200, quantity: 1 },
  ]);
  const itemTotal = (price, quantity) => {
    return price * quantity;
  };
  const cartTotal = (price) => {
    return price.reduce((a, b) => a + b, 0);
  };

  const prices = cartItems.map((item) => itemTotal(item.price, item.quantity));

  console.log(prices);

  //   <MobileCartCard className="xl:hidden mb:inline-block" title={"mutton"} price={"500"} quantity={1} />

  return (
    <div className="shadow-xl rounded-lg flex xl:flex-row gap-5 justify-center xl:w-[80em] xl:h-[80vh] mb:w-[100%] mb:h-screen mb:flex-col  ">
      <div
        className={`mb:hidden border-solid border-r-4 bg-red-200 flex-1 xl:flex flex-col gap-2 relative rounded-lg  ${
          cartItems.length === 0 ? "items-center justify-center" : ""
        }`}
      >
        {cartItems.length > 0 ? (
          <div>
            <h1 className="xl:inline-block mb:hidden m-5 text-3xl absolute">
              Your Cart{" "}
            </h1>
            {cartItems.length >= 3 ? (
              <ScrollArea className="mt-14 h-[70vh]">
                <div className="flex flex-col gap-3 p-4 w-[50em] h-[100%]">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <ProductCartCard title={item.name} quantity={item.quantity} price={item.price} />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div
                className={`flex flex-col gap-3 p-4 w-[50em] h-[70vh] ${
                  cartItems.length === 1
                    ? "items-center justify-center"
                    : cartItems.length === 2
                    ? "items-center justify-evenly"
                    : "items-center justify-between"
                } `}
              >
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <ProductCartCard title={item.name} quantity={item.quantity} price={item.price} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-[12em] text-2xl flex items-center gap-2 border-2 border-dashed border-black p-5">
            <MdRemoveShoppingCart className="size-14" />
            <p>No items in cart</p>
          </div>
        )}
      </div>
      {cartItems.length != 0 && (
        <div className="xl:flex flex-col justify-between flex-1 ml-[-1em] mb:hidden">
          <div className="h-[70vh] border-b-2 border-solid border-black p-4">
            <h1 className="text-3xl underline-offset-4 underline">Summary</h1>
            <div>
              {cartItems.map((item, index) => (
                <div
                  className="flex flex-row items-center justify-between gap-2 mt-5"
                  key={index}
                >
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                  <span className="flex flex-row items-center">
                    <MdCurrencyRupee className="size-5" />
                    {itemTotal(item.price, item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[30vh] p-2 flex flex-row items-start justify-center gap-[15em] relative">
            <h1 className="text-xl mt-4">Cart Total : </h1>
            <span className="text-3xl mr-5 mt-4">{cartTotal(prices)}</span>
            <Button className="absolute bottom-4 right-6  w-[8em] h-[3em] hover:bg-red-400">
              Pay Now
            </Button>
          </div>
        </div>
      )}
      <div className="xl:hidden mb:flex flex-col gap-[2em] h-[100vh]">
      <h1 className="xl:hidden mb:inline-block m-5 text-3xl ml-10 ">
              Your Cart{" "}
            </h1>

        {cartItems.length > 0 ? (
          <div
            className={`xl:hidden mb:flex flex-col gap-2 relative rounded-lg  ${
              cartItems.length === 0 ? "items-center justify-center" : ""
            }`}
          >
            {cartItems.length >= 3 ? (
              <ScrollArea className="h-[50vh]">
                <div className="flex flex-col gap-3 p-4 h-[100%]">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <MobileCartCard title={item.name} price={item.price} quantity={item.quantity}   />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div
                className={`flex flex-col gap-3 p-4 ${
                  cartItems.length === 1
                    ? "items-center justify-center"
                    : cartItems.length === 2
                    ? "items-center justify-evenly"
                    : "items-center justify-between"
                } `}
              >
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <MobileCartCard title={item.name} price={item.price} quantity={item.quantity}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-[12em] text-2xl flex items-center gap-2 border-2 border-dashed border-black p-5">
            <MdRemoveShoppingCart className="size-14" />
            <p>No items in cart</p>
          </div>
        )}
        <div className="h-[20vh] p-2 flex flex-row items-start justify-center gap-[5em] relative">
          <span className="text-xl ml-1 mt-4">Cart Total</span>
          <span className="text-3xl mr-5 mt-4">{cartTotal(prices)}</span>
          <Button className="absolute bottom-0 right-6 w-[8em] h-[3em]">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
