"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/finegoat.png";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../components/ui/button";

import { Input } from "../../components/ui/input";
import Modal from "../Modal/modal";
import steak from "../../../public/steak.jpg";

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
    <div className="xl:grid grid-cols-2 mb:flex flex-col justify-evenly h-screen "
    style={{
      backgroundImage: `url(${steak.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    >
      <div
        // style={{
        //   borderEndStartRadius: "70em 70em",
        //   borderStartEndRadius: "70em 70em",
        // }}
        className={` h-screen flex justify-center rounded-full items-center flex-col relative z-10 xl:flex mb:hidden `}
      >
        <Image src={logo} alt="Login-logo" className="rounded-full" objectFit="cover" layout="fill" />
        <div className="text-[4rem] mt-10 tracking-widest absolute bottom-[0.7em] w-[8em] flex-row justify-center left-[3.5em] flex items-center z-10 bg-yellow-300 rounded-[5em]">
          FineGoat
          {/* <div className="rounded-full absolute -top-3 -left-5 -z-20  h-[2em] w-[8em] bg-yellow-400"></div> */}
        </div>
        {/* <div
          className="bg-green-400 absolute h-screen w-full -z-20"
          style={{
            borderStartStartRadius: "70em 70em",
            borderEndEndRadius: "70em 70em",
          }}
        ></div> */}
      </div>
      <div className="xl:hidden mb:flex flex-row justify-center items-center border-2 z-10 border-solid border-black bg-white h-[10vh]">
        <div className="flex justify-center items-center flex-col ">
          <span>Fine</span>
          <span>Goat</span>
        </div>
      </div>
      <div className=" h-screen flex justify-center items-center flex-col gap-10 z-10 ">
        <div className="shadow-lg p-10 rounded-lg h-1/2 xl:w-[30em] mb:w-[20em] flex flex-col justify-around items-center bg-white mb-[5em]">
          <div className="text-3xl font-bold underline underline-offset-4 tracking-wider">
            Register
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              openModal();
            }}
            className="flex flex-col items-center mb:gap-3 justify-between h-1/3 mb-10"
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