//Server Component

import React from "react";
import { ChallengesTable } from "./ChallengesTable";
import { getAllChallenges } from "../../../utils/api/get";

export type Challenge = {
  id: string;
  title: string;
  category: string;
  level: "Easy" | "Moderate" | "Hard";
  createdAt: string;
  actions: unknown; //TOCHANGE
};

export const ChallengesTableContainer: React.FC = async () => {
  const challenges = await getAllChallenges();

  return (
    <div>
      <ChallengesTable items={challenges} />
    </div>
  );
};
