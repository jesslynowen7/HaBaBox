import { fetchUserData } from "./api.js";
// Wrap the entire script in an asynchronous function
(async () => {
  // Your my-book.js script logic here
  const userData = await fetchUserData();
  let status = "Completed";

  async function getCompletedStay() {
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

  async function populateHistoryContainer() {
    try {
      const historyData = await getCompletedStay();

      const container = document.getElementById("history-container");

      container.innerHTML = "";

      historyData.forEach((entry) => {
        const entryDiv = document.createElement("div");
        const imgDiv = document.createElement("div");
        const detailsDiv = document.createElement("div");
        const imgElement = document.createElement("img");
        const h3Element = document.createElement("h3");
        const pElement = document.createElement("p");
        const tempContainerDiv = document.createElement("div");
        const priceElement = document.createElement("p");

        entryDiv.classList.add("history-entry");
        imgDiv.classList.add("history-img-wrap");
        detailsDiv.classList.add("history-detail-wrap");
        imgElement.classList.add("history-hotel-img");
        h3Element.classList.add("nama-room");
        pElement.classList.add("deskripsi");
        tempContainerDiv.classList.add("container-temp");
        priceElement.classList.add("history-harga");

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

        imgDiv.appendChild(imgElement);
        detailsDiv.appendChild(h3Element);
        detailsDiv.appendChild(pElement);
        tempContainerDiv.appendChild(priceElement);
        detailsDiv.appendChild(tempContainerDiv);
        entryDiv.appendChild(imgDiv);
        entryDiv.appendChild(detailsDiv);

        container.appendChild(entryDiv);
      });
    } catch (error) {
      const container = document.getElementById("history-container");
      container.innerHTML = "";
      const h3Element = document.createElement("h3");
      h3Element.textContent = "Belum ada transaksi";
      container.appendChild(h3Element);
      console.error(error.message);
    }
  }

  await populateHistoryContainer();
})();
