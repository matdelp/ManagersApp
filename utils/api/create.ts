"use client";

type FunctionInputValue = {
  name: string;
  value: string;
};

type Test = {
  weight: number;
  inputs: FunctionInputValue[];
  outputs: string;
};

type FunctionInputDefinition = {
  name: string;
  type: string;
};

type CodeText = {
  language: string;
  content: string;
};

type Code = {
  function_name: string;
  code_text: CodeText[];
  inputs: FunctionInputDefinition[];
};

export type ChallengeData = {
  title: string;
  category: string;
  description: string;
  level: "Easy" | "Moderate" | "Hard";
  code: Code;
  test: Test[];
};
