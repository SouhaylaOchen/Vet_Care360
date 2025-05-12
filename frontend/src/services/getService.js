const BASE_URL = "http://localhost:5000/api/get";

export const getPetTypes = async () => {
  const response = await fetch(`${BASE_URL}/pet-types`);
  if (!response.ok) throw new Error("Failed to fetch pet types");
  return await response.json();
};

export const getStatistics = async () => {
  const response = await fetch(`${BASE_URL}/statistics`);
  if (!response.ok) throw new Error("Failed to fetch statistics");
  return await response.json();
};
