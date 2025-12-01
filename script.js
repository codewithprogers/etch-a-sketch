const container = document.getElementById("container");

let mouseDown = false;
let paintedThisStroke = false;

let undoStack = [];
let redoStack = [];

container.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("square")) {
    saveState();
    mouseDown = true;
    
    const colorPicker = document.getElementById("myColorPicker");
    e.target.style.backgroundColor = colorPicker.value;

    paintedThisStroke = true;
  }
});

window.addEventListener("mouseup", () => {
  if (mouseDown && paintedThisStroke) {
    saveState();
  }

  mouseDown = false;
  paintedThisStroke = false;
});

function saveState() {
  const gridColors = [...document.querySelectorAll(".square")].map(sq => sq.style.backgroundColor);
  undoStack.push(gridColors);
  redoStack = [];
}

function undo() {
  if (undoStack.length === 0) return;

  const squares = [...document.querySelectorAll(".square")];
  const current = squares.map(sq => sq.style.backgroundColor);

  redoStack.push(current);

  const previous = undoStack.pop();
  previous.forEach((color, i) => {
    if (squares[i]) {
      squares[i].style.backgroundColor = color;
    }
  });
}

function redo() {
  if  (redoStack.length === 0) return;

  const squares = [...document.querySelectorAll(".square")];
  const current = squares.map(sq => sq.style.backgroundColor);

  undoStack.push(current);

  const next = redoStack.pop();
  next.forEach((color, i) => {
    if (squares[i]) {
      squares[i].style.backgroundColor = color;
    }
  });
}

const undoBtn = document.getElementById("undo");
undoBtn.addEventListener("mousedown", e => e.stopPropagation());
undoBtn.addEventListener("click", () => undo());

const redoBtn = document.getElementById("redo");
redoBtn.addEventListener("mousedown", e => e.stopPropagation());
redoBtn.addEventListener("click", () => redo());

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
        paintedThisStroke = true;
      }
    });

    container.appendChild(square);
  }

  saveState();
  redoStack = [];
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
  option.addEventListener("click", () => {
    backgroundOptions.forEach(other => {
      other.style.borderColor = "";
    });
    option.style.borderColor = "navy";   
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