function convertDateFormat(inputDate) {
    // Create a new Date object
    var date = new Date(inputDate);
    
    // Define an array of month names
    var monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    
    // Get the day, month, and year
    var day = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();
    
    // Return the formatted date
    return day + ' ' + month + ' ' + year;
}

function nightPlural(num) {
    if (num > 1) {
        return " nights";
    } else {
        return " night";
    }
}

function formatRupiah(amount) {
    var formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
    });
    return formatter.format(amount);
}

function getTotal(amount, night, voucher, points) {
    return (amount * night) - voucher - points;
}

async function getHotel(roomId) {
    try {
        const response = await fetch(
            `https://localhost:8080/room/${roomId}`,
            {
              method: "GET",
              credentials: "include", // Include cookies in the request
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

        const result = await response.json();

        if (response.ok) {
            console.log(result);
            return result.data; // Return the data object directly
        } else {
            console.error(result);
            alert(result.message);
        }
    } catch (error) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
}

window.onload = async function() {
    // Get data from sessionStorage
    const checkInDate = sessionStorage.getItem("checkIn");
    const checkOutDate = sessionStorage.getItem("checkOut");
    const durationTime = sessionStorage.getItem("duration");
    const roomId = sessionStorage.getItem("roomId");
    const roomType = sessionStorage.getItem("roomType");
    const roomPrice = sessionStorage.getItem("roomPrice");
    const roomData = await getHotel(roomId);
    const emailData = sessionStorage.getItem("email");
    
    // Get the element from the HTML
    const checkInDateElement = document.getElementById("check-in-date");
    const checkOutDateElement = document.getElementById("check-out-date");
    const durationElement = document.getElementById("duration");
    const roomNameElement = document.getElementById("room-name");
    const dateRoomOrderedElement = document.getElementById("date-room-ordered");
    const priceRoomElement = document.getElementById("price-room");
    const totalPriceElement = document.getElementById("total-payment");
    const roomOrderedElement = document.getElementById("room-ordered");
    const totalPrice = getTotal(roomPrice, durationTime, 0, 0);

    // Change the element's text to the data from sessionStorage
    checkInDateElement.textContent = convertDateFormat(checkInDate);
    checkOutDateElement.textContent = convertDateFormat(checkOutDate);
    durationElement.textContent = durationTime + nightPlural(durationTime);
    dateRoomOrderedElement.textContent = convertDateFormat(checkInDate);
    priceRoomElement.textContent = formatRupiah(roomPrice);
    totalPriceElement.textContent = formatRupiah(totalPrice);

    // Use the data from the API
    roomNameElement.textContent = roomData.hotelName;
    roomOrderedElement.textContent = roomType;

    const payButton = document.getElementById('pay-button');
    payButton.addEventListener('click', async function() {
        await postTransaction(emailData, roomId, "nais", checkInDate, checkOutDate, durationTime, totalPrice);
        window.location.href = 'success.html';
    });
};

async function postTransaction(email, roomId, promo, checkin, checkout, duration, totalprice) {
    // Create an empty JSON object
    let jsonObject = {};

    // Add properties to the JSON object
    jsonObject["email"] = email;
    jsonObject["roomId"] = roomId;
    jsonObject["promoCode"] = promo;
    jsonObject["checkinDate"] = checkin;
    jsonObject["checkoutDate"] = checkout;
    jsonObject["duration"] = duration;
    jsonObject["totalPrice"] = totalprice;
    jsonObject["status"] = "Paid";

    try {
        const response = await fetch('https://localhost:8080/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Failed to post hotel data:', error);
    }

}

