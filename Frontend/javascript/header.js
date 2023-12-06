import { fetchUserData } from "./api.js";
async function getUserProfilePic() {
  try {
    // Use the Fetch API to make a GET request
    const userData = await fetchUserData();

    if (userData != null) {
      // Successful request, cache the result in sessionStorage
      sessionStorage.setItem(
        "userProfilePicResult",
        JSON.stringify(userData.profilePic)
      );

      // Set the profilePic as the source
      document.getElementById("profile-picture").src = userData.profilePic;
    } else {
      // Failed request, handle the error
      console.error(userData);
      alert("Error fetching user data. Please try again.");
    }
  } catch (error) {
    // Handle the error accordingly
    console.error("Error fetching user data:", error);
    window.location.href("login.html");
  }
}

// Call the function if the profilePic path is not found in the cookie
getUserProfilePic();
