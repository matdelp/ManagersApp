export const generateId = async (): Promise<string> => {
  const res = await fetch("http://localhost:3000/challenges");
  const existing = await res.json();

  // Generate the next ID
  const nextId = (existing.length + 1).toString(); // ✅ a string, not a promise
  return nextId;
};
