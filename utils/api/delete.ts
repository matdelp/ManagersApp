export const DeleteChallenge = async (id: string) => {
  const res = await fetch(`http://localhost:3000/challenges/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete the challenge");
  }
};
