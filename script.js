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

const inputElement = document.getElementById("userInput");

inputElement.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    gridValue();
  }
});

function gridValue() {
  const inputValue = parseInt(inputElement.value);

  if (inputValue >= 1 && inputValue <= 100) {
    createGrid(inputValue);
  } else {
    alert("Sorry your value must be between 1 and 100.");
  }
}

const backgroundOptions = document.querySelectorAll(".option");
const choiceBox = document.querySelector(".choice");

backgroundOptions.forEach(option => {
  option.addEventListener("mouseenter", () => {
    option.classList.add("hovered");
  });

  option.addEventListener("mouseleave", () => {
    option.classList.remove("hovered");
  });

  option.addEventListener("click", () => {
    const color = option.dataset.color;

    container.style.backgroundColor = color;
    choiceBox.style.backgroundColor = color;
  });
});

const gridFillOptions = document.querySelectorAll(".fillBox");

gridFillOptions.forEach(fill => {
  fill.addEventListener("click", () => {
    gridFillOptions.forEach(other => {
      other.style.backgroundColor = "";
    });
    fill.style.backgroundColor = "#d6d0f5";

    const containerSquares = document.querySelectorAll(".square");

    if (fill.classList.contains("fillOff")) {
      containerSquares.forEach(square => {
        square.classList.add("hide-grid");
      });
    } else if (fill.classList.contains("fillOn")) {
      containerSquares.forEach(square => {
        square.classList.remove("hide-grid");
      })
    }
  });
});