const { getFirestore } = require("firebase-admin/firestore");
require("../utils/firebase-config.js");
require("firebase/database");

const db = getFirestore();
const ref = db.collection("hotels");

exports.insertHotel = async (req, res) => {
  try {
    const { name, address, city, phone } = req.body;

    // Add to firestore
    const hotelData = {
      name: name,
      address: address,
      city: city,
      phone: phone,
    };

    await ref.add(hotelData);
    res.status(200).json({
      message: "Hotel inserted successfully",
      error: null,
      data: hotelData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to insert hotel", error: error.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const { name, address, city, phone } = req.body;
    const hotelName = req.params["hotelName"];
    const snapshot = await ref.where("name", "==", hotelName).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "No hotel found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      oldData = doc.data();
    });

    if (name != "") {
      oldData.name = name;
    }
    if (address != "") {
      oldData.address = address;
    }
    if (city != "") {
      oldData.city = city;
    }
    if (phone != "") {
      oldData.phone = phone;
    }
    const newDataHotel = {
      name: oldData.name,
      address: oldData.address,
      city: oldData.city,
      phone: oldData.phone,
    };

    await ref.doc(id).update(newDataHotel);
    res.status(200).json({
      message: "Hotel updated successfully",
      error: null,
      data: newDataHotel,
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to update hotel", error: error.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotelName = req.params["hotelName"];
    const snapshot = await ref.where("name", "==", hotelName).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "No hotel found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      oldData = doc.data();
    });

    await ref.doc(id).delete();
    res
      .status(200)
      .json({ message: "Hotel deleted successfully", error: null, data: null });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to delete hotel", error: error.message });
  }
};
