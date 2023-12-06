function convertDateFormat(inputDate) {
    const date = new Date(inputDate);
    const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function nightPlural(num) {
    return num > 1 ? " nights" : " night";
}

function formatRupiah(amount) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
    });
    return formatter.format(amount);
}

function getTotal(amount, night, voucher, points) {
    return (amount * night) - voucher - points;
}

async function getRoom(roomId) {
    try {
        const response = await fetch(`https://localhost:8080/room/${roomId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function getHotel(name) {
    try {
        const response = await fetch(
            `https://localhost:8080/hotel/${name}`,
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
    const checkInDate = sessionStorage.getItem("checkIn");
    const checkOutDate = sessionStorage.getItem("checkOut");
    const durationTime = sessionStorage.getItem("duration");
    const roomId = sessionStorage.getItem("roomId");
    const roomType = sessionStorage.getItem("roomType");
    const roomPrice = sessionStorage.getItem("roomPrice");
    const emailData = sessionStorage.getItem("email");
    const roomData = await getRoom(roomId);
    const hotelData = await getHotel(roomData.hotelName);

    const roomNameElement = document.getElementById("room-name");
    const checkInDateElement = document.getElementById("check-in-date");
    const checkOutDateElement = document.getElementById("check-out-date");
    const durationElement = document.getElementById("duration");
    const totalPriceElement = document.getElementById("total-payment");
    const roomOrderedElement = document.getElementById("room-ordered");
    const totalPrice = getTotal(roomPrice, durationTime, 0, 0);
    const hotelAddressElement = document.getElementById("hotel-address");
    const hotelCityElement = document.getElementById("hotel-city");
    const emailElement = document.getElementById("email-data");

    checkInDateElement.textContent = convertDateFormat(checkInDate);
    checkOutDateElement.textContent = convertDateFormat(checkOutDate);
    durationElement.textContent = `${durationTime}${nightPlural(durationTime)}`;
    totalPriceElement.textContent = formatRupiah(totalPrice);

    roomNameElement.textContent = roomData.hotelName;
    roomOrderedElement.textContent = roomType;
    hotelAddressElement.textContent = hotelData.address;
    hotelCityElement.textContent = hotelData.city;
    emailElement.textContent = emailData;

    const checkoutButton = document.getElementById("button-checkout");
    checkoutButton.addEventListener('click', async function() {
        window.location.href = 'payment.html';
    });
};
