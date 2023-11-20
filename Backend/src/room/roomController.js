const { getFirestore } = require('firebase-admin/firestore');
require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('rooms');

exports.insertRoom = async (req, res) => {
    try {
        const { roomId, roomTypeId, hotelName, roomNumber } = req.body;
  
        if (roomId == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert room. Room\'s id cannot be empty', error: error.message });
            return
        }
        if (roomTypeId == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert room. Room type\'s id cannot be empty', error: error.message });
            return
        }
        if (hotelName == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert room. Hotel\'s id cannot be empty', error: error.message });
            return
        }
        if (roomNumber == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert room. Room\'s number cannot be empty', error: error.message });
            return
        }
  
        // Add to firestore
        const roomData = {
            roomId: roomId,
            roomTypeId: roomTypeId,
            hotelName: hotelName,
            roomNumber: roomNumber,
            status: 'Available',
        }
    
        await ref.add(roomData);
        res.status(200).json({ message: 'Room inserted successfully', error: null, data: roomData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert room', error: error.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const { roomId, roomTypeId, hotelName, roomNumber, status } = req.body;
        const currentRoomId = req.params['roomId']
        const snapshot = await ref.where('roomId', '==', currentRoomId).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Room not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
    
        if (roomId != "") {
            oldData.roomId = roomId
        }
        if (roomTypeId != "") {
            oldData.roomTypeId = roomTypeId
        }
        if (hotelName != "") {
            oldData.hotelName = hotelName
        }
        if (roomNumber != "") {
            oldData.roomNumber = roomNumber
        }
        if (status != "") {
            oldData.status = status
        }
        const newDataRoom = {
            roomId: oldData.roomId,
            roomTypeId: oldData.roomTypeId,
            hotelName: oldData.hotelName,
            roomNumber: oldData.roomNumber,
            status: oldData.status
        }
    
        await ref.doc(id).update(newDataRoom);
        res.status(200).json({ message: 'Room updated successfully', error: null, data: newDataRoom });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update room', error: error.message });
    }
}

exports.updateRoomStatusToBooked = async (req, res) => {
    try {
        const roomId = req.params['roomId']
        const snapshot = await ref.where('roomId', '==', roomId).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Room not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
        const newDataRoom = {
            roomId: oldData.roomId,
            roomTypeId: oldData.roomTypeId,
            hotelName: oldData.hotelName,
            roomNumber: oldData.roomNumber,
            status: 'Booked'
        }
        
        await ref.doc(id).update(newDataRoom);
        res.status(200).json({ message: 'Room status updated successfully to booked', error: null, data: newDataRoom });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update room status', error: error.message });
    }
}

exports.updateRoomStatusToAvailable = async (req, res) => {
    try {
        const roomId = req.params['roomId']
        const snapshot = await ref.where('roomId', '==', roomId).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Room not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
        const newDataRoom = {
            roomId: oldData.roomId,
            roomTypeId: oldData.roomTypeId,
            hotelName: oldData.hotelName,
            roomNumber: oldData.roomNumber,
            status: 'Available'
        }
        
        await ref.doc(id).update(newDataRoom);
        res.status(200).json({ message: 'Room status updated successfully to avaiable', error: null, data: newDataRoom });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update room status', error: error.message });
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        const roomId = req.params['roomId']
        const snapshot = await ref.where('roomId', '==', roomId).get()
        if (snapshot.empty) {
            res.status(200).json({ message: 'Room not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
  
        await ref.doc(id).delete();
        res.status(200).json({ message: 'Room deleted successfully', error: null, data: null });
    } catch (error) {
        res.status(401).json({ message: 'Failed to delete room', error: error.message });
    }
};

exports.getRoomByRoomId = async (req, res) => {
    try {
        const roomId = req.params['roomId']
        const snapshot = await ref.where('roomId', '==', roomId).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'No room found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            data = doc.data()
        });

        res.status(200).json({ message: 'Room retrieved successfully!', error: null, data: data })
    } catch (error) {
        res.status(401).json({ message: 'Failed to get room', error: error.message });
    }
}

exports.getRoomsByHotelName = async (req, res) => {
    try {
        const hotelName = req.params['hotelName']
        const snapshot = await ref.where('hotelName', '==', hotelName).get();
        const dataArr = [];
        if (snapshot.empty) {
            res.status(200).json({ message: 'No room found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            data = doc.data()
            dataArr.push({ id, data })
        });

        res.status(200).json({ message: 'Room(s) retrieved successfully!', error: null, data: dataArr })
    } catch (error) {
        res.status(401).json({ message: 'Failed to get room(s)', error: error.message });
    }
}