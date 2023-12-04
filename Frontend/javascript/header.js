async function getUserProfilePic() {
  try {
    // Use the Fetch API to make a GET request
    const cookieData = await fetch("https://localhost:8080/api/data", {
      method: "GET",
      credentials: "include", // Include cookies in the request (assuming same origin)
    });
    // Parse the JSON response
    const userData = await cookieData.json();
    console.log(userData);
    const profilePic = userData.data.profilePic;
    console.log(profilePic);

    if (cookieData.ok) {
      // Successful request, cache the result in sessionStorage
      sessionStorage.setItem(
        "userProfilePicResult",
        JSON.stringify(profilePic)
      );

      // Set the profilePic as the source
      document.getElementById("profile-picture").src = profilePic;
    } else {
      // Failed request, handle the error
      console.error(userData);
      alert("Error fetching user data. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle the error accordingly
  }
}

// Call the function if the profilePic path is not found in the cookie
getUserProfilePic();
