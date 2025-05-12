const BASE_URL = "http://localhost:5000/api/visits";

// إنشاء زيارة جديدة
export const createVisit = async (visitData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(visitData)
  });

  if (!response.ok) {
    throw new Error("Failed to create visit");
  }

  return await response.json();
};

// جلب جميع الزيارات الخاصة بحيوان معيّن
export const getVisitsByPet = async (petId) => {
  const response = await fetch(`${BASE_URL}/pet/${petId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch visits");
  }

  return await response.json();
};
