"use client";

type FunctionInputValue = {
  _id?: string;
  name: string;
  value: string;
};

type Test = {
  _id?: string;
  weight: number;
  inputs: FunctionInputValue[];
  outputs: string;
};

type FunctionInputDefinition = {
  _id?: string;
  name: string;
  type: string;
};

type CodeText = {
  _id?: string;
  language: string;
  content: string;
};

type Code = {
  _id?: string;
  function_name: string;
  code_text: CodeText[];
  inputs: FunctionInputDefinition[];
};

export type ChallengeData = {
  _id?: string;
  title: string;
  category: string;
  description: string;
  level: "Easy" | "Moderate" | "Hard";
  code: Code;
  test: Test[];
};
