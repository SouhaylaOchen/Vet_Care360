const BASE_URL = "http://localhost:5000/api/vets";

export const getAllVets = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch vets");
  return await response.json();
};

export const getVetById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch vet");
  return await response.json();
};

export const createVet = async (vetData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vetData)
  });

  if (!response.ok) throw new Error("Failed to create vet");
  return await response.json();
};
