document.addEventListener("DOMContentLoaded", () => {
  function fetchAndPopulateHotel(event) {
    (async () => {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Check if the current window location is not already "hotel.html"
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
        const cityInput = document.getElementById("city").value;
        const checkInDateInput = document.getElementById("checkin").value;
        const checkOutDateInput = document.getElementById("checkout").value;

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

          if (result.ok) {
            console.log(result);
            alert(result.message);
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
                const hotelImg = document.createElement("img");
                const hotelpara = document.createElement("div");
                const h1hotel = document.createElement("h1");
                const photel = document.createElement("p");
                const divbutton = document.createElement("div");
                const pricebutton = document.createElement("p");
                const buttonbook = document.createElement("button");

                hotelImg.classList.add("mx-8", "my-10", "rounded-xl", "w-1/2");
                hotelpara.classList.add(
                    "w-1/2",
                    "h-auto",
                    "flex",
                    "flex-col",
                    "my-10",
                    "relative"
                );
                h1hotel.classList.add("font-bold", "text-3xl");
                photel.classList.add("my-4", "mr-14"); // Assuming photel is a typo, and it should be pHotel
                divbutton.classList.add(
                    "w-11/12",
                    "flex",
                    "flex-row",
                    "justify-between",
                    "absolute",
                    "bottom-0"
                );
                pricebutton.classList.add("text-2xl", "font-bold", "py-2");
                buttonbook.classList.add(
                    "bg-gray-400",
                    "font-bold",
                    "px-4",
                    "py-2",
                    "rounded-2xl",
                    "hover:bg-pink-300"
                );

                hotelImg.src = entry.data.roomImg;
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
