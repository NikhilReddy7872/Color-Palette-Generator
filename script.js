// Get references to the generate button and palette container
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");
// Add event listener to the generate button
generateBtn.addEventListener("click", generatePalette);
// Add event listener to the palette container for copy functionality
paletteContainer.addEventListener("click", function (e) {
  // Check if the clicked element is a copy button or a color box
  if (e.target.classList.contains("copy-btn")) {
    // Get the hex value from the previous sibling element (the hex value span)
    const hexValue = e.target.previousElementSibling.textContent;
    // Use the Clipboard API to copy the hex value to the clipboard
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch((err) => console.log(err));
  } else if (e.target.classList.contains("color")) {
    // If a color box is clicked, get the hex value from the next sibling element (the hex value span)
    const hexValue =
      e.target.nextElementSibling.querySelector(".hex-value").textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() =>
        showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")),
      )
      .catch((err) => console.log(err));
  }
});

function showCopySuccess(element) {
  // Change the icon to a checkmark and change its color to green
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78";
  // After 1.5 seconds, revert the icon back to the copy icon and reset its color
  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

function generatePalette() {
  const colors = [];
  // Generate 5 random colors and add them to the colors array
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }
  // Update the palette display with the new colors
  updatePaletteDisplay(colors);
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  // Generate a random hex color code by selecting 6 random characters from the letters string
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");
  // Loop through each color box and update its background color and hex value
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");
    // Set the background color of the color div and update the hex value text
    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}
// Call the generatePalette function to initialize the palette with random colors when the page loads
//generatePalette();
