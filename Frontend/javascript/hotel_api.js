async function getHotelRooms() {
    const cityInput = document.getElementById('city').value;
    const checkInDateInput = document.getElementById('checkin').value;
    const checkOutDateInput = document.getElementById('checkout');

    try {
        const url = await fetch(
            `https://localhost:8080/room/${encodeURIComponent(cityInput)}/${encodeURIComponent(checkInDateInput)}/${encodeURIComponent(checkOutDateInput)}`,
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
            return Array.isArray(result.data) ? result.data : []; // Ensure result.data is an array
        } else {
            console.error(result);
            alert(result.message);
        }
    } catch (error) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

export { getHotelRooms };