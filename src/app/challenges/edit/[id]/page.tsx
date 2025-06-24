import { EditChallengeForm } from "@/components/challenges/EditChallengeForm ";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import React from "react";
import { getChallengeById } from "../../../../../utils/api/get";

interface EditChallengePageProps {
  params: { id: string };
}

const EditChallengePage = async ({ params }: EditChallengePageProps) => {
  const { id } = await params;
  const challenge = await getChallengeById(id);

  return (
    <div className="w-screen h-screen">
      <DashboardNavbar />
      <div className="py-5">
        <h2 className="text-3xl w-full py-5">Create New Challenge</h2>
        <EditChallengeForm {...challenge} />
      </div>
    </div>
  );
};

export default EditChallengePage;
