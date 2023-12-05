import { fetchUserData } from "./api.js";

async function fetchData() {
  try {
    const userData = await fetchUserData();
    const response = await fetch(
      `https://localhost:8080/user/getCurrentUserData?token=${userData.accessToken}`,
      {
        method: "GET",
        credentials: "include", // Include cookies in the request
      }
    );

    if (!response.ok) {
      console.error(
        `Response status: ${response.status}, status text: ${response.statusText}`
      );
      throw new Error("Network response was not ok");
    }

    let data = await response.json(); // for JSON data
    console.log("Points:" + data.point);
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function setPoints(data) {
  document.getElementById("active-point-amount").textContent =
    data.point + " Points";
}

function setHistoryPoints(data) {
  document.getElementById("history-point").textContent = data.point + " Points";
}

fetchData().then((data) => {
  setPoints(data);
  setHistoryPoints(data);
});
