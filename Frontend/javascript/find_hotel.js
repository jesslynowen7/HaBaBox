document.addEventListener("DOMContentLoaded", () => {
    function formatRupiah(amount) {
        var formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
        });
        return formatter.format(amount);
    }
  
    function fetchAndPopulateHotel(event) {
    (async () => {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Check if the current window location is not already "hotel.html"
    
        // Get form data
        const cityInput = document.getElementById("city").value;
        const checkInDateInput = document.getElementById("checkin").value;
        const checkOutDateInput = document.getElementById("checkout").value;
        const durationInput = document.getElementById("nights").value;

        // Save data to sessionStorage
        sessionStorage.setItem("duration", durationInput);
        sessionStorage.setItem("city", cityInput);
        sessionStorage.setItem("checkIn", checkInDateInput);
        sessionStorage.setItem("checkOut", checkOutDateInput);

      if (window.location.href.indexOf("hotel.html") === -1) {
        // Redirect to hotel.html
        window.location.href = "hotel.html";
      }

      try {
        await populateHotelContainer();
      } catch (error) {
        const container = document.getElementById("hotelbody");
        const h1hotel = document.createElement("h1");
        const classes = "font-bold text-3xl";
        h1hotel.classList.add(...classes.split(" "));
        h1hotel.textContent = "No Rooms Available.";
        container.appendChild(h1hotel);
        console.error(error.message);
      }

      async function getHotelRooms() {
        const cityInput = sessionStorage.getItem("city");
        const checkInDateInput = sessionStorage.getItem("checkIn");
        const checkOutDateInput = sessionStorage.getItem("checkOut");

        try {
          const url = await fetch(
            `https://localhost:8080/room?location=${encodeURIComponent(cityInput)}&checkIn=${encodeURIComponent(checkInDateInput)}&checkOut=${encodeURIComponent(checkOutDateInput)}`,
            {
              method: "GET",
              credentials: "include", // Include cookies in the request
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = await url.json();

          if (url.ok) {
            console.log(result);
            return Array.isArray(result.data) ? result.data : []; // Ensure result.data is an array
            
          } else {
            console.error(result);
            alert(result.message);
          }
        } catch (error) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
      }

      async function populateHotelContainer() {
        try {
            const hotelRoomData = await getHotelRooms();
            // if (hotelRoomData == null) {
            //     alert("ga ada njir");
            // }

            const container = document.getElementById("hotelbody");
            container.innerHTML = "";

            hotelRoomData.forEach((entry) => {
                entry.roomArr.forEach((room) => {
                    // Create main div
                    const hotelDiv = document.createElement('div');
                    hotelDiv.id = 'hoteldiv';
                    hotelDiv.className = 'w-1/2 h-auto flex flex-row mx-auto border-solid rounded-3xl border-black bg-gray-200 m-10';

                    // Create img
                    const hotelImage = document.createElement('img');
                    hotelImage.id = 'hotelimage';
                    hotelImage.alt = 'hotel';
                    hotelImage.src = room.roomImg;  // Use room.roomImg here
                    hotelImage.className = 'mx-8 my-10 rounded-xl w-1/4';

                    // Append img to main div
                    hotelDiv.appendChild(hotelImage);

                    // Create inner div
                    const hotelPara = document.createElement('div');
                    hotelPara.id = 'hotelpara';
                    hotelPara.className = 'w-10/12 h-auto flex flex-col my-10 relative';

                    // Create h1
                    const h1hotel = document.createElement('h1');
                    h1hotel.className = 'font-bold text-3xl';
                    h1hotel.textContent = entry.hotelName;  // Use hotel.hotelName here

                    // Append h1 to inner div
                    hotelPara.appendChild(h1hotel);

                    // Create p
                    const photel = document.createElement('p');
                    photel.className = 'mt-4 mr-14 font-semibold';
                    photel.textContent = "Room Type: " + room.roomType.type;

                    const photel1 = document.createElement('p');
                    photel1.className = 'mb-4 mr-14 font-semibold';
                    photel1.textContent = "Amenities: " + room.roomType.description;

                    // Append p to inner div
                    hotelPara.appendChild(photel);
                    hotelPara.appendChild(photel1);

                    // Create bottom div
                    const divbutton = document.createElement('div');
                    divbutton.className = 'w-11/12 flex flex-row justify-between absolute bottom-0';

                    // Create p for price
                    const pricebutton = document.createElement('p');
                    pricebutton.className = 'text-2xl font-bold py-2';
                    pricebutton.textContent = formatRupiah(room.roomType.price);  // Replace this with the actual price if available

                    // Append price p to bottom div
                    divbutton.appendChild(pricebutton);

                    // Create button
                    const buttonbook = document.createElement('button');
                    buttonbook.type = 'button';
                    buttonbook.className = 'bg-gray-400 font-bold px-4 py-2 rounded-2xl hover:bg-pink-300';
                    buttonbook.textContent = 'Book Now!';
                    buttonbook.onclick = function() {
                        // Store room.id in sessionStorage
                        sessionStorage.setItem("roomId", room.roomId);
                        sessionStorage.setItem("roomPrice", room.roomType.price);
                        sessionStorage.setItem("roomType", room.roomType.type);
                        document.location='payment.html';
                    };

                    // Append button to bottom div
                    divbutton.appendChild(buttonbook);

                    // Append bottom div to inner div
                    hotelPara.appendChild(divbutton);

                    // Append inner div to main div
                    hotelDiv.appendChild(hotelPara);

                    // Append main div to another div
                    document.getElementById('hotelbody').appendChild(hotelDiv);
                });
            });
        } catch (error) {
          const container = document.getElementById("hotelbody");
          const h1hotel = document.createElement("h1");
          const classes = "font-bold text-2xl mx-auto my-24";
          container.innerHTML = "";
          h1hotel.classList.add(...classes.split(" "));
          h1hotel.textContent = "No Rooms Available.";
          container.appendChild(h1hotel);
          console.error(error.message);
        }
      }
    })();
  }
  // Attach an event listener to the "submit_hotel_search" button
  const submitButton = document.getElementById("submit_hotel_search");
  submitButton.addEventListener("click", fetchAndPopulateHotel);
});
