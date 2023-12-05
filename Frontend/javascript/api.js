// api.js
let cachedUserData;

async function fetchUserData() {
  if (!cachedUserData) {
    const cookieData = await fetch("https://localhost:8080/api/data", {
      method: "GET",
      credentials: "include",
    });
    const userData = await cookieData.json();
      cachedUserData = userData.data;
      console.log(cachedUserData);
  }
  return cachedUserData;
}

export { fetchUserData };
