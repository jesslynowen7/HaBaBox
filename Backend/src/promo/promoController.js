const { getFirestore } = require('firebase-admin/firestore');
require('../utils/firebase-config.js');
require('firebase/database');

const db = getFirestore();
const ref = db.collection('promos');

exports.insertPromo = async (req, res) => {
    try {
        const { promoCode, title, description, percentage, max, created, end } = req.body;
  
        if (promoCode == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert promo. Promo code cannot be empty', error: error.message });
            return
        }
        if (title == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert promo. Title cannot be empty', error: error.message });
            return
        }
        if (description == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert promo. Description cannot be empty', error: error.message });
            return
        }
        if (percentage == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert promo. Percentage cannot be empty', error: error.message });
            return
        }
        if (max == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert promo. Promo\'s max cannot be empty', error: error.message });
            return
        }
        if (created == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert promo. Promo\'s created cannot be empty', error: error.message });
            return
        }
        if (end == "") {
            res.status(http.StatusNoContent).json({ message: 'Failed to insert promo. Promo\'s end cannot be empty', error: error.message });
            return
        }
  
        // Add to firestore
        const promoData = {
            promoCode: promoCode,
            title: title,
            description: description,
            percentage: percentage,
            max: max,
            created: created,
            end: end,
        }
    
        await ref.add(promoData);
        res.status(200).json({ message: 'Promo inserted successfully', error: null, data: promoData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to insert promo', error: error.message });
    }
}

exports.getAllPromos = async (req, res) => {
    try {
        const snapshot = await ref.get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'No promos found', error: null, data: null });
            return;
        }

        const promos = [];
        snapshot.forEach(doc => {
            promos.push(doc.data());
        });

        res.status(200).json({ message: 'All promos retrieved successfully!', error: null, data: promos });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get promos', error: error.message });
    }
};


exports.getPromoByPromoCode = async (req, res) => {
    try {
        const promoCode = req.params['promoCode']
        const snapshot = await ref.where('promoCode', '==', promoCode).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'No promo found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            data = doc.data()
        });

        res.status(200).json({ message: 'Promo retrieved successfully!', error: null, data: data });
    } catch (error) {
        res.status(401).json({ message: 'Failed to get promo', error: error.message });
    }
}


exports.updatePromo = async (req, res) => {
    try {
        const { promoCode, title, description, percentage, max, created, end } = req.body;
        const currentPromoCode = req.params['promoCode']
        const snapshot = await ref.where('promoCode', '==', currentPromoCode).get();
        if (snapshot.empty) {
            res.status(200).json({ message: 'Promo not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
    
        if (promoCode != "") {
            oldData.promoCode = promoCode
        }
        if (title != "") {
            oldData.title = title
        }
        if (description != "") {
            oldData.description = description
        }
        if (percentage != "") {
            oldData.percentage = percentage
        }
        if (max != "") {
            oldData.max = max
        }
        if (created != "") {
            oldData.created = created
        }
        if (end != "") {
            oldData.end = end
        }
        const newDataPromo = {
            promoCode: oldData.promoCode,
            title: oldData.title,
            description: oldData.description,
            percentage: oldData.percentage,
            max: oldData.max,
            created: oldData.created,
            end: oldData.end,
        }
    
        await ref.doc(id).update(newDataPromo);
        res.status(200).json({ message: 'Promo updated successfully', error: null, data: newDataPromo });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update promo', error: error.message });
    }
}

exports.deletePromo = async (req, res) => {
    try {
        const promoCode = req.params['promoCode']
        const snapshot = await ref.where('promoCode', '==', promoCode).get()
        if (snapshot.empty) {
            res.status(200).json({ message: 'Promo not found', error: null, data: null});
            return;
        }
        snapshot.forEach(doc => {
            id = doc.id
            oldData = doc.data()
        });
  
        await ref.doc(id).delete();
        res.status(200).json({ message: 'Promo deleted successfully', error: null, data: null });
    } catch (error) {
        res.status(401).json({ message: 'Failed to delete promo', error: error.message });
    }
};