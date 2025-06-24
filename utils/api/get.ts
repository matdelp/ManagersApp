"use server";

import { Challenge } from "@/components/dashboard/ChallengesTable.container";
import { ChallengeData } from "./create";

export const getAllChallenges = async (): Promise<Challenge[]> => {
  const res = await fetch("http://localhost:3000/challenges", {});
  if (!res.ok) {
    throw new Error("Failed to fetch challenges");
  }
  return res.json();
};

export const getChallengeById = async (id: string): Promise<ChallengeData> => {
  const res = await fetch(`http://localhost:3000/challenges/${id}`);
  if (!res.ok) {
    throw new Error(`Challenge with ID ${id} not found`);
  }
  return res.json();
};
