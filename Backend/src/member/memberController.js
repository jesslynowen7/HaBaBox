const { getFirestore } = require('firebase-admin/firestore');
require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('users');

exports.updateProfilePicture = async (req, res) => {
    try {
        const profilePic = req.body;
        const memberId = req.params['memberId']
        const snapshot = await ref.where('memberId', '==', memberId).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Member not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
        const newDataMember = {
            email: oldData.email,
            name: oldData.name,
            point: oldData.point,
            profile_pic: profilePic,
        }
        
        await ref.doc(id).update(newDataMember);
        res.status(200).json({ message: 'Profile picture updated successfully', error: null, data: newDataMember });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile picture', error: error.message });
    }
}

exports.updateMemberPoints = async (req, res) => {
    try {
        const points = req.body;
        const memberId = req.params['memberId']
        const snapshot = await ref.where('memberId', '==', memberId).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Member not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
        const newDataMember = {
            email: oldData.email,
            name: oldData.name,
            point: points,
            profile_pic: oldData.profile_pic,
        }
        
        await ref.doc(id).update(newDataMember);
        res.status(200).json({ message: 'Member points updated successfully', error: null, data: newDataMember });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update member points', error: error.message });
    }
}