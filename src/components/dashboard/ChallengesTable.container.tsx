import React from "react";
import { ChallengesTable } from "./ChallengesTable";

export type Challenge = {
  id: number;
  title: string;
  category: string;
  level: "Easy" | "Moderate" | "Hard";
  createdAt: string;
  actions: unknown; //TOCHANGE
};

export const getAllChallenges = async (): Promise<Challenge[]> => {
  const res = await fetch("http://localhost:3000/challenges", {});
  if (!res.ok) {
    throw new Error("Failed to fetch challenges");
  }
  return res.json();
};

export const ChallengesTableContainer: React.FC = async () => {
  const challenges = await getAllChallenges();

  return (
    <div>
      <ChallengesTable items={challenges} />
    </div>
  );
};
