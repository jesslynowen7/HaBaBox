const { getFirestore } = require('firebase-admin/firestore');
require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('e_tickets');

exports.insertETicket = async (req, res) => {
  try {
    const { eTicketId, memberId, date, roomId, price } = req.body;

    // Add to firestore
    const eTicketData = {
        eTicketId: eTicketId,
        memberId: memberId,
        date: date,
        roomId: roomId,
        price: price
    }

    await ref.add(eTicketData);
    res.status(200).json({ message: 'E-ticket inserted successfully', error: null, data: eTicketData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to insert e-ticket', error: error.message });
  }
};

exports.getETicket = async (req, res) => {
    try {
        const eTicketId = req.params['eTicketId']
        const snapshot = await ref.where('eTicketId', '==', eTicketId).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'No e-ticket found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            data = doc.data()
        });

        res.status(200).json({ message: 'E-ticket retrieved successfully!', error: null, data: data });
    } catch (error) {
        res.status(401).json({ message: 'Failed to get e-ticket', error: error.message });
    }
}