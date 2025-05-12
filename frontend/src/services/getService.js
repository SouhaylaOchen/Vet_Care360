const BASE_URL = "http://localhost:5000/api/get";

// مثال: جلب كل أنواع الحيوانات
export const getPetTypes = async () => {
  const response = await fetch(`${BASE_URL}/pet-types`);
  if (!response.ok) throw new Error("Failed to fetch pet types");
  return await response.json();
};

// مثال: جلب الإحصائيات
export const getStatistics = async () => {
  const response = await fetch(`${BASE_URL}/statistics`);
  if (!response.ok) throw new Error("Failed to fetch statistics");
  return await response.json();
};