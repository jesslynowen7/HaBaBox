const { getFirestore } = require('firebase-admin/firestore');
require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('users');

exports.updateProfilePicture = async (req, res) => {
    try {
        const profilePic = req.body.profilePic;
        const email = req.params['email']
        const snapshot = await ref.where('email', '==', email).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Member not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
        
        if (profilePic != "") {
            oldData.profilePic = profilePic
        } 
        const newDataMember = {
            email: oldData.email,
            name: oldData.name,
            point: oldData.point,
            profilePic: oldData.profilePic,
        }
        
        await ref.doc(id).update(newDataMember);
        res.status(200).json({ message: 'Profile picture updated successfully', error: null, data: newDataMember });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile picture', error: error.message });
    }
}

exports.updateMemberPoints = async (req, res) => {
    try {
        const point = req.body.point;
        const email = req.params['email']
        const snapshot = await ref.where('email', '==', email).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Member not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });

        if (point != "") {
            oldData.point = point
        } 
        const newDataMember = {
            email: oldData.email,
            name: oldData.name,
            point: oldData.point,
            profilePic: oldData.profilePic,
        }
        
        await ref.doc(id).update(newDataMember);
        res.status(200).json({ message: 'Member points updated successfully', error: null, data: newDataMember });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update member points', error: error.message });
    }
}