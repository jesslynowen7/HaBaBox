import { sendPasswordResetEmail } from "./forgot_password.js";
document
  .getElementById("forgotPasswordLogin")
  .addEventListener("click", sendPasswordResetEmail);
