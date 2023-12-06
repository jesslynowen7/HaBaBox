async function login(event) {
  // Prevent the form from being submitted normally
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  sessionStorage.setItem("email", email);

  const response = await fetch("https://localhost:8080/auth/login", {
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

    if (email == "admin@gmail.com") {
      window.location.href = "admin.html";
      return;
    }

    window.location.href = "index.html";
  } else {
    // Failed login, handle the error
    console.error(result);
    alert(result.message);
  }
}

// Add the event listener to the form
document.getElementById("loginForm").addEventListener("submit", login);
