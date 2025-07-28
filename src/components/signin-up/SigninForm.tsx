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
import { useManagerLogin } from "@/hooks/useSignin";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters",
  }),
});

export const SigninForm: React.FC = () => {
  const { mutate, isPending, error: mutationError } = useManagerLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { register, handleSubmit } = form;

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    mutate(formData);
  };
  if (isPending) {
    return <div>Login pending</div>;
  }
  if (mutationError) {
    return <div>Login failed</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-5 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
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
