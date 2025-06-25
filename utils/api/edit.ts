"use client";

import { ChallengeData } from "./create";

export const EditChallenge = async (
  data: ChallengeData,
  challengeId: string
): Promise<ChallengeData> => {
  const res = await fetch(`http://localhost:3000/challenges/${challengeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    alert(`Status ${res.status}: Failed to edit the challenge`);
    throw new Error("Failed to edit the challenge");
  }
  alert(`Status ${res.status}: Challenge edited successfully`);
  return await res.json();
};
