"use client";
import { SigninCard } from "@/components/signin-up/SigninCard";
import Image from "next/image";
import React from "react";
import coding from "../../../public/images/coding.png";

const SigninPage: React.FC = () => {
  return (
    <>
      <main className="grid xl:grid-cols-2 w-screen h-screen">
        <div className="flex items-center justify-center bg-background-500">
          <Image src={coding} alt="coding icon" width={500} height={500} />
        </div>
        <div className="flex flex-col items-center justify-center bg-background-100  dark:bg-main-700 w-full dark:text-main-100 ">
          <SigninCard />
        </div>
      </main>
    </>
  );
};
export default SigninPage;
