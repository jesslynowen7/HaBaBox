import { getCookie } from "./cookie.js";
let email = getCookie("email");
let status = "Unpaid";

async function getUnpaidBook() {
  try {
    const response = await fetch(
      `http://localhost:8080/transaction/${encodeURIComponent(
        email
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

    myBookData.forEach((entry) => {
      // Create elements (same as in your code)
      const entryDiv = document.createElement("div");
      const imgElement = document.createElement("img");
      const h3Element = document.createElement("h3");
      const pElement = document.createElement("p");
      const priceElement = document.createElement("p");
      const buttonElement = document.createElement("button");
      // Set attributes and content (same as in your code)
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
      priceElement.textContent = entry.totalPrice;
      buttonElement.textContent = "Pay";
      // Append elements to the entry div
      entryDiv.appendChild(imgElement);
      entryDiv.appendChild(h3Element);
      entryDiv.appendChild(pElement);
      entryDiv.appendChild(priceElement);
      entryDiv.appendChild(buttonElement);

      // Append the entry div to the main container
      container.appendChild(entryDiv);
    });
  } catch (error) {
    const container = document.getElementById("my-book-container");
    const h3Element = document.createElement("h3");
    h3Element.textContent = "Belum ada transaksi";
    container.appendChild(h3Element);
    console.error(error.message);
  }
}

// Call the function to populate the container
populateMyBookContainer();
