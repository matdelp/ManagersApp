"use client";

import { AddChallengeForm } from "@/components/challenges/AddChallengeForm";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

import React from "react";

export const AddChallengePage = () => {
  return (
    <div className="w-screen h-screen">
      <DashboardNavbar />
      <div className="py-5">
      <h2 className="text-3xl w-full py-5">Create New Challenge</h2>
      <AddChallengeForm />
    </div></div>
  );
};
export default AddChallengePage;
