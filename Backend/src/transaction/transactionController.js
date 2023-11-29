const { getFirestore } = require('firebase-admin/firestore');
require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('transactions');

exports.insertTransaction = async (req, res) => {
    try {
        const { email, roomId, promoCode, transactionDate, checkinDate,
            checkoutDate, duration, totalPrice } = req.body;

        if (email == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert transaction. Email cannot be empty', error: error.message });
            return
        }
        if (roomId == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert transaction. Room\'s id cannot be empty', error: error.message });
            return
        }
        if (promoCode == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert transaction. Promo code cannot be empty', error: error.message });
            return
        }
        if (transactionDate == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert transaction. Transaction date cannot be empty', error: error.message });
            return
        }
        if (checkinDate == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert transaction. Check-in date cannot be empty', error: error.message });
            return
        }
        if (checkoutDate == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert transaction. Check-out date cannot be empty', error: error.message });
            return
        }
        if (duration == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert transaction. Duration cannot be empty', error: error.message });
            return
        }
        if (totalPrice == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert transaction. Total price cannot be empty', error: error.message });
            return
        }
  
        // Add to firestore
        const transactionData = {
            email: email,
            roomId: roomId,
            promoCode: promoCode,
            transactionDate: transactionDate,
            checkinDate: checkinDate,
            checkoutDate: checkoutDate,
            duration: duration,
            totalPrice: totalPrice,
            status: 'Unpaid',
        }
    
        await ref.add(transactionData);
        res.status(200).json({ message: 'Transaction inserted successfully', error: null, data: transactionData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert transaction', error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { email, roomId, promoCode, transactionDate, checkinDate,
            checkoutDate, duration, totalPrice, status } = req.body;
        const currentTransationId = req.params['transactionId']
        const snapshot = await ref.get(currentTransationId);
        if (snapshot.empty) {
            res.status(200).json({ message: 'Transaction not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
    
        if (email != "") {
            oldData.email = email
        }
        if (roomId != "") {
            oldData.roomId = roomId
        }
        if (promoCode != "") {
            oldData.promoCode = promoCode
        }
        if (transactionDate != "") {
            oldData.transactionDate = transactionDate
        }
        if (checkinDate != "") {
            oldData.checkinDate = checkinDate
        }
        if (checkoutDate != "") {
            oldData.checkoutDate = checkoutDate
        }
        if (duration != "") {
            oldData.duration = duration
        }
        if (totalPrice != "") {
            oldData.totalPrice = totalPrice
        }
        if (status != "") {
            oldData.status = status
        }
        const newDataTransaction = {
            email: oldData.email,
            roomId: oldData.roomId,            
            promoCode: oldData.promoCode,
            transactionDate: oldData.transactionDate,
            checkinDate: oldData.checkinDate,
            checkoutDate: oldData.checkoutDate,
            duration: oldData.duration,
            totalPrice: oldData.totalPrice,
            status: oldData.status,
        }
    
        await ref.doc(id).update(newDataTransaction);
        res.status(200).json({ message: 'Transaction updated successfully', error: null, data: newDataTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update transaction', error: error.message });
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params['transactionId']
        const snapshot = await ref.get(transactionId)
        if (snapshot.empty) {
            res.status(200).json({ message: 'Transaction not found', error: null, data: null});
            return;
        }
  
        await ref.doc(transactionId).delete();
        res.status(200).json({ message: 'Transaction deleted successfully', error: null, data: null });
    } catch (error) {
        res.status(401).json({ message: 'Failed to delete transaction', error: error.message });
    }
};

exports.getTransactionByTransactionId = async (req, res) => {
    try {
        const transactionId = req.params['transactionId']
        const snapshot = await ref.get(transactionId);
        if (snapshot.empty) {
            res.status(200).json({ message: 'No transaction found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            data = doc.data()
        });

        res.status(200).json({ message: 'Transaction retrieved successfully!', error: null, data: data })
    } catch (error) {
        res.status(401).json({ message: 'Failed to get transaction', error: error.message });
    }
}

exports.getTransactionsByEmail = async (req, res) => {
    try {
        const email = req.params['email']
        const snapshot = await ref.where('email', '==', email).get();
        const dataArr = [];
        if (snapshot.empty) {
            res.status(200).json({ message: 'No transaction found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            data = doc.data()
            dataArr.push({ id, data })
        });

        res.status(200).json({ message: 'Transaction(s) retrieved successfully!', error: null, data: dataArr })
    } catch (error) {
        res.status(401).json({ message: 'Failed to get transaction', error: error.message });
    }
}
