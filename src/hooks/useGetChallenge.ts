import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const FETCH_URL = "/api/challenge";

export const useGetChallenge = () => {
  return useQuery({
    queryKey: ["Challenges"],
    queryFn: async () => {
      const token = Cookies.get("auth_token");

      if (!token) {
        throw new Error("No auth token found");
      }
      const response = await fetch(FETCH_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = (await response.text()) || response.statusText;
        throw new Error(errorText);
      }
      return await response.json();
    },
  });
};
