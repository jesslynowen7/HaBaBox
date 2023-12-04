// Function to set a cookie with expiration time of 1 hour
function setCookie(name, value) {
  const expires = new Date();
  expires.setTime(expires.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds

  // Add Secure, HttpOnly, and SameSite attributes
  const cookieOptions = `expires=${expires.toUTCString()};path=/;Secure;HttpOnly;SameSite=None`;

  document.cookie = `${name}=${value};${cookieOptions}`;
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    credentials: "include", // Include cookies in the request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (response.ok) {
    // Successful login, handle the result as needed
    console.log(result);

    // Set cookies for access_token, email, points, name, and profilePic
    setCookie("access_token", result.accessToken);
    setCookie("email", result.dataUser.email);
    setCookie("points", result.dataUser.point.toString()); // Convert to string if not already
    setCookie("name", result.dataUser.name);
    setCookie("profilePic", result.dataUser.profilePic);

    window.location.href = "index.html";
  } else {
    // Failed login, handle the error
    console.error(result);
    alert(result.message);
  }
}
