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
async function updateIsiMenu(selectedValue) {
  const isiMenuDiv = document.getElementById("isi_menu");

  try {
    // Fetch the HTML content
    const response = await fetch(`${selectedValue}.html`, {
      mode: "no-cors",
    });

    // Retrieve the text content of the HTML
    const html = await response.text();

    // Inject the HTML into the isi_menu div
    isiMenuDiv.innerHTML = html;

    // Dynamically import and execute module scripts
    const scriptElements = isiMenuDiv.getElementsByTagName("script");

    for (const scriptElement of scriptElements) {
      if (scriptElement.src) {
        // For external scripts
        const script = document.createElement("script");
        script.src = scriptElement.src;
        script.type = "module";
        document.body.appendChild(script);
      } else {
        // For inline scripts
        eval(scriptElement.innerText);
      }
    }
  } catch (error) {
    console.error("Error loading HTML template:", error);
    isiMenuDiv.innerHTML = "Error loading content";
  }
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

function setHabapoints() {
  const points = getCookie("points");
  document.getElementById("habapoints").textContent = points + " Habapoints";
}

function setName() {
  const name = getCookie("name");
  document.getElementById("nama_user").textContent = name;
}

setImgSrc();
setHabapoints();
setName();