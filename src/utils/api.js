const BASE_URL = "https://bizedge-grievances-api.onrender.com";
let cachedToken = null;

const getAccessToken = async () => {
  if (cachedToken) return cachedToken;

  const res = await fetch(`${BASE_URL}/api/v1/auth/token/`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ username: "priya", password: "demo-password-1" }),
  });
  if (!res.ok) {
    throw new Error("Failed to authenticate");
  }

  const data = await res.json();
  cachedToken = data.access;
  return cachedToken;
};

export { BASE_URL, getAccessToken };

export const getEmployees = async (search = "") => {
  const token = await getAccessToken();
  const res = await fetch(
    `${BASE_URL}/api/v1/app/employees?search=${encodeURIComponent(search)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Error getting employee");
  }
  const json = await res.json();
  return json.data;
};

export const getCurrentUser = async () => {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/api/v1/auth/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }
  return res.json();
};
