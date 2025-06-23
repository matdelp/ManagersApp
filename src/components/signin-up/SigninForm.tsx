import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email("Invalid email adress"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;
export const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col items-center justify-center gap-5 w-full "
        action=""
        method="post"
      >
        <div className="w-full">
          <Input
            type="email"
            id="email"
            placeholder="Email"
            className="bg-white dark:bg-main-300 rounded-md text-gray-500 w-full"
            required
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 bg-transparent">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="bg-white dark:bg-main-300 rounded-md text-gray-500 w-full"
            required
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 bg-transparent">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          className="px-2 py-1 bg-blue-500 text-lg rounded-md text-main-100 w-full cursor-pointer"
          type="submit"
          onClick={() => onSubmit}
        >
          Login
        </Button>
      </form>
    </>
  );
};
