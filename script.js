const container = document.getElementById("container");

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = (container.clientWidth / size);

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.flexBasis = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    let mouseDown = false;
    document.body.addEventListener("mousedown", () => mouseDown = true);
    document.body.addEventListener("mouseup", () => mouseDown = false);

    const colorPicker = document.getElementById("myColorPicker");
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
      square.addEventListener("mouseenter", function () {
        if (mouseDown) {
          square.style.backgroundColor = colorPicker.value; 
        }
        // const selectedColor = colorPicker.value;
      });
      
      square.addEventListener("mousedown", function() {
        square.style.backgroundColor = colorPicker.value;
      });
    });

    container.appendChild(square);
  }
}

createGrid(16);

const newGridBtn = document.getElementById("new-grid-btn");

newGridBtn.addEventListener("click", () => {
  let userInput = parseInt(prompt("How man squares per side would you like? (1-100)"));
  
  if (userInput > 0 && userInput < 101) {
    createGrid(userInput);
  } else {
    alert("Sorry your value must be between 1 and 100.");
  }
});