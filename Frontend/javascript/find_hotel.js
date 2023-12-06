(async () => {
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

    async function populateHotelContainer() {
        
        try {
            const hotelRoomData = await getHotelRooms();

            const container = document.getElementById('hotelbody');
            container.innerHTML = '';

            hotelRoomData.forEach(entry => {
                const hotelImg = document.createElement('img');
                const hotelpara = document.createElement('div');
                const h1hotel = document.createElement('h1');
                const photel = document.createElement('p');
                const divbutton = document.createElement('div');
                const pricebutton = document.createElement('p');
                const buttonbook = document.createElement('button');

                hotelImg.classList.add("mx-8 my-10 rounded-xl w-1/2");
                hotelpara.classList.add("w-1/2 h-auto flex flex-col my-10 relative");
                h1hotel.classList.add("font-bold text-3xl");
                photel.classList.add("my-4 mr-14");
                divbutton.classList.add("w-11/12 flex flex-row justify-between absolute bottom-0");
                pricebutton.classList.add("text-2xl font-bold py-2");
                buttonbook.classList.add("bg-gray-400 font-bold px-4 py-2 rounded-2xl hover:bg-pink-300");

                hotelImg.src = entry.roomImg;
                h1hotel.textContent = entry.hotelName;
                photel.textContent = entry.roomTypeId;
                pricebutton.textContent = entry.roomTypeId;

                divbutton.appendChild(buttonbook);
                divbutton.appendChild(pricebutton);
                hotelpara.appendChild(h1hotel);
                hotelpara.appendChild(photel);
                hotelpara.appendChild(divbutton);

                container.appendChild(hotelImg);
                container.appendChild(hotelpara);
            });
        } catch (error) {
            const container = document.getElementById('hotelbody');
            const h1hotel = document.createElement("h1");
            h1hotel.classList.add("font-bold text-3xl");
            h1hotel.textContent = "No Rooms Available.";
            container.appendChild(h1hotel);
            console.error(error.message);
        }
    }

    await populateHotelContainer();
})();