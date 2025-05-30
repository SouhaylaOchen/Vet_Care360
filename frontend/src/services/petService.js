const BASE_URL = 'http://localhost:5000/api/pets';

export const createPet = async (petData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(petData),
  });
  if (!response.ok) throw new Error('Failed to create pet');
  return await response.json();
};

export const getPetById = async (petId) => {
  const response = await fetch(`${BASE_URL}/${petId}`);
  if (!response.ok) throw new Error('Failed to fetch pet');
  return await response.json();
};

export const updatePet = async (petId, petData) => {
  const response = await fetch(`${BASE_URL}/${petId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(petData),
  });
  if (!response.ok) throw new Error('Failed to update pet');
  return await response.json();
};
