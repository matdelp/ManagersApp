"use client";

import { EditChallengeForm } from "@/components/challenges/EditChallengeForm";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { useGetChallengeById } from "@/hooks/useGetChallengeById";
import { useParams } from "next/navigation";

const EditChallengePage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const { data: challenge, isPending, error } = useGetChallengeById(id);
  if (isPending) return <div>Edit pending</div>;
  if (error) return <div>Edit failed</div>;

  return (
    <div className="w-screen h-screen">
      <DashboardNavbar />
      <div className="py-5">
        <h2 className="text-3xl w-full py-5">Edit your Challenge:</h2>
        {challenge && (
          <EditChallengeForm challenge={challenge} challengeId={id} />
        )}
      </div>
    </div>
  );
};

export default EditChallengePage;
