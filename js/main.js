// Get references to the color picker input and the button
const colorPicker = document.getElementById('colorPicker');

// Get the color picker and its related buttons
const colorButton       = document.getElementById('colorPickerButton');
const selectColorButton = document.getElementById('colorPickerButton2');

// Get the "Flash," "Vibration," and "Music" buttons
const flashButton = document.getElementById('flashButton');
const vibrationButton = document.getElementById('vibrationButton');
const musicButton_1 = document.getElementById('musicButton_1');

const randomColorButton = document.getElementById('randomColorButton');

let selectedColorRGB = 0;

let socket = "";

let music1_status       = 0;
let random_color_status = 0;
let flash_status        = 0;
let vibration_status    = 0;


const intervalId = {};

let flash_intervalId; // Variable to hold the interval ID
let vibration_intervalId; // Variable to hold the interval ID

connectWebSocket();

// Function to perform the "Flash" action
function flashAction() {

    console.log("Flash!");

    if(flash_status == 0) {
        flash_status = 1;
         // Implement the music functionality here
        intervalId["flash"] = setInterval(() => sendValue("0,0,0,255"), 1000)
    } else {
        flash_status = 0;
        clearInterval(intervalId["flash"]); // Stop the task
        sendValue("0,0,0,0")
    }
}

// Function to perform the "Vibration" action
function vibrationAction() {

    console.log("Vibration!");

    if(vibration_status == 0) {
        vibration_status = 1;
         // Implement the music functionality here
        intervalId["vibration"] = setInterval(() => sendValue("0,0,0,10"), 1000)
    } else {
        vibration_status = 0;
        clearInterval(intervalId["vibration"]); // Stop the task
    }
}


// Function to perform the "Music" action
function musicAction() {

    console.log("Music 1!");

    if(music1_status == 0) {
        music1_status = 1;
        intervalId["music1"] = setInterval(() => sendValue("0,0,0,70"), 3000)
    } else {
        music1_status = 0;
        clearInterval(intervalId["music1"]); // Stop the task
    }
}

function randomColorAction() {
    if(random_color_status == 0) {
        random_color_status = 1;
        intervalId["randomColor"] = setInterval(() => sendValue("0,0,0,50"), 1000)
    } else {
        random_color_status = 0;
        clearInterval(intervalId["randomColor"]); // Stop the task
    }
}


// Function to perform the "Music" action
function rgbAction() {
    // Implement the music functionality here
    alert("rgb!");
}

// JavaScript
window.addEventListener('load', function () {

    // Get all buttons with the class 'startButton'
    const buttons = document.querySelectorAll('.startButton');

    // Initialize variables to store the maximum width and height
    let maxWidth = 0;
    let maxHeight = 0;

    // Loop through all buttons to find the maximum width and height
    buttons.forEach(button => {
        const buttonWidth  = button.offsetWidth;
        const buttonHeight = button.offsetHeight;
        if (buttonWidth > maxWidth) {
            maxWidth = buttonWidth + 10;
        }
        if (buttonHeight > maxHeight) {
            maxHeight = buttonHeight;
        }
    });

    // Set the maximum width and height to all buttons
    buttons.forEach(button => {
        button.style.width = `${maxWidth}px`;
        button.style.height = `${maxHeight}px`;
    });


    // Add click event listener to the "RGB Color" button
    colorButton.addEventListener('click', function () {
        rgbAction();
    });

    // Add click event listener to the small "Select Color" button
    selectColorButton.addEventListener('click', function () {
        colorPicker.click(); // Trigger the color picker dialog
    });

    // Add change event listener to the color picker input
    colorPicker.addEventListener('change', function () {
        const selectedColor                = this.value;
        selectColorButton.style.background = selectedColor;
        selectColorButton.style.color      = selectedColor;
    });

    // Add click event listener to the "Flash" button
    flashButton.addEventListener('click', function () {
        flashAction();
    });

    // Add click event listener to the "Vibration" button
    vibrationButton.addEventListener('click', function () {
        vibrationAction();
    });

    // Add click event listener to the "Music" button
    musicButton_1.addEventListener('click', function () {
        musicAction();
    });

    // Add click event listener to the "Music" button
    randomColorButton.addEventListener('click', function () {
        randomColorAction();
    });

    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if(this.style.background == 'green') {
                this.style.background = 'red';
            }
            else {
                this.style.background = 'green';
            }
        });
    });
});


// Function to send values over the WebSocket connection
function sendValue(value) {
  // Check if the WebSocket connection is open before sending data
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(value);
    console.log('Value sent:', value);
  } else {
    console.error('WebSocket connection is not open.');
  }
}

function connectWebSocket() {
    socket = new WebSocket('wss://interactiveviewer.glitch.me/?user=qlcplus');

    // Event listener for when the WebSocket connection is established
    socket.onopen = () => {
      console.log('WebSocket connection established.');
      document.body.style.backgroundColor = "black";
    };

}

// Function to convert hexadecimal color to RGB format
function hexToRgb(hex) {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Event listener to handle color changes
colorPicker.addEventListener('input', () => {
    // Get the selected color value in hexadecimal format
    const selectedColorHex = colorPicker.value;

    // Convert the hexadecimal color to RGB format
    selectedColorRGB = hexToRgb(selectedColorHex);
    console.log('Selected RGB Color:', selectedColorRGB);
});