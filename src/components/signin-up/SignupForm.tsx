"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateManager } from "@/hooks/useSignup";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters",
  }),
  firstName: z.string().min(2, {
    message: "Name must contain at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "Name must contain at least 2 characters",
  }),
});

export const SignupForm = () => {
  const { mutate, isPending, error: mutationError } = useCreateManager();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { register, handleSubmit, control } = form;
  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    mutate(formData);
  };
  if (isPending) {
    return <div>Register pending</div>;
  }
  if (mutationError) {
    return <div>Register failed</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-5 w-full"
      >
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...register("firstName")}
                  className="bg-background-100 text-main-700 py-5"
                  placeholder="First Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...register("lastName")}
                  className="bg-background-100 text-main-700 py-5"
                  placeholder="Last Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...register("email")}
                  className="bg-background-100 text-main-700 py-5"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...register("password")}
                  className="bg-background-100 text-main-700 py-5"
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-main-500 text-lg p-5">
          Submit
        </Button>
      </form>
    </Form>
  );
};
