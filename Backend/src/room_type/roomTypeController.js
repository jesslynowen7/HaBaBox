const { getFirestore } = require('firebase-admin/firestore');
require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('room_types');

exports.insertRoomType = async (req, res) => {
    try {
        const { id, type, description, price } = req.body;
  
        if (id == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert room. Room type\'s id cannot be empty', error: error.message });
            return
        }
        if (type == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert room. Room type cannot be empty', error: error.message });
            return
        }
        if (description == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert room. Description cannot be empty', error: error.message });
            return
        }
        if (price == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert room. Price cannot be empty', error: error.message });
            return
        }
  
        // Add to firestore
        const roomTypeData = {
            id: id,
            type: type,
            description: description,
            price: price,
        }
    
        await ref.add(roomTypeData);
        res.status(200).json({ message: 'Room type inserted successfully', error: null, data: roomTypeData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert room types', error: error.message });
    }
}

exports.updateRoomType = async (req, res) => {
    try {
        const { id, type, description, price } = req.body;
        const roomTypeId = req.params['roomTypeId']
        const snapshot = await ref.where('id', '==', roomTypeId).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Room type not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
    
        if (id != "") {
            oldData.id = id
        }
        if (type != "") {
            oldData.type = type
        }
        if (description != "") {
            oldData.description = description
        }
        if (price != "") {
            oldData.price = price
        }
        const newDataRoomType = {
            id: oldData.id,
            type: oldData.type,
            description: oldData.description,
            price: oldData.price,
        }
    
        await ref.doc(id).update(newDataRoomType);
        res.status(200).json({ message: 'Room type updated successfully', error: null, data: newDataRoomType });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update room type', error: error.message });
    }
}

exports.deleteRoomType = async (req, res) => {
    try {
        const id = req.params['id']
        const snapshot = await ref.where('id', '==', id).get()
        if (snapshot.empty) {
            res.status(200).json({ message: 'Room type not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
  
        await ref.doc(id).delete();
        res.status(200).json({ message: 'Room type deleted successfully', error: null, data: null });
    } catch (error) {
        res.status(401).json({ message: 'Failed to delete room type', error: error.message });
    }
};