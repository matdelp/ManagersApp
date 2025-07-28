"use client";
import React from "react";
import { useGetChallenge } from "@/hooks/useGetChallenge";
import { ChallengesTable } from "./ChallengesTable";

export type Challenge = {
  id: string;
  title: string;
  category: string;
  level: "Easy" | "Moderate" | "Hard";
  createdAt: string;
  actions: unknown; //TOCHANGE
};

export const ChallengesTableContainer: React.FC = () => {
  const { data: challenges, isLoading, error } = useGetChallenge();
  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <ChallengesTable items={challenges} />
    </div>
  );
};
