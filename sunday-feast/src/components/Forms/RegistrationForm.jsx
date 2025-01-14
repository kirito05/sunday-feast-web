"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/goat-icon.svg";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../components/ui/button";

import { Input } from "../../components/ui/input";
import Modal from "../Modal/modal";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";

import axios from "axios";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  PhoneNumber: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Phone number is not valid")
    .required("Phone number is required"),

  Name: yup.string().required("Name is required"),

  OTP: yup
    .string()
    .length(6, "OTP must be 6 digits")
    .matches(/^\d{6}$/, "OTP must contain only numbers")
    .required("OTP is required"),
});

function RegisterForm() {
  const { control, handleSubmit, formState, reset, getValues, setValue } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        PhoneNumber: "",
        Name: "",
        OTP: "",
      },
    });

  const onSubmit = (data) => {
    data.PhoneNumber = `+91${data.PhoneNumber}`;
    console.log("form submitted", data);
    reset();
    closeModal();
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeModal = () => {
    setIsDialogOpen(false);
  };
  const openModal = () => {
    if (getValues("PhoneNumber").length === 10) {
      setIsDialogOpen(true);
    } else {
      toast("Please enter a valid phone number", {
        icon: "📞",
      });
    }
  };

  return (
    <div className="xl:grid xl:grid-cols-2 bg-sky-200 ">
      <div
        style={{
          borderEndStartRadius: "70em 70em",
          borderStartEndRadius: "70em 70em",
        }}
        className={` bg-green-400 xl:h-screen mb:hidden xl:inline-block  flex justify-center items-center flex-col relative z-10 `}
      >
        <Image src={logo} alt="Login-logo" className="xl:size-[20em] lg:size-[10em]" />
        <div className="xl:text-[4rem] lg:text-[3rem] mt-10 ml-14 tracking-widest relative flex items-center z-10">
          FineGoat
          <div className="rounded-full absolute -top-3 -left-5 -z-20  h-[2em] w-[8em] bg-yellow-400"></div>
        </div>
        {/* <div
          className="bg-green-400 absolute h-screen w-full -z-20"
          style={{
            borderStartStartRadius: "70em 70em",
            borderEndEndRadius: "70em 70em",
          }}
        ></div> */}
        <div className="mb:inline-block lg:hidden">FineGoat</div>
      </div>
      <div className=" h-screen flex justify-center items-center flex-col lg:gap-10 mb:gap-15 ">
        <div className="shadow-lg p-10 rounded-lg xl:h-1/2  xl:w-[30em] mb:h-[50vh] mb:w-[20em] flex flex-col justify-around items-center bg-white">
          <div className="text-3xl font-bold underline underline-offset-4 tracking-wider">
            Register
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              openModal();
            }}
            className="flex flex-col items-center mb:gap-2 justify-between h-1/3 mb-10"
          >
            <Controller
              name="PhoneNumber"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="flex flex-col w-full">
                  <Input
                    {...field}
                    placeholder="Enter your phone number"
                    className="p-4 border"
                  />
                  {error && (
                    <p className="text-red-500 mt-2">{error.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="Name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className="flex flex-col w-full">
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    className="p-4 border"
                  />
                  {error && (
                    <p className="text-red-500 mt-2">{error.message}</p>
                  )}
                </div>
              )}
            />
            <Button type="submit" className="p-4 bg-blue-400 text-white">
              Sign Up
            </Button>
          </form>
        </div>
        {isDialogOpen && (
          <Modal
            isOpen={openModal}
            isClose={closeModal}
            className={"w-[30em] p-5 border-2 border-solid"}
          >
            <form
              className="border-2 border-solid border-black p-10 flex flex-col justify-between items-center h-[15em]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="OTP"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div className="flex flex-col">
                    <label className="mb-2 text-sm">Enter OTP</label>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    {error && (
                      <p className="text-red-500 mt-2">{error.message}</p>
                    )}
                  </div>
                )}
              />
              <Button type="submit" className="p-4 bg-green-400 text-white">
                Submit OTP
              </Button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;