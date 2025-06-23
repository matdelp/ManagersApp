import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SigninForm } from "./SigninForm";

export const SigninCard: React.FC = () => {
  return (
    <>
      <Card className="w-2/3 bg-transparent flex gap-5">
        <CardHeader>
          <CardTitle>Join Managers Now !</CardTitle>
        </CardHeader>
        <CardContent>
          <SigninForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="py-1">
            New to Code CLA ?{" "}
            <a className="text-main-500 dark:text-main-100 " href="/signup">
              SignUp
            </a>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};
