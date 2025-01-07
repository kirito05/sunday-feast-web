"use client";
import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import logo from "../../../public/goat-icon.svg"
import {RxAvatar} from "react-icons/rx"
import { useState } from "react";

function NavBar() {
  const [focusedItem, setFocusedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFocus = (index) => {
    setFocusedItem(index);
  };
  return (
    <nav className="flex flex-row justify-between items-center p-4 border-black border-solid border-2 h-28 ">
      <div>
        <Image src={logo} alt="company logo" />
      </div>
      <div>
        <ul className="flex flex-row items-center justify-center relative">
          <div
            className={`absolute top-0 w-full bg-black h-[0.1rem]`}
          ></div>
          {["HOME", "MEAT"].map((item, index) => (
            <li
              key={index}
              className="p-4 cursor-pointer flex flex-col w-[24.5em] items-center justify-center hover:scale-105 relative"
              onMouseEnter={() => handleFocus(index)}
              onMouseLeave={() => handleFocus(null)}
              onClick={() => handleFocus(index)}
              tabIndex={0} // Make the element focusable
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 border-2 border-solid transition-colors ${
                  focusedItem === index
                    ? "border-black"
                    : "border-transparent"
                }`}
              ></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mr-10">
        {isLoggedIn===true?(<DropdownMenu>   
          <DropdownMenuTrigger>
            <div className="rounded-full p-2 cursor-pointer">
                <Avatar className="size-12">
                    <AvatarImage src="https://randomuser.me/api/portraits " alt="avatar" />
                    <AvatarFallback className="bg-gray-400">JD</AvatarFallback>
                </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Orders</DropdownMenuItem>
            <DropdownMenuItem>Address Book</DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>):(<div className="flex flex-col items-center justify-center gap-2 cursor-pointer mt-4">
            <RxAvatar className="size-12"/>
        </div>)}
      </div>
    </nav>
  );
}

export default NavBar;
