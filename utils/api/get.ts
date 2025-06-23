import { Challenge } from "@/components/dashboard/ChallengesTable.container";

export const getAllChallenges = async (): Promise<Challenge[]> => {
  const res = await fetch("http://localhost:3000/challenges", {});
  if (!res.ok) {
    throw new Error("Failed to fetch challenges");
  }
  return res.json();
};