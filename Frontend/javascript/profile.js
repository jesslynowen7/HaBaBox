import { getCookie } from "./cookie.js";
// Add event listener for logout confirmation
let popup = document.getElementById("popup");
function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");
}
// Add event listener to radio buttons
document
  .getElementById("form_menu")
  .addEventListener("change", function (event) {
    if (event.target.type === "radio" && event.target.checked) {
      // Handle the selected radio button
      const selectedValue = event.target.value;
      updateIsiMenu(selectedValue);
    }
  });

// Function to update isi_menu based on the selected radio button
function updateIsiMenu(selectedValue) {
  const isiMenuDiv = document.getElementById("isi_menu");

  fetch(`${selectedValue}.html`, {
    mode: "no-cors",
  })
    .then((response) => response.text())
    .then((html) => {
      isiMenuDiv.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading HTML template:", error);
      isiMenuDiv.innerHTML = "Error loading content";
    });
}

// Initial call to update isi_menu with the default checked value
const defaultCheckedValue = document.querySelector(
  'input[name="pilihan_menu"]:checked'
).value;
updateIsiMenu(defaultCheckedValue);

// Event listener for the logout button
document.getElementById("logout_button").addEventListener("click", function () {
  // Display a confirmation dialog
  const confirmed = confirm("Are you sure you want to logout?");

  // If the user confirms, perform the logout action
  if (confirmed) {
    // Add your logout logic here
    console.log("User confirmed logout. Implement your logout logic.");
  }
});

function setImgSrc() {
  const imgPath = getCookie("profilePic");
  console.log(imgPath);
  document.getElementById("current-pfp").src = imgPath;
}

setImgSrc();
