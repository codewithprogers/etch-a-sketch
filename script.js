const container = document.getElementById("container");

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = (container.clientWidth / size);

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.flexBasis = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseenter", () => {
      square.classList.add("hovered");
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