import { useAuthStore } from "@/store/useAuthStore";
import { ManagerLogin } from "@/types/managerLogin";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const FETCH_URL = "/auth/managers/login";

export const useManagerLogin = () => {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

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
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const resData = await response.json();
      const token = resData.token;
      setToken(token);
      Cookies.set("auth_token", token, {
        expires: 7, // days
        secure: true,
        sameSite: "lax",
      });
      return;
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
};
