const cookieData = await fetch("https://localhost:8080/api/data", {
  method: "GET",
  credentials: "include", // Include cookies in the request (assuming same origin)
});
// Parse the JSON response
const userData = await cookieData.json();
console.log(userData);
const profilePic = userData.data.profilePic;
console.log(profilePic);
const email = userData.data.email;
console.log(email);
const username = userData.data.name;
console.log(username);

function setProfilePic() {
  document.getElementById("curr_pfp").src = profilePic;
}
function setNameValue() {
  document.getElementById("form-name").value = username;
}
function setEmailValue() {
  document.getElementById("form-email").value = email;
} 
setProfilePic();
setNameValue();
setEmailValue();