"use client";

import { ChallengesTableContainer } from "@/components/dashboard/ChallengesTable.container";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <>
      <DashboardNavbar />
      <ChallengesTableContainer />
    </>
  );
};
export default DashboardPage;
