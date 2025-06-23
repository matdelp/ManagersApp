//Server page

import { ChallengesTableContainer } from "@/components/dashboard/ChallengesTable.container";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import Link from "next/link";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <>
      <DashboardNavbar />
      <div className="flex flex-col gap-2 p-2">
        <h2 className="text-4xl py-5">Your challenges</h2>
        <Link
          href="challenge/add"
          className="w-fit p-2 font-bold bg-main-500 text-background-100 cursor-pointer rounded-md"
        >
          New Challenges
        </Link>
        <ChallengesTableContainer />
      </div>
    </>
  );
};
export default DashboardPage;
