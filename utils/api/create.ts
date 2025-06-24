"use server";

interface TestCase {
  id: number;
  type: string;
  argument: string;
  value: number;
  output: number;
  weight: number;
}

interface Code {
  function: string;
  code: string;
}

export interface ChallengeData {
  id: string;
  title: string;
  category: string;
  description: string;
  level: "Easy" | "Moderate" | "Hard";
  code: Code;
  tests: TestCase[];
  createdAt: string;
}

export const CreateChallenge = async (
  data: ChallengeData
): Promise<ChallengeData> => {
  const res = await fetch(`http://localhost:3000/challenges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to create the challenge");
  }
  return await res.json();
};
