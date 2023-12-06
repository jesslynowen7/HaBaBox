async function getCheckOutDate() {
    // Get input values
    const checkInDateInput = document.getElementById('checkin');
    const nightCount = document.getElementById('nights');
    const checkOutDateInput = document.getElementById('checkout');

    // Parse input values
    const orderDate = new Date(checkInDateInput.value);
    const nightNum = parseInt(nightCount.value, 10);

    // Check if the order date is valid
    if (!isNaN(orderDate.getTime())) {
        // Calculate delivery date
        const deliveryDate = new Date(orderDate.getTime() + nightNum * 24 * 60 * 60 * 1000);

        // Set the delivery date value
        checkOutDateInput.valueAsDate = deliveryDate;
    } else {
        // If the order date is not valid, display an error message
        checkOutDateInput.value = '';
        alert('Invalid Order Date');
    }
}
