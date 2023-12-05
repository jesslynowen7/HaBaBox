// Function to send a password reset email
async function sendPasswordResetEmail() {
  // Get the email address entered by the user
    const email = document.getElementById("email").value;

  // Define the URL of the API endpoint
  const url = "https://localhost:8080/auth/forgotPassword";

  // Define the data to send in the request body
  const data = {
    email: email,
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

  // Show an alert to the user
  alert(json.message);
}

export { sendPasswordResetEmail };
