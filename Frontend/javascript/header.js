// header.js

// Import modular Firebase SDK
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Function to retrieve the current user and update the header with the profile picture
async function updateHeaderWithProfilePicture() {
  const auth = getAuth();

  const getCurrentUser = () => new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });

  const user = await getCurrentUser();

  if (user) {
    const profilePictureUrl = user.photoURL; // Assuming Firebase stores the profile picture URL

    // Update the HTML element with the profile picture
    const profilePictureElement = document.getElementById('profile-picture'); // Update with your actual element ID
    if (profilePictureElement) {
      profilePictureElement.src = profilePictureUrl;
    }
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderWithProfilePicture();
});
