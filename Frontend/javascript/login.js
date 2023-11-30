async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (response.ok) {
    // Successful login, handle the result as needed
    console.log(result);
  } else {
    // Failed login, handle the error
    console.error(result);
    alert(result.message);
  }
}
