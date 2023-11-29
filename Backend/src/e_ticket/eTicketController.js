const { getFirestore } = require('firebase-admin/firestore');
require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('e_tickets');

exports.insertETicket = async (req, res) => {
  try {
    // insert

    await ref.add(eTicketData);
    res.status(200).json({ message: 'E-ticket inserted successfully', error: null, data: eTicketData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to insert e-ticket', error: error.message });
  }
};