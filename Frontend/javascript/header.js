import { getCookie } from "./cookie.js";

// Get the profilePic path from the cookie
const profilePicPath = getCookie("profilePic");

// If the profilePic path is found in the cookie, set it as the source
if (profilePicPath) {
  document.getElementById("profile-picture").src = profilePicPath;
} else {
  // If not found, make the fetch request
  async function getUserProfilePic() {
    try {
      const response = await fetch(
        "http://localhost:8080/user/getCurrentUserData?token=" +
          encodeURIComponent(token),
        {
          method: "GET",
          credentials: "include", // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Successful request, cache the result in sessionStorage
        sessionStorage.setItem("userProfilePicResult", JSON.stringify(result));

        // Accessing the profilePic value directly from the result object
        const profilePicValue = result.profilePic;

        // Set the profilePic path in the cookie for future use
        document.cookie = `profilePic=${profilePicValue};path=/`;

        // Set the profilePic as the source
        document.getElementById("profile-picture").src = profilePicValue;
      } else {
        // Failed request, handle the error
        console.error(result);
        alert(result.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error accordingly
    }
  }

  // Call the function if the profilePic path is not found in the cookie
  getUserProfilePic();
}
