// main.js
document.addEventListener("DOMContentLoaded", function () {
  loadContent("header.html", "header");
  loadContent("footer.html", "footer");
});

function loadContent(url, elementId) {
  fetch(url)
    .then((response) => response.text())
    .then((content) => {
      document.getElementById(elementId).innerHTML = content;

      // Execute scripts in the loaded content
      const scripts = document
        .getElementById(elementId)
        .getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = scripts[i].src;
        document.head.appendChild(script);
      }
    })
    .catch((error) => console.error(`Error loading ${url}`, error));
}
