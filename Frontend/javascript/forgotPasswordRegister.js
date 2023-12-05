import { sendPasswordResetEmail } from "./forgot_password.js";
document
  .getElementById("forgotPasswordRegister")
  .addEventListener("click", sendPasswordResetEmail);
