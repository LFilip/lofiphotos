var cellWidth = 0;
var cellHeight = 0;
var numberOfCells = 0;
var gridContainer;
var resetButton;

function visitCell(e) {
  console.log("visited");
  console.log(e.target);
  e.target.classList.toggle("cell-unvisited");
}

function createGrid( pixelDensity ){
  resetButton = document.querySelector("button");
  cellWidth = 100 / pixelDensity;
  cellHeight = 100 / pixelDensity;
  numberOfCells = pixelDensity * pixelDensity;
  console.log(cellHeight);
  gridContainer = document.querySelector("#grid");
  console.log(gridContainer);
  resetButton.addEventListener("click", emptyGrid);

  for(i = 0;i<numberOfCells;i++){
    let cell = document.createElement('div');
    cell.classList.add("cell");
    cell.classList.add("cell-unvisited");
    cell.setAttribute("id", "myBtn");
    cell.style.height = cellHeight + "%";
    cell.style.width = cellWidth + "%";
    cell.addEventListener("mouseover", visitCell);

    cell.setAttribute('width', "30%");
    cell.setAttribute("height", "30%");
    gridContainer.appendChild(cell);
  }
}

function emptyGrid(){
  gridContainer.innerHTML = "";
   let newPixelDensity = window.prompt("Enter the size ( 1 - 150 )", "16");
   while (newPixelDensity < 0 || newPixelDensity > 150){
     newPixelDensity = window.prompt("Enter a size between 1 and 150");
   }
   createGrid(newPixelDensity);
}
