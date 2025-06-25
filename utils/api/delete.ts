"use server";

import { revalidatePath } from "next/cache";

export const DeleteChallenge = async (id: string) => {
  const res = await fetch(`http://localhost:3000/challenges/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    return { success: false, message: "Failed to delete the challenge" };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Challenge deleted successfully" };
};
