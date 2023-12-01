const express = require("express");
const router = express.Router();
const {
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByEmail,
  getTransactionByTransactionId,
} = require("./transactionController.js");

//Admin
router.put("/:transactionId", updateTransaction);

//User
router.post("/", insertTransaction);
router.delete("/:transactionId", deleteTransaction);
router.get("/:transactionId", getTransactionByTransactionId);
router.get("/user/:email", getTransactionsByEmail);

module.exports = router;
