const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const overlaySelect = document.getElementById("overlay-select");
const opacityControl = document.getElementById("opacity");
const downloadButton = document.getElementById("download");

let baseImage = null; // Holds the uploaded image
let overlayImage = new Image(); // For the overlay image

// Set canvas dimensions
canvas.width = 500;
canvas.height = 500;

// Load the uploaded image
upload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      baseImage = new Image();
      baseImage.onload = drawCanvas;
      baseImage.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// Load the selected overlay
overlaySelect.addEventListener("change", () => {
  overlayImage.src = overlaySelect.value; // Update with the path to overlay images
  drawCanvas();
});

// Adjust overlay opacity
opacityControl.addEventListener("input", drawCanvas);

// Draw the canvas content
function drawCanvas() {
  if (baseImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height); // Draw the base image

    if (overlayImage.src) {
      ctx.globalAlpha = opacityControl.value; // Set overlay opacity
      ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height); // Draw the overlay
      ctx.globalAlpha = 1.0; // Reset alpha
    }
  }
}

// Download the customized image
downloadButton.addEventListener("click", () => {
    if (!baseImage) {
      alert("Please upload an image before downloading!");
      return;
    }
  
    // Ensure the canvas is drawn correctly
    drawCanvas();
  
    // Create a link element
    const link = document.createElement("a");
  
    try {
      // Convert canvas content to a data URL
      const dataURL = canvas.toDataURL("image/png");
  
      if (!dataURL) {
        throw new Error("Failed to generate image data.");
      }
  
      // Set link attributes
      link.href = dataURL;
      link.download = "custom-profile-pic.png"; // File name for the download
  
      // Trigger the download
      link.click();
    } catch (error) {
      console.error("Error during download:", error.message);
      alert("An error occurred while downloading the image. Please try again.");
    }
  });
  
