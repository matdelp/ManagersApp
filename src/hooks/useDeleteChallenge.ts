import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

const FETCH_URL = "/api/challenge";

export const useDeleteChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const token = Cookies.get("auth_token");

      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await fetch(`${FETCH_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Challenge deletion failed");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Challenges"] });
    },
  });
};
