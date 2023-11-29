const express = require('express');
const router = express.Router();
const { insertTransaction, updateTransaction, deleteTransaction, getTransactionsByMemberId,
    getTransactionByTransactionId } = require('./transactionController.js');

//Admin
router.put('/:transactionId', updateTransaction);

//User
router.post('/', insertTransaction);
router.delete('/:transactionId', deleteTransaction);
router.get('/:transactionId', getTransactionByTransactionId)
router.get('/member/:memberId', getTransactionsByMemberId)

module.exports = router;