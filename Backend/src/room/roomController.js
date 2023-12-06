const { getFirestore } = require("firebase-admin/firestore");
require("../utils/firebase-config.js");
require("firebase/database");

const db = getFirestore();
const ref = db.collection("rooms");

exports.insertRoom = async (req, res) => {
  try {
    const { roomId, roomTypeId, hotelName, roomNumber } = req.body;

    if (roomId == "") {
      res.status(http.StatusNoContent).json({
        message: "Failed to insert room. Room's id cannot be empty",
        error: error.message,
      });
      return;
    }
    if (roomTypeId == "") {
      res.status(http.StatusNoContent).json({
        message: "Failed to insert room. Room type's id cannot be empty",
        error: error.message,
      });
      return;
    }
    if (hotelName == "") {
      res.status(http.StatusNoContent).json({
        message: "Failed to insert room. Hotel's id cannot be empty",
        error: error.message,
      });
      return;
    }
    if (roomNumber == "") {
      res.status(http.StatusNoContent).json({
        message: "Failed to insert room. Room's number cannot be empty",
        error: error.message,
      });
      return;
    }

    // Add to firestore
    const roomData = {
      roomId: roomId,
      roomTypeId: roomTypeId,
      hotelName: hotelName,
      roomNumber: roomNumber,
      status: "Available",
    };

    await ref.add(roomData);
    res.status(200).json({
      message: "Room inserted successfully",
      error: null,
      data: roomData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to insert room", error: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { roomId, roomTypeId, hotelName, roomNumber, status } = req.body;
    const currentRoomId = req.params["roomId"];
    const snapshot = await ref.where("roomId", "==", currentRoomId).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "Room not found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      oldData = doc.data();
    });

    if (roomId != "") {
      oldData.roomId = roomId;
    }
    if (roomTypeId != "") {
      oldData.roomTypeId = roomTypeId;
    }
    if (hotelName != "") {
      oldData.hotelName = hotelName;
    }
    if (roomNumber != "") {
      oldData.roomNumber = roomNumber;
    }
    if (status != "") {
      oldData.status = status;
    }
    const newDataRoom = {
      roomId: oldData.roomId,
      roomTypeId: oldData.roomTypeId,
      hotelName: oldData.hotelName,
      roomNumber: oldData.roomNumber,
      status: oldData.status,
    };

    await ref.doc(id).update(newDataRoom);
    res.status(200).json({
      message: "Room updated successfully",
      error: null,
      data: newDataRoom,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update room", error: error.message });
  }
};

exports.updateRoomStatusToBooked = async (req, res) => {
  try {
    const roomId = req.params["roomId"];
    const snapshot = await ref.where("roomId", "==", roomId).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "Room not found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      oldData = doc.data();
    });
    const newDataRoom = {
      roomId: oldData.roomId,
      roomTypeId: oldData.roomTypeId,
      hotelName: oldData.hotelName,
      roomNumber: oldData.roomNumber,
      status: "Booked",
    };

    await ref.doc(id).update(newDataRoom);
    res.status(200).json({
      message: "Room status updated successfully to booked",
      error: null,
      data: newDataRoom,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update room status", error: error.message });
  }
};

exports.updateRoomStatusToAvailable = async (req, res) => {
  try {
    const roomId = req.params["roomId"];
    const snapshot = await ref.where("roomId", "==", roomId).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "Room not found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      oldData = doc.data();
    });
    const newDataRoom = {
      roomId: oldData.roomId,
      roomTypeId: oldData.roomTypeId,
      hotelName: oldData.hotelName,
      roomNumber: oldData.roomNumber,
      status: "Available",
    };

    await ref.doc(id).update(newDataRoom);
    res.status(200).json({
      message: "Room status updated successfully to avaiable",
      error: null,
      data: newDataRoom,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update room status", error: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const roomId = req.params["roomId"];
    const snapshot = await ref.where("roomId", "==", roomId).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "Room not found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      oldData = doc.data();
    });

    await ref.doc(id).delete();
    res
      .status(200)
      .json({ message: "Room deleted successfully", error: null, data: null });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to delete room", error: error.message });
  }
};

exports.getRoomByRoomId = async (req, res) => {
  try {
    const roomId = req.params["roomId"];
    const snapshot = await ref.where("roomId", "==", roomId).get();
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "No room found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      data = doc.data();
    });

    res.status(200).json({
      message: "Room retrieved successfully!",
      error: null,
      data: data,
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to get room", error: error.message });
  }
};

exports.getRoomsByHotelName = async (req, res) => {
  try {
    const hotelName = req.params["hotelName"];
    const snapshot = await ref.where("hotelName", "==", hotelName).get();
    const dataArr = [];
    if (snapshot.empty) {
      res
        .status(200)
        .json({ message: "No room found", error: null, data: null });
      return;
    }
    snapshot.forEach((doc) => {
      id = doc.id;
      data = doc.data();
      dataArr.push({ id, data });
    });

    res.status(200).json({
      message: "Room(s) retrieved successfully!",
      error: null,
      data: dataArr,
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Failed to get room(s)", error: error.message });
  }
};

exports.searchRoom = async (req, res) => {
  try {
    const { location, checkIn, checkOut } = req.query;

    // Check if required parameters are provided
    if (!location || !checkIn || !checkOut) {
      res.status(400).json({
        message: "Location, checkIn, and checkOut parameters are required",
        error: null,
        data: null,
      });
      return;
    }

    const hotelsSnapshot = await db
      .collection("hotels")
      .where("city", "==", location)
      .get();

    if (hotelsSnapshot.empty) {
      res
        .status(200)
        .json({ message: "No room found", error: null, data: null });
      return;
    }

    const hotelArr = [];

    for (const hotelDoc of hotelsSnapshot.docs) {
      const hotelData = hotelDoc.data();
      const hotelName = hotelData.name;

      // Check if hotelName is defined
      if (!hotelName) {
        res.status(500).json({
          message: "Hotel name is undefined",
          error: null,
          data: null,
        });
        return;
      }

      const roomsSnapshot = await db
        .collection("rooms")
        .where("hotelName", "==", hotelName)
        .get();
      const roomArr = [];

      if (!roomsSnapshot.empty) {
        for (const roomDoc of roomsSnapshot.docs) {
          const roomData = roomDoc.data();
          const isRoomAvailable = await isRoomAvailableForDates(
            roomData.roomId,
            checkIn,
            checkOut
          );

          // Query roomType collection using roomTypeId from room collection
          const roomTypeSnapshot = await db
            .collection("room_types")
            .where("id", "==", roomData.roomTypeId)
            .get();

          if (!roomTypeSnapshot.empty) {
            roomData.roomType = roomTypeSnapshot.docs[0].data();
          }

          if (isRoomAvailable) {
            roomArr.push(roomData);
          }
        }
      }

      if (roomArr.length > 0) {
        hotelArr.push({ hotelName, roomArr });
      }
    }

    res.status(200).json({
      message: "Room(s) retrieved successfully!",
      error: null,
      data: hotelArr,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search room",
      error: error.message,
      data: null,
    });
  }
};


const isRoomAvailableForDates = async (roomId, checkIn, checkOut) => {
  const transactionsSnapshot = await db
    .collection("transactions")
    .where("roomId", "==", roomId)
    .get();
  let returnValue = true;
  if (transactionsSnapshot.empty) {
    return returnValue;
  }
  for (const doc of transactionsSnapshot.docs) {
    const reservedCheckIn = doc.data().checkinDate;
    const reservedCheckOut = doc.data().checkoutDate;
    if (
      isTimeColliding(checkIn, reservedCheckIn, reservedCheckOut) ||
      isTimeColliding(checkOut, reservedCheckIn, reservedCheckOut)
    ) {
      returnValue = false;
      break;
    }
  }

  return returnValue;
};

function isTimeColliding(dateCheck, dateFrom, dateTo) {
  // Parse date format from (DD/MM/YYYY) to (YYYY/MM/DD)
  const d1 = dateFrom.split("/");
  const d2 = dateTo.split("/");
  const c = dateCheck.split("/");

  const from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
  const to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
  const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

  return check >= from && check <= to;
}
