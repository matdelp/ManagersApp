import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const SigninCard: React.FC = () => {
  return (
    <>
      <Card className="w-2/3 bg-transparent flex gap-5">
        <CardHeader>
          <CardTitle>Join Managers Now !</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            // onSubmit={(e) => e.preventDefault()}
            noValidate
            className="flex flex-col items-center justify-center gap-5 w-full "
            action=""
            method="post"
          >
            <div className="bg-white dark:bg-main-300 rounded-md text-main-100 w-full">
              <Input type="email" id="email" placeholder="Email" required />
            </div>
            <div className=" bg-white dark:bg-main-300 rounded-md text-main-100 w-full">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="px-2 py-1 bg-blue-500 rounded-md text-main-100 w-full cursor-pointer"
            type="submit"
            // onClick={onSubmit}
          >
            Login
          </Button>
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
