// Fetch and include header.html
fetch("../Frontend/header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header-container").innerHTML = html;
  });

// Fetch and include footer.html
fetch("../Frontend/footer.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("footer-container").innerHTML = html;
  });
