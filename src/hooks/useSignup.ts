import { ManagerLogin } from "@/types/managerLogin";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const FETCH_URL = "/auth/managers/register";

export const useCreateManager = () => {
  const router = useRouter();

  return useMutation<void, Error, ManagerLogin>({
    mutationFn: async (data) => {
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      console.log({ data });

      if (!response.ok) {
        throw new Error("Signup failed");
      }
      return;
    },
    onSuccess: () => {
      router.push("/signin");
    },
  });
};
