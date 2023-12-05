// Function to register a new user
async function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  try {
    // Define the URL of the API endpoint
    const url = "https://localhost:8080/auth/register";

    // Define the data to send in the request body
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    // Define the options for the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // Make the fetch request
    const response = await fetch(url, options);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response body as JSON
    const json = await response.json();

    // Log the success message
    console.log(json.message);
    alert("Successfully Registered User");
    // Redirect to the login page
    window.location.href = "login.html";
  } catch (error) {
    // Log any errors
    console.error("Failed to register user:", error);

    // Clear the input fields
    name.value = "";
    email.value = "";
    password.value = "";

    // Display an error message
    alert("Failed to register user: " + error.message);
  }
}

// Add an event listener to the form
document
  .getElementById("registerForm")
  .addEventListener("submit", registerUser);
