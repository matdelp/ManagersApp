import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "./SignupForm";

export const SignupCard: React.FC = () => {
  return (
    <>
      <Card className="w-2/3 bg-transparent flex gap-5">
        <CardHeader>
          <CardTitle>Join Managers Now !</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="py-1">
            Already have an account?{" "}
            <a className="text-main-500 dark:text-main-100 " href="/signin">
              SignIn
            </a>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};
