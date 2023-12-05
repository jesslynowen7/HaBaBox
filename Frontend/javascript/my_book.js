import { fetchUserData } from "./api.js";
// Wrap the entire script in an asynchronous function
(async () => {
  // Your my-book.js script logic here
  const userData = await fetchUserData();
  let status = "Unpaid";

  async function getUnpaidBook() {
    try {
      const response = await fetch(
        `https://localhost:8080/transaction/${encodeURIComponent(
          userData.email
        )}/${encodeURIComponent(status)}`,
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
  async function populateMyBookContainer() {
    try {
      const myBookData = await getUnpaidBook();

      const container = document.getElementById("my-book-container");

      // Clear existing content
      container.innerHTML = "";

      myBookData.forEach((entry) => {
        // Create elements
        const entryDiv = document.createElement("div");
        const imgDiv = document.createElement("div");
        const detailsDiv = document.createElement("div");
        const imgElement = document.createElement("img");
        const h3Element = document.createElement("h3");
        const pElement = document.createElement("p");
        const tempContainerDiv = document.createElement("div");
        const priceElement = document.createElement("p");
        const buttonElement = document.createElement("button");

        // Set classes
        entryDiv.classList.add("my-book-entry");
        imgDiv.classList.add("div-img");
        detailsDiv.classList.add("div-details");
        imgElement.classList.add("my-book-hotel-img");
        h3Element.classList.add("nama-room");
        pElement.classList.add("deskripsi");
        tempContainerDiv.classList.add("container-temp");
        priceElement.classList.add("my-book-harga");
        buttonElement.classList.add("pay-unpaid-button");

        // Set attributes and content
        imgElement.src = entry.roomImg;
        h3Element.textContent = entry.hotelName;
        pElement.textContent =
          "Check-In date: " +
          entry.checkinDate +
          "\n" +
          "Check-Out date: " +
          entry.checkoutDate +
          "\n" +
          "Transaction Date: " +
          entry.transactionDate;
        priceElement.textContent = `Rp. ${entry.totalPrice}`;
        buttonElement.textContent = "Pay";

        // Append elements to the entry div
        imgDiv.appendChild(imgElement);
        detailsDiv.appendChild(h3Element);
        detailsDiv.appendChild(pElement);
        tempContainerDiv.appendChild(priceElement);
        tempContainerDiv.appendChild(buttonElement);
        detailsDiv.appendChild(tempContainerDiv);
        entryDiv.appendChild(imgDiv);
        entryDiv.appendChild(detailsDiv);

        // Append the entry div to the main container
        container.appendChild(entryDiv);
      });
    } catch (error) {
      const container = document.getElementById("my-book-container");
      container.innerHTML = "";
      const h3Element = document.createElement("h3");
      h3Element.textContent = "Belum ada transaksi";
      container.appendChild(h3Element);
      console.error(error.message);
    }
  }

  // Call the function to populate the container
  await populateMyBookContainer();
})();
