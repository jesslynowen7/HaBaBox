// your_script.js
(async () => {
    async function getCityOptions() {
        try {
        const response = await fetch(
            `https://localhost:8080/hotel/city`,
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

  // Function to dynamically populate the div with data
    // const optionsData = [
    //     { value: 'Kota Bandung', text: 'Kota Bandung' },
    //     { value: 'Kota Jakarta', text: 'Kota Jakarta' },
    //     { value: 'Kota Bogor', text: 'Kota Bogor' },
    // ];

    // Function to populate the select element
    async function populateSelect() {
        try {
            const cityData = await getCityOptions();
            const selectElement = document.getElementById('city');

            // Clear existing options
            selectElement.innerHTML = '';

            // Create and append options based on the data
            cityData.forEach((entry) => {
                const optionElement = document.createElement('option');
                optionElement.value = entry.data.city;
                optionElement.text = entry.data.city;

                // Append the option to the select element
                selectElement.appendChild(optionElement);
            });
        } catch (error) {
            const cityData = await getCityOptions();
            const selectElement = document.getElementById('city');

            // Clear existing options
            selectElement.innerHTML = '';
            const optionElement = document.createElement('option');
            optionElement.value = "Error";
            optionElement.text = "No cities found!";

                // Append the option to the select element
            selectElement.appendChild(optionElement);
            console.error(error.message);
        }
    }

    // Call the function to populate the select
    populateSelect();
})();

