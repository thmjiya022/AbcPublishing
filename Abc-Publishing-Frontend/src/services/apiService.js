const BASE_URL = "https://localhost:7065";

export const GetSection = async (sectionName) => {
  const response = await fetch(`${BASE_URL}/section/${sectionName}`);
  const data = await response.json();
  return data;
};
