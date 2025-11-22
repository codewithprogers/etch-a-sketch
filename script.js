const container = document.getElementById("container");

for(let i = 0; i < 16 * 16; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);
}

const gridTiles = document.querySelectorAll(".square");

gridTiles.forEach(tile => {
  tile.addEventListener("mouseenter", () => {
    // tile.style.backgroundColor = "pink";
    tile.classList.add("hovered");
  });

  tile.addEventListener("mouseleave", () => {
    // tile.style.backgroundColor = "initial";
    // tile.classList.remove("hovered");
  })
});