"use client";

import { AddChallengeForm } from "@/components/challenges/AddChallengeForm";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

import React from "react";

export const AddChallengePage = () => {
  return (
    <>
      <DashboardNavbar />
      <h2>Create New Challenge</h2>
      <AddChallengeForm />
    </>
  );
};
export default AddChallengePage;
