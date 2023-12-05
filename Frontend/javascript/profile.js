import { fetchUserData } from "./api.js";
const userData = await fetchUserData();
console.log("Profile User data " + userData);
// Add event listener for logout confirmation
let popup = document.getElementById("popup");
let logoutButton = document.getElementById("logout_button");
let cancelButton = document.getElementById("cancel_button");
let confirmButton = document.getElementById("confirm_button");
logoutButton.addEventListener("click", function () {
  popup.classList.add("open-popup");
});

cancelButton.addEventListener("click", function () {
  popup.classList.remove("open-popup");
});
confirmButton.addEventListener("click", async function (event) {
  event.preventDefault(); // Prevent the default action

  try {
    const response = await fetch("https://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Logout successful");
    popup.classList.remove("open-popup");

    // Redirect to the default page
    window.location.href = "https://localhost:3000"; // replace with your actual default page URL
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
});

function setImgSrc() {
  document.getElementById("current-pfp").src = userData.profilePic;
}

function setHabapoints() {
  document.getElementById("habapoints").textContent =
    userData.points + " Habapoints";
}

function setName() {
  document.getElementById("nama_user").textContent = userData.name;
}

setImgSrc();
setHabapoints();
setName();

// Function to load content based on selected menu
function loadContent(selectedMenu) {
  console.log("loadContent called with:", selectedMenu);
  var contentDiv = document.getElementById("isi_menu");

  // Fetch the HTML file for the selected menu
  fetch(selectedMenu + ".html")
    .then((response) => {
      console.log("Fetch response:", response);
      return response.text();
    })
    .then((html) => {
      // Insert the HTML content into the "isi_menu" div
      contentDiv.innerHTML = html;

      // Dynamically load the JavaScript module for the selected menu
      var script = document.createElement("script");
      script.type = "module";
      // Add a cache-busting query parameter to the src attribute
      script.src = "javascript/" + selectedMenu + ".js?" + new Date().getTime();

      // Remove the script tag after it's loaded to avoid memory leaks
      script.onload = function () {
        this.remove();
      };

      // Append the script tag to the body
      document.body.appendChild(script);
    })
    .catch((error) => {
      console.error("Error fetching file:", error);
    });
}

// Your existing event listeners
document.getElementById("form_menu").addEventListener("change", function (e) {
  console.log("form_menu change event:", e.target.value);
  loadContent(e.target.value);
});

// Call the function with the default checked option immediately
var defaultMenu = document.querySelector(
  'input[name="pilihan_menu"]:checked'
).value;
console.log("Calling loadContent with defaultMenu:", defaultMenu);
loadContent(defaultMenu);
