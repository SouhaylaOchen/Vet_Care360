const BASE_URL = "http://localhost:5000/api/owners";

export const createOwner = async (ownerData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ownerData)
  });

  if (!response.ok) throw new Error("Failed to create owner");
  return await response.json();
};

export const getOwnerById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch owner");
  return await response.json();
};

export const getOwnerFullDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}/full`);
  if (!response.ok) throw new Error("Failed to fetch full owner details");
  return await response.json();
};

export const updateOwner = async (id, updatedData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) throw new Error("Failed to update owner");
  return await response.json();
};

export const searchOwnersByLastName = async (lastName) => {
  const url = lastName.trim()
    ? `${BASE_URL}/search?lastName=${encodeURIComponent(lastName)}`
    : `${BASE_URL}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to search owners");
  return await response.json();
};
