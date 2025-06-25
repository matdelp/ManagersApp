"use server";

import { ChallengeData } from "./create";

export const EditChallenge = async (
  data: ChallengeData, challengeId:string): Promise<ChallengeData> => {
  const res = await fetch(`http://localhost:3000/challenges/${challengeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to edit the challenge");
  }
  return await res.json();
};
