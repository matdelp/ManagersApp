import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChallengeData } from "../../utils/api/create";
import Cookies from "js-cookie";

const FETCH_URL = "/api/challenge";

export const useEditChallenge = (id: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, Error, ChallengeData>({
    mutationFn: async (data) => {
      const token = Cookies.get("auth_token");

      if (!token) {
        throw new Error("No auth token found");
      }
      const response = await fetch(`${FETCH_URL}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Challenge edition failed");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Challenges", "Challenge"] });
      router.push("/dashboard");
    },
  });
};
