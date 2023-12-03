// header.js
// Function to get the value of a specific cookie by name
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var token = getCookie("access_token");

async function setUserProfilePic() {
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
      // Successful login, handle the result as needed
      console.log(result);

      // Accessing the profilePic value directly from the result object
      const profilePicValue = result.profilePic;
      document.getElementById("profile-picture").src = profilePicValue;
    } else {
      // Failed login, handle the error
      console.error(result);
      alert(result.message);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle the error accordingly
  }
}

setUserProfilePic();
