const container = document.getElementById("container");
let mouseDown = false;

document.body.addEventListener("mousedown", () => mouseDown = true);
document.body.addEventListener("mouseup", () => mouseDown = false);

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = (container.clientWidth / size);
  const colorPicker = document.getElementById("myColorPicker");

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.flexBasis = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseenter", function () {
      if (mouseDown) {
        square.style.backgroundColor = colorPicker.value; 
      }
    });
      
    square.addEventListener("mousedown", function() {
      square.style.backgroundColor = colorPicker.value;
    });

    container.appendChild(square);
  }
}

createGrid(16);

function gridValue() {
  const inputElement = document.getElementById("userInput");
  const inputValue = parseInt(inputElement.value);
  if (inputValue >= 1 && inputValue <= 100) {
    createGrid(inputValue);
  } else {
    alert("Sorry your value must be between 1 and 100.");
  }
}