import { fetchUserData } from "./api.js";
const userData = await fetchUserData();

function setProfilePic() {
  document.getElementById("curr_pfp").src = userData.profilePic;
}
function setNameValue() {
  document.getElementById("form-name").value = userData.name;
}
function setEmailValue() {
  document.getElementById("form-email").value = userData.email;
}
setProfilePic();
setNameValue();
setEmailValue();

async function fetchUserDataAndUpdateProfile() {
  const userData = await fetchUserData();

  const updateButton = document.getElementById("update-button");
  updateButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    let profilePicPath = userData.profilePic;
    const fileInput = document.getElementById("upload-pfp");
    if (fileInput.value != "") {
      // Check if the file input field is not empty
      const formData = new FormData();
      formData.append("pfp_input", fileInput.files[0]);

      const uploadResp = await fetch("https://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResp.ok) {
        throw new Error("Network response was not ok");
      }

      const uploadData = await uploadResp.json();
      console.log("Image uploaded successfully at path:", uploadData.path);
      profilePicPath = uploadData.path;
    }

    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value;

    const response = await fetch("https://localhost:8080/user/updateUserData", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: userData.accessToken,
        profilePic: profilePicPath,
        name: name,
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("User data updated successfully");
    alert("User data updated successfully!"); // Display a notification
    window.location.reload(); // Refresh the page
  });
}

fetchUserDataAndUpdateProfile();
